"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantity: number;
};

export default function Home() {
  const [products] = useState<Product[]>([
    { id: 1, name: "كريم مرطب", cost: 7000, price: 10000, quantity: 35 },
    { id: 2, name: "سيروم فيتامين C", cost: 12000, price: 18000, quantity: 18 },
    { id: 3, name: "ماسك شعر", cost: 6000, price: 9000, quantity: 80 },
    { id: 4, name: "عطر", cost: 18000, price: 25000, quantity: 25 },
  ]);

  const [sales, setSales] = useState(600000);

  const inventoryValue = useMemo(
    () => products.reduce((sum, p) => sum + p.cost * p.quantity, 0),
    [products]
  );

  const expectedSales = useMemo(
    () => products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [products]
  );

  const expectedProfit = expectedSales - inventoryValue;

  const profitMargin =
    expectedSales > 0 ? (expectedProfit / expectedSales) * 100 : 0;

  return (
    <main dir="rtl" className="min-h-screen bg-[#061525] text-white">
      <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#071a2d]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <div className="text-xl font-bold text-orange-400">SAMO</div>
            <div className="text-xs text-slate-400">Business AI</div>
          </div>

          <div className="hidden gap-6 text-sm md:flex">
            <a href="#dashboard" className="text-orange-400">
              لوحة التحكم
            </a>
            <a href="#products" className="text-slate-300">
              المنتجات والمخزون
            </a>
            <a href="#sales" className="text-slate-300">
              المبيعات
            </a>
            <a href="#profit" className="text-slate-300">
              الأرباح
            </a>
          </div>
        </div>
      </nav>

      <section id="dashboard" className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-orange-400">
            SAMO BUSINESS AI
          </p>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            طبيب الأعمال الذكي
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            من أرقام مشروعك إلى قرارات واضحة — بدون تعقيد محاسبي.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-orange-400/20 bg-[#0a2035] p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">المبيعات الحالية</p>
              <h2 className="mt-2 text-3xl font-black">
                {sales.toLocaleString("ar-IQ")} د.ع
              </h2>
            </div>

            <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
              ● يعمل محليًا
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            title="المبيعات"
            value={`${sales.toLocaleString("ar-IQ")} د.ع`}
          />

          <Stat
            title="قيمة المخزون"
            value={`${inventoryValue.toLocaleString("ar-IQ")} د.ع`}
          />

          <Stat
            title="الربح المتوقع"
            value={`${expectedProfit.toLocaleString("ar-IQ")} د.ع`}
          />

          <Stat
            title="هامش الربح"
            value={`${profitMargin.toFixed(1)}%`}
          />
        </div>
      </section>

      <section id="sales" className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-3xl border border-white/10 bg-[#091d30] p-6">
          <div className="mb-5">
            <p className="text-sm text-orange-400">تحديث البيانات</p>
            <h2 className="mt-1 text-2xl font-bold">
              تسجيل المبيعات
            </h2>
          </div>

          <label className="mb-2 block text-sm text-slate-400">
            إجمالي المبيعات
          </label>

          <input
            type="number"
            value={sales}
            onChange={(e) => setSales(Number(e.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-[#061525] px-5 py-4 text-xl outline-none focus:border-orange-400"
          />
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-3xl border border-white/10 bg-[#091d30] p-6">
          <div className="mb-6">
            <p className="text-sm text-orange-400">المخزون</p>
            <h2 className="mt-1 text-2xl font-bold">
              المنتجات والمخزون
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-right">
              <thead>
                <tr className="border-b border-white/10 text-sm text-slate-400">
                  <th className="px-4 py-4">المنتج</th>
                  <th className="px-4 py-4">التكلفة</th>
                  <th className="px-4 py-4">سعر البيع</th>
                  <th className="px-4 py-4">الكمية</th>
                  <th className="px-4 py-4">الربح</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  const profit = product.price - product.cost;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-white/5"
                    >
                      <td className="px-4 py-4 font-semibold">
                        {product.name}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {product.cost.toLocaleString("ar-IQ")} د.ع
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {product.price.toLocaleString("ar-IQ")} د.ع
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300">
                          {product.quantity}
                        </span>
                      </td>

                      <td className="px-4 py-4 font-bold text-green-400">
                        {profit.toLocaleString("ar-IQ")} د.ع
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="profit" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-3xl border border-orange-400/20 bg-gradient-to-br from-[#102942] to-[#081827] p-8">
          <p className="text-sm text-orange-400">تحليل سريع</p>

          <h2 className="mt-2 text-3xl font-black">
            قرار سامو
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            {profitMargin >= 30
              ? "هامش الربح جيد. يمكنك التركيز على المنتجات الأكثر مبيعًا وزيادة المخزون تدريجيًا."
              : "هامش الربح يحتاج إلى مراجعة. حاول تحسين سعر البيع أو تقليل تكلفة الشراء قبل التوسع."}
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        SAMO Business AI © 2026
      </footer>
    </main>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#091d30] p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}
