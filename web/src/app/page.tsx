import Home from "@/ui/home";
import { loadHome } from "@/lib/loaders";

export default async function Page() {
  const { products, productCategories } = await loadHome().catch(() => ({
    products: [],
    productCategories: [],
  }));
  return <Home products={products} productCategories={productCategories} />;
}
