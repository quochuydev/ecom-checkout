"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Layout from "@/components/admin/Layout";
import type { OrderShape } from "@/types/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "@/lib/api-caller";
import { formatPrice } from "@/lib/constants";

const ORDER_STATUSES = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const apiService = ApiService("");
  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const data = await apiService.request<{
        url: string;
        method: "get";
        result: { items: OrderShape[] };
      }>({
        url: "/api/v1/admin/orders",
        method: "get",
      });
      return data?.items || [];
    },
  });

  async function updateOrderStatus(orderId: string, status: string) {
    await apiService.request({
      url: `/api/v1/admin/orders/${orderId}`,
      method: "patch" as any,
      data: { status },
    } as any);
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredOrders, page, pageSize]);

  return (
    <Layout page="orders">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        <div className="overflow-hidden rounded-lg border shadow-sm">
          <div className="bg-muted/40 flex items-center gap-2 px-4 py-3">
            <div className="relative flex-1">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-full pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer?.firstName}</p>
                      <p className="text-xs text-muted-foreground">{order.customer?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(order.createdDate).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(order.amount)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className={`h-8 w-[130px] text-xs font-medium ${statusColors[order.status] || ""}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${statusColors[status] || ""}`}>
                              {status}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="bg-muted/40 flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <p className="text-nowrap text-sm">
                {`Showing ${(page - 1) * pageSize + 1} to ${Math.min(
                  page * pageSize,
                  filteredOrders.length
                )} of ${filteredOrders.length} orders`}
              </p>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => setPageSize(parseInt(value))}
              >
                <SelectTrigger className="h-8 w-20">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
