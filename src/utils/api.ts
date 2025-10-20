// For production with proper CORS and SameSite=None cookies
// export const API_BASE_URL = "https://sareeghar-backend-ruddy.vercel.app";

// For local development - uncomment this and use proxy in next.config.ts
export const API_BASE_URL = "http://localhost:3001";

export const API_ROUTES = {
  AUTH: `${API_BASE_URL}/api/auth`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  COUPON: `${API_BASE_URL}/api/coupons`,
  SETTINGS: `${API_BASE_URL}/api/settings`,
  STORE: `${API_BASE_URL}/api/store`,
  CART: `${API_BASE_URL}/api/cart`,
  ADDRESS: `${API_BASE_URL}/api/address`,
  ORDER: `${API_BASE_URL}/api/order`,
  COLLECTIONS: `${API_BASE_URL}/api/collections`,
  BRANDS: `${API_BASE_URL}/api/brands`,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  SHIPROCKET: `${API_BASE_URL}/api/shiprocket/courier`,
  REVIEWS: `${API_BASE_URL}/api/reviews`,
  SEARCH: `${API_BASE_URL}/api/search`,
};
