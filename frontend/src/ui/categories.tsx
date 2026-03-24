/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useCategory } from "@/hooks/useCategory";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Categories({
  products,
  productCategories,
}: {
  products: any[];
  productCategories: any[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p: any) =>
        p.productCategories?.some((c: any) => c.id === selectedCategory)
      )
    : products;

  return (
    <>
      <Header />
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="border-b border-gray-200 pb-8 pt-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Tất Cả Sản Phẩm
            </h1>
            <p className="mt-2 text-gray-500">
              Khám phá bộ sưu tập sản phẩm đa dạng
            </p>
          </div>

          <div className="pb-24 pt-8 lg:grid lg:grid-cols-4 lg:gap-x-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Danh Mục
              </h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      !selectedCategory
                        ? "bg-primary text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Tất cả
                  </button>
                </li>
                {productCategories?.map((cat: any) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary text-white font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.title}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Product Grid */}
            <section className="lg:col-span-3">
              {/* Mobile filter pills */}
              <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    !selectedCategory
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Tất cả
                </button>
                {productCategories?.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-4 py-1.5 text-sm ${
                      selectedCategory === cat.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} sản phẩm
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
