export const ROUTING = {
  HOME: '/',
  COLLECTIONS: '/categories',
  FRAMES: '/categories/gong-kinh',
  SUNGLASSES: '/categories/kinh-mat',
  LENSES: '/categories/trong-kinh',
  BLOGS: '/blogs',
  CART: '/checkout',
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
}
