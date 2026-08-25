"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantity: number;
};

type Sale = {
  id?: number;
  productId?: number;
  productName?: string;
  quantity?: number;
  total?: number;
  totalSale?: number;
  profit?: number;
  date?: string;
};

export default function OfferPage() {
  const [sales, setSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    try {
      const productsRaw = localStorage.getItem("samo_products");
      const salesRaw = localStorage.getItem("samo_sales");

      const products: Product[] = productsRaw
        ? JSON.parse(productsRaw)
        : [];

      const salesData: Sale[] = salesRaw
        ? JSON.parse(salesRaw)
        : [];

      const inventoryValue = products.reduce(
        (sum, product) =>
          sum +
          Number(product.cost || 0) *
            Number(product.quantity || 0),
        0
      );

      const totalSales = salesData.reduce((sum, sale) => {
        const value =
          sale.total ??
          sale.totalSale ??
          0;

        return sum + Number(value);
      }, 0);

      const totalProfit = salesData.reduce((sum, sale) => {
        return sum + Number(sale.profit || 0);
      }, 0);

      setInventory(inventoryValue);
      setSales(totalSales);
      setProfit(totalProfit);
      setProductsCount(products.length);
    } catch (error) {
      console.error("SAMO data error:", error);

      setSales(0);
      setProfit(0);
      setInventory(0);
      setProductsCount(0);
    }
  }, []);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("ar-IQ").format(value);

  const whatsappUrl =
    "https://wa.me/9647805826472?text=" +
    encodeURIComponent(
      "مرحباً، أريد شراء SAMO Business AI بسعر 25$."
    );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#071426] text-white"
    >
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0b1b30]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">

          <div>
            <div className="text-3xl font-black text-orange-400">
              SAMO
            </div>

            <div className="text-sm text-slate-400">
              Business AI
            </div>
          </div>

          <div className="text-left">
            <div className="text-lg font-bold text-orange-400">
              كوزمتك البسام
            </div>

            <div className="text-sm text-slate-400">
              نظام إدارة المبيعات والمخزون
            </div>
          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-14 text-center">
        <div className="mx-auto max-w-4xl">

          <div className="mb-4 text-lg font-bold text-orange-400">
            SAMO BUSINESS AI
          </div>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            طبيب الأعمال الذكي
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            سجل مبيعاتك، راقب المخزون، واعرف ربحك الحقيقي.
          </p>

        </div>
      </section>

      {/* Dashboard */}
      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">

          {/* Sales */}
          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-8">

            <div className="text-lg text-slate-400">
              إجمالي المبيعات
            </div>

            <div className="mt-4 text-4xl font-black">
              {formatMoney(sales)}

              <span className="mr-2 text-xl text-slate-400">
                د.ع
              </span>
            </div>

          </div>

          {/* Profit */}
          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-8">

            <div className="text-lg text-slate-400">
              إجمالي الأرباح
            </div>

            <div className="mt-4 text-4xl font-black text-emerald-400">
              {formatMoney(profit)}

              <span className="mr-2 text-xl text-slate-400">
                د.ع
              </span>
            </div>

          </div>

          {/* Inventory */}
          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-8">

            <div className="text-lg text-slate-400">
              قيمة المخزون
            </div>

            <div className="mt-4 text-4xl font-black">
              {formatMoney(inventory)}

              <span className="mr-2 text-xl text-slate-400">
                د.ع
              </span>
            </div>

          </div>

          {/* Products */}
          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-8">

            <div className="text-lg text-slate-400">
              عدد المنتجات
            </div>

            <div className="mt-4 text-4xl font-black">
              {productsCount}
            </div>

          </div>

        </div>
      </section>

      {/* Purchase CTA */}
      <section className="px-6 pb-20">

        <div className="mx-auto max-w-5xl rounded-3xl border border-orange-400/20 bg-[#0d2037] p-8 text-center">

          <div className="text-sm font-bold text-slate-400">
            النسخة الكاملة من SAMO Business AI
          </div>

          <div className="mt-2 text-5xl font-black text-orange-400">
            25$
          </div>

          <h2 className="mt-5 text-3xl font-black">
            إدارة مشروعك أصبحت أسهل
          </h2>

          <p className="mt-4 text-slate-400">
            إدارة المبيعات والمخزون والأرباح من مكان واحد.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-2xl bg-orange-500 px-12 py-4 text-lg font-black transition hover:bg-orange-400"
          >
            🟢 اشترِ SAMO الآن عبر واتساب
          </a>

          <div className="mt-4 text-sm text-slate-500">
            واتساب: 07805826472
          </div>

          <div className="mt-5">

            <Link
              href="/"
              className="text-sm font-bold text-slate-400 underline hover:text-white"
            >
              العودة إلى SAMO
            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        SAMO Business AI — نظام إدارة الأعمال الذكي
      </footer>

    </main>
  );
}
 
