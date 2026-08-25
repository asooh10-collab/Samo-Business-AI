"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantity: number;
};

type Sale = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  profit: number;
  date: string;
};

const initialProducts: Product[] = [
  { id: 1, name: "كريم مرطب", cost: 7000, price: 10000, quantity: 20 },
  { id: 2, name: "سيروم فيتامين C", cost: 12000, price: 18000, quantity: 15 },
  { id: 3, name: "ماسك شعر", cost: 6000, price: 9000, quantity: 25 },
  { id: 4, name: "عطر", cost: 18000, price: 25000, quantity: 10 },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sales, setSales] = useState<Sale[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<number>(1);
  const [saleQuantity, setSaleQuantity] = useState<number>(1);

  const selected = products.find((p) => p.id === selectedProduct);

  const totalSales = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.total, 0),
    [sales]
  );

  const totalProfit = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.profit, 0),
    [sales]
  );

  const stockValue = useMemo(
    () => products.reduce((sum, p) => sum + p.cost * p.quantity, 0),
    [products]
  );

  function registerSale() {
    if (!selected) return;

    if (saleQuantity < 1) {
      alert("أدخل كمية صحيحة");
      return;
    }

    if (saleQuantity > selected.quantity) {
      alert("الكمية الموجودة في المخزون غير كافية");
      return;
    }

    const total = selected.price * saleQuantity;
    const profit = (selected.price - selected.cost) * saleQuantity;

    const newSale: Sale = {
      id: Date.now(),
      productId: selected.id,
      productName: selected.name,
      quantity: saleQuantity,
      total,
      profit,
      date: new Date().toLocaleString("ar-IQ"),
    };

    setSales((prev) => [newSale, ...prev]);

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selected.id
          ? {
              ...product,
              quantity: product.quantity - saleQuantity,
            }
          : product
      )
    );

    setSaleQuantity(1);
  }

  function addProduct() {
    const name = prompt("اسم المنتج");
    if (!name) return;

    const cost = Number(prompt("سعر الشراء"));
    const price = Number(prompt("سعر البيع"));
    const quantity = Number(prompt("الكمية"));

    if (
      !name ||
      !Number.isFinite(cost) ||
      !Number.isFinite(price) ||
      !Number.isFinite(quantity) ||
      cost < 0 ||
      price < 0 ||
      quantity < 0
    ) {
      alert("البيانات غير صحيحة");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      cost,
      price,
      quantity,
    };

    setProducts((prev) => [...prev, newProduct]);
    setSelectedProduct(newProduct.id);
  }

  function clearSales() {
    if (sales.length === 0) return;

    const ok = confirm("هل تريد حذف سجل المبيعات؟");
    if (ok) {
      setSales([]);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#071525] text-white">
      <header className="border-b border-white/10 bg-[#0a1b2f]">
        <div className="mx-auto max-w-6xl px-5 py-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-black text-orange-400">SAMO</div>
            <div className="text-sm text-slate-400">Business AI</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-orange-400 font-bold">
              كوزمتك البسام
            </div>
            <div className="text-xs text-slate-400 mt-1">
              نظام إدارة المبيعات والمخزون
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <section className="mb-8">
          <div className="text-orange-400 font-bold mb-2">
            SAMO BUSINESS AI
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            طبيب الأعمال الذكي
          </h1>

          <p className="mt-3 text-slate-400 text-lg">
            سجل مبيعاتك، راقب المخزون واعرف ربحك الحقيقي.
          </p>
        </section>

        {/* الإحصائيات */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="المبيعات"
            value={`${totalSales.toLocaleString("ar-IQ")} د.ع`}
          />

          <StatCard
            title="الأرباح"
            value={`${totalProfit.toLocaleString("ar-IQ")} د.ع`}
            highlight
          />

          <StatCard
            title="قيمة المخزون"
            value={`${stockValue.toLocaleString("ar-IQ")} د.ع`}
          />

          <StatCard
            title="عدد المنتجات"
            value={products.length.toLocaleString("ar-IQ")}
          />
        </section>

        {/* تسجيل بيع */}
        <section className="rounded-3xl border border-white/10 bg-[#0d2035] p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">تسجيل عملية بيع</h2>
              <p className="text-slate-400 mt-1">
                عند تسجيل البيع سيتم خصم الكمية من المخزون وحساب الربح تلقائيًا.
              </p>
            </div>

            <button
              onClick={addProduct}
              className="rounded-xl bg-orange-500 px-5 py-3 font-bold hover:bg-orange-400"
            >
              + إضافة منتج
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                المنتج
              </label>

              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(Number(e.target.value))}
                className="w-full rounded-xl bg-[#071525] border border-white/10 p-4 text-white outline-none"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — المخزون: {product.quantity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                الكمية
              </label>

              <input
                type="number"
                min="1"
                value={saleQuantity}
                onChange={(e) =>
                  setSaleQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-full rounded-xl bg-[#071525] border border-white/10 p-4 text-white outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={registerSale}
                className="w-full rounded-xl bg-emerald-500 px-5 py-4 font-black text-lg hover:bg-emerald-400"
              >
                تسجيل البيع
              </button>
            </div>
          </div>

          {selected && (
            <div className="mt-5 rounded-2xl bg-[#071525] p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Info title="سعر الشراء" value={`${selected.cost.toLocaleString()} د.ع`} />
              <Info title="سعر البيع" value={`${selected.price.toLocaleString()} د.ع`} />
              <Info
                title="ربح القطعة"
                value={`${(selected.price - selected.cost).toLocaleString()} د.ع`}
              />
              <Info title="المخزون" value={`${selected.quantity} قطعة`} />
            </div>
          )}
        </section>

        {/* المخزون */}
        <section className="rounded-3xl border border-white/10 bg-[#0d2035] p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">المخزون</h2>
              <p className="text-slate-400 text-sm mt-1">
                المنتجات والكميات المتوفرة حاليًا
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="p-4">المنتج</th>
                  <th className="p-4">الشراء</th>
                  <th className="p-4">البيع</th>
                  <th className="p-4">الربح</th>
                  <th className="p-4">المخزون</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5"
                  >
                    <td className="p-4 font-bold">{product.name}</td>

                    <td className="p-4">
                      {product.cost.toLocaleString()} د.ع
                    </td>

                    <td className="p-4">
                      {product.price.toLocaleString()} د.ع
                    </td>

                    <td className="p-4 text-emerald-400 font-bold">
                      {(product.price - product.cost).toLocaleString()} د.ع
                    </td>

                    <td className="p-4">
                      <span
                        className={
                          product.quantity <= 5
                            ? "text-red-400 font-bold"
                            : "text-white"
                        }
                      >
                        {product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* سجل المبيعات */}
        <section className="rounded-3xl border border-white/10 bg-[#0d2035] p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold">سجل المبيعات</h2>
              <p className="text-slate-400 text-sm mt-1">
                جميع عمليات البيع المسجلة
              </p>
            </div>

            {sales.length > 0 && (
              <button
                onClick={clearSales}
                className="rounded-xl border border-red-500/30 px-4 py-2 text-red-400 hover:bg-red-500/10"
              >
                حذف السجل
              </button>
            )}
          </div>

          {sales.length === 0 ? (
            <div className="rounded-2xl bg-[#071525] p-10 text-center text-slate-400">
              لا توجد مبيعات مسجلة حتى الآن.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="p-4">المنتج</th>
                    <th className="p-4">الكمية</th>
                    <th className="p-4">إجمالي البيع</th>
                    <th className="p-4">الربح</th>
                    <th className="p-4">التاريخ</th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="border-b border-white/5"
                    >
                      <td className="p-4 font-bold">
                        {sale.productName}
                      </td>

                      <td className="p-4">{sale.quantity}</td>

                      <td className="p-4">
                        {sale.total.toLocaleString()} د.ع
                      </td>

                      <td className="p-4 text-emerald-400 font-bold">
                        {sale.profit.toLocaleString()} د.ع
                      </td>

                      <td className="p-4 text-slate-400 text-sm">
                        {sale.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <footer className="border-t border-white/10 mt-10 py-8 text-center text-slate-500 text-sm">
        SAMO Business AI — نظام إدارة الأعمال الذكي
      </footer>
    </main>
  );
}

function StatCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d2035] p-6">
      <div className="text-slate-400 mb-3">{title}</div>

      <div
        className={`text-2xl md:text-3xl font-black ${
          highlight ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-slate-500 mb-1">{title}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
