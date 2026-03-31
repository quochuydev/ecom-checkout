"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function OrderPage({ order }: { order?: any }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="flex flex-col items-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Cảm ơn bạn đã đặt hàng!
          </h1>
          {order?.id && (
            <p className="mt-2 text-gray-500">
              Mã đơn hàng: <span className="font-medium text-gray-900">{order.id}</span>
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500 max-w-md">
            Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý.
            Bạn sẽ nhận được thông báo xác nhận qua email sớm nhất.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="/"
              className="btn-primary"
            >
              Tiếp tục mua sắm
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
