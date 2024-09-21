import { ApiService } from "@/lib/api-caller";
import {
  API,
  ApiV1WebCartAddItem,
  ApiV1WebCartCheckout,
  ApiV1WebCartDecreaseItem,
  ApiV1WebCartGetOrCreate,
  ApiV1WebCartIncreaseItem,
  ApiV1WebCartRemove,
  ApiV1WebCartRemoveItem,
} from "@ecom/types";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "./useConfig";

export function useCart() {
  const { configuration } = useConfig();
  const apiService = ApiService(configuration.apiUrl);

  const { data: cart, refetch: getCart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await apiService.request<API<ApiV1WebCartGetOrCreate>>({
        url: "/api/v1/api.v1.web.cart.getOrCreate",
      });

      return data;
    },
  });

  async function addItem(productId: string) {
    await apiService.request<API<ApiV1WebCartAddItem>>({
      url: "/api/v1/api.v1.web.cart.addItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function removeItem(productId: string) {
    await apiService.request<API<ApiV1WebCartRemoveItem>>({
      url: "/api/v1/api.v1.web.cart.removeItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function decreaseItem(productId: string) {
    await apiService.request<API<ApiV1WebCartDecreaseItem>>({
      url: "/api/v1/api.v1.web.cart.decreaseItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function increaseItem(productId: string) {
    await apiService.request<API<ApiV1WebCartIncreaseItem>>({
      url: "/api/v1/api.v1.web.cart.increaseItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function checkout(params: {
    contact: ApiV1WebCartCheckout["request"]["contact"];
    shipping: ApiV1WebCartCheckout["request"]["shipping"];
  }) {
    const { contact, shipping } = params;

    const result = await apiService.request<API<ApiV1WebCartCheckout>>({
      url: "/api/v1/api.v1.web.cart.checkout",
      data: {
        contact,
        shipping,
      },
    });

    await removeCart();
    getCart();

    return result;
  }

  async function removeCart() {
    await apiService.request<API<ApiV1WebCartRemove>>({
      url: "/api/v1/api.v1.web.cart.remove",
    });
  }

  return {
    cart,
    addItem,
    removeItem,
    increaseItem,
    decreaseItem,
    checkout,
  };
}
