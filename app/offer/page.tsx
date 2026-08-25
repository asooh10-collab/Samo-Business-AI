"use client";

import Link from "next/link";

export default function OfferPage() {
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
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-lg font-bold text-orange-400">
            SAMO BUSINESS AI
          </div>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            حوّل إدارة مشروعك
            <br />
            إلى عمل ذكي
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            سجل مبيعاتك، تابع المخزون، واحسب أرباحك الحقيقية
            بسهولة من مكان واحد.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="w-full rounded-2xl bg-orange-500 px-10 py-4 text-lg font-black text-white transition hover:bg-orange-400 sm:w-auto"
            >
              ابدأ استخدام SAMO
            </Link>

            <a
              href="#features"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-10 py-4 text-lg font-bold text-white sm:w-auto"
            >
              اكتشف المميزات
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 pb-16">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-7">
            <div className="mb-4 text-4xl">💰</div>
            <h2 className="mb-3 text-xl font-black">
              متابعة المبيعات
            </h2>
            <p className="leading-7 text-slate-400">
              سجل كل عملية بيع واعرف إجمالي مبيعاتك وأرباحك
              بسهولة.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-7">
            <div className="mb-4 text-4xl">📦</div>
            <h2 className="mb-3 text-xl font-black">
              إدارة المخزون
            </h2>
            <p className="leading-7 text-slate-400">
              تابع الكميات المتوفرة واعرف قيمة المخزون
              الموجودة لديك.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d2037] p-7">
            <div className="mb-4 text-4xl">📊</div>
            <h2 className="mb-3 text-xl font-black">
              معرفة الأرباح
            </h2>
            <p className="leading-7 text-slate-400">
              احسب ربح كل منتج وإجمالي أرباح مشروعك بشكل واضح.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-orange-400/20 bg-[#0d2037] p-10 text-center">
          <h2 className="text-3xl font-black">
            جاهز لإدارة مشروعك بطريقة أذكى؟
          </h2>

          <p className="mt-4 text-slate-400">
            ابدأ الآن وسجل أول عملية بيع.
          </p>

          <Link
            href="/"
            className="mt-7 inline-block rounded-2xl bg-emerald-500 px-12 py-4 text-lg font-black text-white transition hover:bg-emerald-400"
          >
            الدخول إلى النظام
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        SAMO Business AI — نظام إدارة الأعمال الذكي
      </footer>
    </main>
  );
}
