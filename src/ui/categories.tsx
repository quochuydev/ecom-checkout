"use client";
import React from "react";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Page({ products, productCategories }: any) {
  return (
    <>
      <Header />
      <Categories productCategories={productCategories} products={products} />
      <Footer />
    </>
  );
}
