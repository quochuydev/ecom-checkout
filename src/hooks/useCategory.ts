import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/lib/api-caller";
import { useConfig } from "./useConfig";
import { API, ApiV1WebProductCategoryGetList } from "@ecom/types";

export function useCategory() {
  const { configuration } = useConfig();
  const apiService = ApiService(configuration.apiUrl);

  const { data: productCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const data = await apiService.request<
        API<ApiV1WebProductCategoryGetList>
      >({
        url: "/api/v1/api.v1.web.productCategory.getList",
      });

      return data?.items || [];
    },
  });

  return {
    productCategories,
  };
}
