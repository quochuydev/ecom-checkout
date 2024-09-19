/* eslint-disable @next/next/no-img-element */
"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import CollectionFilter from "./CollectionFilter";
import { Product } from "@ecom/types";
import { useCategory } from "@/hooks/useCategory";

export default function Collections({ products }: { products: Product[] }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { productCategories } = useCategory();

  return (
    <div className="bg-white">
      <CollectionFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />

      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved with
            four openings!
          </p>
        </div>

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>

            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon
                className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div className="hidden lg:block">
              <form className="space-y-10 divide-y divide-gray-200">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    {"Categories"}
                  </legend>
                  <div className="space-y-3 pt-6">
                    {productCategories?.map((productCategory, index) => (
                      <div
                        className="flex items-center"
                        key={productCategory.id}
                      >
                        <input
                          id={`categories-${index}`}
                          name={`categories[]`}
                          defaultValue={productCategory.id}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`categories-${index}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {productCategory.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </form>
            </div>
          </aside>

          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
          >
            <h2 id="product-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden bg-white"
                >
                  <a href={`/products/${product.slug}`}>
                    <div className="aspect-h-4 aspect-w-3 sm:aspect-none bg-gray-100 cursor-pointer sm:h-96">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.images?.[0]?.fileName}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="mt-4 flex flex-1 flex-col space-y-2">
                      <p className="text-sm font-medium text-gray-900 hover:underline">
                        {product.title}
                      </p>
                      <p className="flex flex-1 flex-col justify-end text-base font-medium text-gray-900">
                        {product.price}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
