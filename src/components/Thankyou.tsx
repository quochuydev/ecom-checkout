/* eslint-disable @next/next/no-img-element */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import useTranslations from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCart } from "@/hooks/useCart";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        Thank you for your order!
      </div>
    </main>
  );
}
