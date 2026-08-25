"use client";

import { ChangeEvent, useEffect, useState } from "react";

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

type BackupData = {
  app: string;
  version: number;
  createdAt: string;
  products: Product[];
  sales: Sale[];
};

export default function BackupPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function readCurrentData() {
    try {
      const products: Product[] = JSON.parse(
        localStorage.getItem("samo_products") || "[]"
      );

      const sales: Sale[] = JSON.parse(
        localStorage.getItem("samo_sales") || "[]"
      );

      setProductsCount(
        Array.isArray(products) ? products.length : 0
      );

      setSalesCount(
        Array.isArray(sales) ? sales.length : 0
      );
    } catch {
      setProductsCount(0);
      setSalesCount(0);
    }
  }

  useEffect(() => {
    readCurrentData();
  }, []);

  function createBackup() {
    setError("");
    setMessage("");

    try {
      const products: Product[] = JSON.parse(
        localStorage.getItem("samo_products") || "[]"
      );

      const sales: Sale[] = JSON.parse(
        localStorage.getItem("samo_sales") || "[]"
      );

      const backup: BackupData = {
        app: "SAMO Business AI",
        version: 1,
        createdAt: new Date().toISOString(),
        products: Array.isArray(products) ? products : [],
        sales: Array.isArray(sales) ? sales : [],
      };

      const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        {
          type: "application/json;charset=utf-8",
        }
      );

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        `samo-backup-${new Date()
          .toISOString()
          .slice(0, 10)}.json`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      setMessage(
        "تم إنشاء النسخة الاحتياطية بنجاح. احتفظ بالملف في مكان آمن."
      );
    } catch {
      setError(
        "تعذر إنشاء النسخة الاحتياطية."
      );
    }
  }

  function restoreBackup(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    setError("");
    setMessage("");

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const backup =
          JSON.parse(
            String(reader.result)
          ) as Partial<BackupData>;

        if (
          !backup ||
          backup.app !== "SAMO Business AI" ||
          !Array.isArray(backup.products) ||
          !Array.isArray(backup.sales)
        ) {
          throw new Error("invalid backup");
        }

        const ok = window.confirm(
          "سيتم استبدال بيانات المنتجات والمبيعات الحالية بالنسخة الاحتياطية. هل تريد المتابعة؟"
        );

        if (!ok) return;

        localStorage.setItem(
          "samo_products",
          JSON.stringify(backup.products)
        );

        localStorage.setItem(
          "samo_sales",
          JSON.stringify(backup.sales)
        );

        setProductsCount(
          backup.products.length
        );

        setSalesCount(
          backup.sales.length
        );

        setMessage(
          "تم استرجاع البيانات بنجاح. ارجع إلى SAMO واعمل Refresh للتأكد."
        );
      } catch {
        setError(
          "الملف غير صالح أو ليس نسخة احتياطية من SAMO."
        );
      }
    };

    reader.onerror = () => {
      setError(
        "تعذر قراءة ملف النسخة الاحتياطية."
      );
    };

    reader.readAsText(file);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#071525] text-white px-5 py-10"
    >
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">

          <div className="text-4xl font-black text-orange-400">
            SAMO
          </div>

          <div className="text-slate-400 mt-1">
            Business AI
          </div>

          <h1 className="mt-8 text-3xl md:text-4xl font-black">
            النسخ الاحتياطي للبيانات
          </h1>

          <p className="mt-3 text-slate-400">
            احفظ منتجاتك ومبيعاتك في ملف،
            واسترجعها عند الحاجة.
          </p>

        </div>

        <section className="rounded-3xl border border-white/10 bg-[#0d2035] p-6 mb-6">

          <div className="grid grid-cols-2 gap-4 mb-6">

            <div className="rounded-2xl bg-[#071525] p-5 text-center">

              <div className="text-slate-400 mb-2">
                المنتجات
              </div>

              <div className="text-3xl font-black">
                {productsCount}
              </div>

            </div>

            <div className="rounded-2xl bg-[#071525] p-5 text-center">

              <div className="text-slate-400 mb-2">
                عمليات البيع
              </div>

              <div className="text-3xl font-black">
                {salesCount}
              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={createBackup}
            className="w-full rounded-2xl bg-orange-500 px-5 py-4 text-lg font-black hover:bg-orange-400"
          >
            💾 إنشاء نسخة احتياطية
          </button>

        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0d2035] p-6 mb-6">

          <h2 className="text-2xl font-bold">
            استرجاع نسخة احتياطية
          </h2>

          <p className="mt-2 mb-5 text-slate-400">
            اختر ملف SAMO الاحتياطي الذي حفظته سابقًا.
          </p>

          <label className="block w-full cursor-pointer rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-4 text-center font-black text-emerald-300 hover:bg-emerald-500/20">

            🔄 اختيار ملف والاسترجاع

            <input
              type="file"
              accept="application/json,.json"
              onChange={restoreBackup}
              className="hidden"
            />

          </label>

        </section>

        {message && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-300">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error}
          </div>
        )}

        <a
          href="/"
          className="mt-6 block rounded-2xl bg-slate-700 px-5 py-4 text-center font-bold hover:bg-slate-600"
        >
          العودة إلى SAMO
        </a>

        <p className="mt-6 text-center text-xs text-slate-500">
          مهم: النسخة الاحتياطية تحفظ بيانات هذا المتصفح.
          احتفظ بملف JSON في مكان آمن.
        </p>

      </div>
    </main>
  );
}
