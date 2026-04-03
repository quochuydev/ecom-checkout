import { ApiService } from "@/lib/api-caller";
import type { CartShape } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const api = ApiService("");

export function useCart() {
  const { data: cart, refetch: getCart } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      api.request<{ url: string; method: "get"; result: CartShape }>({
        url: "/api/v1/cart",
        method: "get",
      }),
    staleTime: 5 * 60 * 1000,
  });

  async function addItem(productId: string) {
    await api.request({
      url: "/api/v1/cart/items",
      method: "post",
      data: { productId },
    } as any);
    getCart();
  }

  async function removeItem(productId: string) {
    await api.request({
      url: `/api/v1/cart/items/${productId}`,
      method: "delete",
    } as any);
    getCart();
  }

  async function increaseItem(productId: string) {
    await api.request({
      url: `/api/v1/cart/items/${productId}/increase`,
      method: "post",
    } as any);
    getCart();
  }

  async function decreaseItem(productId: string) {
    await api.request({
      url: `/api/v1/cart/items/${productId}/decrease`,
      method: "post",
    } as any);
    getCart();
  }

  async function checkout(params: {
    contact: { email: string };
    shipping: { firstName: string; lastName?: string; address?: string };
  }) {
    const result = await api.request<{
      url: string;
      method: "post";
      data: typeof params;
      result: { orderId: string };
    }>({
      url: "/api/v1/cart/checkout",
      method: "post",
      data: params,
    });
    await removeCart();
    getCart();
    return result;
  }

  async function removeCart() {
    await api.request({
      url: "/api/v1/cart",
      method: "delete",
    } as any);
  }

  return { cart, addItem, removeItem, increaseItem, decreaseItem, checkout };
}
