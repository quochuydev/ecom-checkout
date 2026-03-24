import { ApiService } from "@/lib/api-caller";
import type { ProductCategoryShape } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const api = ApiService("");

export function useCategory() {
  const { data: productCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const data = await api.request<{
        url: string;
        method: "get";
        result: { items: ProductCategoryShape[] };
      }>({
        url: "/api/v1/categories",
        method: "get",
      });
      return data?.items || [];
    },
  });

  return { productCategories };
}
