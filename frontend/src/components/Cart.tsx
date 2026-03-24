/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/constants";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Cart({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { cart, increaseItem, decreaseItem, removeItem } = useCart();

  const totalItems = cart?.lineItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Transition show={open}>
      <Dialog className="relative z-[70]" onClose={setOpen}>
        <TransitionChild
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                      <DialogTitle className="text-lg font-semibold text-gray-900">
                        Giỏ Hàng ({totalItems})
                      </DialogTitle>
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Cart items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      {(!cart?.lineItems || cart.lineItems.length === 0) ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="rounded-full bg-gray-100 p-6 mb-4">
                            <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <p className="text-gray-500">Giỏ hàng trống</p>
                          <button
                            onClick={() => setOpen(false)}
                            className="mt-4 text-sm font-medium text-primary hover:text-primary/80"
                          >
                            Tiếp tục mua sắm
                          </button>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-100">
                          {cart.lineItems.map((lineItem) => (
                            <li key={lineItem.id} className="flex py-4">
                              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                <img
                                  src={lineItem.product.images?.[0]?.url || "/placeholder.svg"}
                                  alt={lineItem.product.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                                      <a href={`/products/${lineItem.product.slug}`}>
                                        {lineItem.product.title}
                                      </a>
                                    </h3>
                                    <p className="mt-0.5 text-sm font-semibold text-primary">
                                      {formatPrice(lineItem.price)}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                    onClick={() => removeItem(lineItem.productId)}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-2">
                                  <div className="flex items-center rounded-full border">
                                    <button
                                      type="button"
                                      className="p-1.5 text-gray-500 hover:text-gray-700"
                                      onClick={() => decreaseItem(lineItem.productId)}
                                    >
                                      <MinusIcon className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="px-3 text-sm font-medium">{lineItem.quantity}</span>
                                    <button
                                      type="button"
                                      className="p-1.5 text-gray-500 hover:text-gray-700"
                                      onClick={() => increaseItem(lineItem.productId)}
                                    >
                                      <PlusIcon className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {formatPrice(lineItem.price * lineItem.quantity)}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {cart?.lineItems && cart.lineItems.length > 0 && (
                      <div className="border-t px-6 py-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold text-gray-900">Tạm tính</p>
                          <p className="text-lg font-bold text-primary">
                            {formatPrice(cart.amount)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Phí vận chuyển sẽ được tính khi thanh toán
                        </p>
                        <a
                          href="/checkout"
                          className="btn-primary w-full"
                        >
                          Thanh toán
                        </a>
                        <button
                          type="button"
                          className="w-full text-center text-sm text-gray-500 hover:text-primary"
                          onClick={() => setOpen(false)}
                        >
                          Tiếp tục mua sắm
                        </button>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
