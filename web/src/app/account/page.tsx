"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/constants";
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type OrderLineItem = {
  id: string;
  quantity: number;
  price: number;
  totalPrice: number;
  product: {
    id: string;
    title: string;
    slug: string;
    images: { id: string; url: string }[];
  } | null;
};

type Order = {
  id: string;
  amount: number;
  status: string;
  note: string;
  createdDate: string;
  lineItems: OrderLineItem[];
};

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  Pending: "Chờ xác nhận",
  Confirmed: "Đã xác nhận",
  Shipped: "Đang giao",
  Delivered: "Đã giao",
  Cancelled: "Đã hủy",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?callbackUrl=/account");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <>
        <Header />
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-gray-400">Đang tải...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Header />
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tài khoản</h1>
        <button
          onClick={async () => {
            await logout();
            router.push("/");
          }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>

      <div className="space-y-8">
        <ProfileSection user={user!} />
        <OrderHistorySection />
      </div>
    </main>
    <Footer />
    </>
  );
}

function ProfileSection({ user }: { user: { id: string; name: string; email: string } }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const updateProfile = useMutation({
    mutationFn: async (data: { name: string }) => {
      const res = await fetch("/api/v1/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-session"] });
      setEditing(false);
    },
  });

  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <UserCircleIcon className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h2>
      </div>

      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile.mutate({ name });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="btn-primary disabled:opacity-50"
            >
              {updateProfile.isPending ? "Đang lưu..." : "Lưu"}
            </button>
            <button
              type="button"
              onClick={() => {
                setName(user.name);
                setEditing(false);
              }}
              className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Họ và tên</p>
              <p className="font-medium text-gray-900">{user.name}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Chỉnh sửa
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function OrderHistorySection() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["account-orders"],
    queryFn: async () => {
      const res = await fetch("/api/v1/account/orders", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <ClipboardDocumentListIcon className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Lịch sử đơn hàng</h2>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Đang tải...</p>
      ) : orders.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
          <a href="/" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
            Bắt đầu mua sắm
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border">
              <button
                onClick={() =>
                  setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                }
                className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(order.createdDate).toLocaleDateString("vi-VN")}</span>
                    <span>{order.lineItems.length} sản phẩm</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(order.amount)}
                    </span>
                  </div>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform ${expandedOrderId === order.id ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {expandedOrderId === order.id && (
                <div className="border-t px-4 pb-4 pt-3">
                  <ul className="divide-y">
                    {order.lineItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 py-3">
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {item.product?.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.product.images[0].url}
                              alt={item.product?.title || ""}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              N/A
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product?.title || "Sản phẩm"}
                          </p>
                          <p className="text-sm text-gray-500">
                            SL: {item.quantity} x {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(item.totalPrice)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex justify-between border-t pt-3">
                    <span className="text-sm font-medium text-gray-500">Tổng cộng</span>
                    <span className="text-base font-bold text-primary">
                      {formatPrice(order.amount)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
