/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type CheckoutForm = {
  contact: { email: string };
  shipping: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    province: string;
    postalCode: string;
  };
};

export default function Checkout() {
  const { cart, checkout } = useCart();
  const [order, setOrder] = useState<any>(null);

  const { register, handleSubmit } = useForm<CheckoutForm>({
    defaultValues: {
      shipping: { country: "Vietnam" },
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await checkout({
      contact: { email: data.contact.email },
      shipping: {
        firstName: data.shipping.firstName,
        lastName: data.shipping.lastName,
        address: `${data.shipping.address}, ${data.shipping.province}, ${data.shipping.city}`,
      },
    });
    setOrder(result);
  });

  if (order?.orderId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="flex flex-col items-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Cảm ơn bạn đã đặt hàng!
          </h1>
          <p className="mt-2 text-gray-500">
            Mã đơn hàng: <span className="font-medium text-gray-900">{order.orderId}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
          </p>
          <a
            href="/"
            className="btn-primary mt-8"
          >
            Tiếp tục mua sắm
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="text-2xl font-bold text-gray-900">Thanh Toán</h1>

        <form
          className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12"
          onSubmit={onSubmit}
        >
          {/* Left column - Form */}
          <div className="lg:col-span-7">
            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Thông tin liên hệ
              </h2>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("contact.email")}
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="mt-8 border-t pt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Thông tin giao hàng
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    {...register("shipping.firstName")}
                    type="text"
                    id="firstName"
                    autoComplete="name"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    {...register("shipping.phoneNumber")}
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    {...register("shipping.address")}
                    type="text"
                    id="address"
                    autoComplete="street-address"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Thành phố
                  </label>
                  <input
                    {...register("shipping.city")}
                    type="text"
                    id="city"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    Quận / Huyện
                  </label>
                  <input
                    {...register("shipping.province")}
                    type="text"
                    id="province"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-8 border-t pt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Phương thức thanh toán
              </h2>
              <div className="mt-4 space-y-3">
                <label className="flex items-center rounded-lg border-2 border-primary bg-primary/5 p-4 cursor-pointer">
                  <input type="radio" name="paymentMethod" value="cod" defaultChecked className="text-primary focus:ring-primary" />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                </label>
                <label className="flex items-center rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="transfer" className="text-primary focus:ring-primary" />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Chuyển khoản ngân hàng
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Đơn hàng của bạn
              </h2>

              <ul className="mt-4 divide-y divide-gray-200">
                {cart?.lineItems?.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={item.product.images?.[0]?.url || "/placeholder.svg"}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-center">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-semibold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Tạm tính</dt>
                  <dd className="font-medium text-gray-900">
                    {formatPrice(cart?.amount ?? 0)}
                  </dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Phí vận chuyển</dt>
                  <dd className="font-medium text-gray-900">Miễn phí</dd>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <dt className="text-base font-semibold">Tổng cộng</dt>
                  <dd className="text-lg font-bold text-primary">
                    {formatPrice(cart?.amount ?? 0)}
                  </dd>
                </div>
              </dl>

              <button
                type="submit"
                className="btn-primary mt-6 w-full py-3.5"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
