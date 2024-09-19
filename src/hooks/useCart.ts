import { ApiService } from "@/lib/api-caller";
import {
  API,
  ApiV1WebCartAddItem,
  ApiV1WebCartDecreaseItem,
  ApiV1WebCartGetOrCreate,
  ApiV1WebCartIncreaseItem,
  ApiV1WebCartRemoveItem,
} from "@ecom/types";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "./useConfig";

export function useCart() {
  const { configuration } = useConfig();
  const apiService = ApiService(configuration.apiUrl);

  const { data: cart, refetch: getCart } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const data = await apiService.request<API<ApiV1WebCartGetOrCreate>>({
        url: "/api/api.v1.web.cart.getOrCreate",
      });

      return data;
    },
  });

  async function addItem(productId: string) {
    await apiService.request<API<ApiV1WebCartAddItem>>({
      url: "/api/api.v1.web.cart.addItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function removeItem(productId: string) {
    await apiService.request<API<ApiV1WebCartRemoveItem>>({
      url: "/api/api.v1.web.cart.removeItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function decreaseItem(productId: string) {
    await apiService.request<API<ApiV1WebCartDecreaseItem>>({
      url: "/api/api.v1.web.cart.decreaseItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  async function increaseItem(productId: string) {
    await apiService.request<API<ApiV1WebCartIncreaseItem>>({
      url: "/api/api.v1.web.cart.increaseItem",
      data: {
        productId,
      },
    });

    getCart();
  }

  return {
    cart,
    addItem,
    removeItem,
    increaseItem,
    decreaseItem,
  };
}
