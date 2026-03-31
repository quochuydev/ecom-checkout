/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/constants";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { HeartIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

export default function ProductUI({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const { addItem } = useCart();
  const hasDiscount = product.regularPrice && product.regularPrice > product.price;

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="bg-white">
        {/* Breadcrumb */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-primary">Trang Chủ</a></li>
            <li>/</li>
            <li><a href="/categories" className="hover:text-primary">Sản Phẩm</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate">{product.title}</li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
            {/* Image Gallery */}
            <TabGroup className="flex flex-col-reverse">
              <div className="mx-auto mt-4 w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-3">
                  {product.images?.map((image: any) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {({ selected }) => (
                        <>
                          <img
                            src={image.url}
                            alt={image.fileName}
                            className="h-full w-full object-cover"
                          />
                          <span
                            className={`absolute inset-0 rounded-lg ring-2 ring-offset-1 ${
                              selected ? "ring-primary" : "ring-transparent"
                            }`}
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels>
                {product.images?.map((image: any) => (
                  <TabPanel key={image.id}>
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.fileName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product Info */}
            <div className="mt-8 lg:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              {product.sku && (
                <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>
              )}

              <div className="mt-4 flex items-baseline gap-3">
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-lg text-gray-400 line-through">
                      {formatPrice(product.regularPrice)}
                    </p>
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-600">
                      -{Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {product.description && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Mô tả sản phẩm</h3>
                  <div
                    className="mt-2 text-sm text-gray-600 leading-relaxed prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    await addItem(product.id);
                    toast.success("Đã thêm vào giỏ hàng!");
                  }}
                  className="btn-primary flex-1 py-3.5"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  Thêm vào giỏ hàng
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg border-2 border-gray-200 px-4 text-gray-400 hover:border-red-300 hover:text-red-500 transition-colors"
                >
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                  <TruckIcon className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">Giao hàng nhanh</p>
                    <p className="text-xs text-gray-500">Từ 2 ngày toàn quốc</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                  <ShieldCheckIcon className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">Bảo hành chính hãng</p>
                    <p className="text-xs text-gray-500">12 tháng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 border-t pt-16">
              <h2 className="text-2xl font-bold text-gray-900">
                Sản Phẩm Liên Quan
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
