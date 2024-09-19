import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/lib/api-caller";

export function useConfig() {
  const apiService = ApiService(window.location.origin);

  const { data: configuration = {} } = useQuery({
    queryKey: ["configuration"],
    queryFn: async () => {
      const data = await apiService.request({
        url: "/api/config",
        method: "get",
      });

      console.log(123123, data);

      return data;
    },
  });

  return {
    configuration,
  };
}
