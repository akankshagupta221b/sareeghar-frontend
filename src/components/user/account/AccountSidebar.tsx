import type { FC } from "react";
import { LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ordersCount?: number;
  wishlistCount?: number;
  reviewsCount?: number;
}

const menuItems = [
  {
    id: "account",
    label: "ACCOUNT",
    count: null,
  },
  {
    id: "orders",
    label: "ORDERS",
    count: "ordersCount",
  },
  {
    id: "addresses",
    label: "ADDRESSES",
    count: null,
  },
  {
    id: "reviews",
    label: "MY REVIEWS",
    count: "reviewsCount",
  },
  {
    id: "wishlist",
    label: "MY WISHLIST",
    count: "wishlistCount",
  },
] as const;

const externalLinks = [
  {
    id: "contact",
    label: "CONTACT US",
    hasArrow: true,
  },
  {
    id: "help",
    label: "HELP CENTER",
    hasArrow: true,
  },
] as const;

export const AccountSidebar: FC<AccountSidebarProps> = ({
  activeTab,
  onTabChange,
  ordersCount = 0,
  wishlistCount = 0,
  reviewsCount = 0,
}) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const getCounts = (countKey: string | null) => {
    if (countKey === "ordersCount") return ordersCount;
    if (countKey === "wishlistCount") return wishlistCount;
    if (countKey === "reviewsCount") return reviewsCount;
    return null;
  };

  return (
    <aside className="bg-white">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const count = getCounts(item.count);

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full text-left py-2 text-sm font-normal transition-colors",
                isActive
                  ? "font-semibold text-black"
                  : "text-gray-700 hover:text-black"
              )}
            >
              {item.label}
              {count !== null && count > 0 && (
                <span className="ml-2 text-gray-500">{count}</span>
              )}
            </button>
          );
        })}

        <div className="pt-4 space-y-1">
          {externalLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onTabChange(link.id)}
              className="w-full text-left py-2 text-sm text-gray-700 hover:text-black transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              {link.hasArrow && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 text-sm text-gray-700 hover:text-black transition-colors flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>SIGN OUT</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
