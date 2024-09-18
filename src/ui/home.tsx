/* eslint-disable @next/next/no-img-element */
"use client";
import { ROUTING } from "@/lib/constants";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Product, ProductCategory } from "@/types";

export default function HomeV2({
  products,
  productCategories,
}: {
  products: Product[];
  productCategories: ProductCategory[];
}) {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="flex flex-col border-b border-gray-200 lg:border-0">
          <div className="relative">
            <img
              src="/banner.png"
              alt="banner"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <section aria-labelledby="trending-heading" className="bg-white">
          <div className="py-16 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-24">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending products
              </h2>
              <a
                href={ROUTING.COLLECTIONS}
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="relative mt-8">
              <div className="relative w-full overflow-x-auto">
                <div
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                >
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 px-4 sm:hidden">
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none ">
              <h2
                id="collections-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Collections
              </h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {productCategories.map((collection: any) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
