import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import debounce from "lodash/debounce";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  mrp: number;
  sellingPrice: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  isGuest: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartItemQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncGuestCartWithServer: () => Promise<void>;
  setIsGuest: (isGuest: boolean) => void;
}

const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!(
    localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")
  );
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      const debounceUpdateCartItemQuantity = debounce(
        async (id: string, quantity: number) => {
          try {
            await axiosInstance.put(`${API_ROUTES.CART}/update/${id}`, {
              quantity,
            });
          } catch (e) {
            set({ error: "Failed to update cart quantity" });
          }
        }
      );

      return {
        items: [],
        isLoading: false,
        error: null,
        isGuest: true,
        setIsGuest: (isGuest: boolean) => set({ isGuest }),
        fetchCart: async () => {
          const authenticated = isAuthenticated();

          if (!authenticated) {
            // Guest user - items already loaded from localStorage via persist
            return;
          }

          set({ isLoading: true, error: null, isGuest: false });
          try {
            const response = await axiosInstance.get(
              `${API_ROUTES.CART}/fetch-cart`
            );

            set({ items: response.data.data, isLoading: false });
          } catch (e) {
            set({ error: "Failed to fetch cart", isLoading: false });
          }
        },
        addToCart: async (item) => {
          const authenticated = isAuthenticated();

          if (!authenticated) {
            // Guest user - add to local storage
            const tempId = `guest-${Date.now()}-${Math.random()}`;
            const newItem = { ...item, id: tempId };

            set((state) => ({
              items: [...state.items, newItem],
              isGuest: true,
            }));
            return;
          }

          set({ isLoading: true, error: null });
          try {
            const response = await axiosInstance.post(
              `${API_ROUTES.CART}/add-to-cart`,
              item
            );

            set((state) => ({
              items: [...state.items, response.data.data],
              isLoading: false,
            }));
          } catch (e) {
            set({ error: "Failed to add to cart", isLoading: false });
          }
        },
        removeFromCart: async (id) => {
          const authenticated = isAuthenticated();

          if (!authenticated || id.startsWith("guest-")) {
            // Guest user - remove from local storage
            set((state) => ({
              items: state.items.filter((item) => item.id !== id),
            }));
            return;
          }

          set({ isLoading: true, error: null });
          try {
            await axiosInstance.delete(`${API_ROUTES.CART}/remove/${id}`);

            set((state) => ({
              items: state.items.filter((item) => item.id !== id),
              isLoading: false,
            }));
          } catch (e) {
            set({ error: "Failed to delete from cart", isLoading: false });
          }
        },
        updateCartItemQuantity: async (id, quantity) => {
          const authenticated = isAuthenticated();

          set((state) => ({
            items: state.items.map((cartItem) =>
              cartItem.id === id ? { ...cartItem, quantity } : cartItem
            ),
          }));

          if (authenticated && !id.startsWith("guest-")) {
            debounceUpdateCartItemQuantity(id, quantity);
          }
        },
        clearCart: async () => {
          const authenticated = isAuthenticated();

          if (!authenticated) {
            // Guest user - clear local storage
            set({ items: [] });
            return;
          }

          set({ isLoading: true, error: null });
          try {
            await axiosInstance.post(`${API_ROUTES.CART}/clear-cart`, {});

            set({ items: [], isLoading: false });
          } catch (e) {
            set({ error: "Failed to cart clear ", isLoading: false });
          }
        },
        syncGuestCartWithServer: async () => {
          const authenticated = isAuthenticated();

          if (!authenticated) {
            return;
          }

          const guestItems = get().items.filter((item) =>
            item.id.startsWith("guest-")
          );

          if (guestItems.length === 0) {
            return;
          }

          set({ isLoading: true });
          try {
            // Add all guest items to server
            for (const item of guestItems) {
              const { id, ...itemWithoutId } = item;
              await axiosInstance.post(
                `${API_ROUTES.CART}/add-to-cart`,
                itemWithoutId
              );
            }

            // Fetch updated cart from server
            const response = await axiosInstance.get(
              `${API_ROUTES.CART}/fetch-cart`
            );

            set({
              items: response.data.data,
              isLoading: false,
              isGuest: false,
            });
          } catch (e) {
            set({ error: "Failed to sync cart", isLoading: false });
          }
        },
      };
    },
    {
      name: "guest-cart-storage",
      partialize: (state) => ({
        items: state.items.filter((item) => item.id.startsWith("guest-")),
      }),
    }
  )
);
