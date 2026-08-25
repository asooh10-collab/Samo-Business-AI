"use client";

export default function OfferPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#071525] text-white">
      <header className="border-b border-white/10 bg-[#0a1b2f]">
        <div className="mx-auto max-w-5xl px-5 py-6 flex items-center justify-between">
          <div>
            <div className="text-3xl font-black text-orange-400">SAMO</div>
            <div className="text-sm text-slate-400">Business AI</div>
          </div>

          <div className="text-right">
            <div className="font-bold text-orange-400">كوزمتك البسام</div>
            <div className="text-xs text-slate-400 mt-1">
              نظام إدارة المبيعات والمخزون
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-14">
        <section className="text-center">
          <div className="inline-block rounded-full bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-400">
            SAMO BUSINESS AI
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            سيطر على مبيعاتك واعرف ربحك الحقيقي
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            نظام بسيط لأصحاب المحلات يساعدك على تسجيل المبيعات،
            متابعة المخزون وحساب الأرباح تلقائيًا.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#0d2035] p-6">
            <div className="text-3xl">📊</div>
            <h2 className="mt-4 text-xl font-bold">متابعة المبيعات</h2>
            <p className="mt-2 text-slate-400">
              اعرف إجمالي مبيعاتك وأرباحك في مكان واحد.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d2035] p-6">
            <div className="text-3xl">📦</div>
            <h2 className="mt-4 text-xl font-bold">إدارة المخزون</h2>
            <p className="mt-2 text-slate-400">
              راقب الكميات المتوفرة وتجنب نفاد المنتجات.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d2035] p-6">
            <div className="text-3xl">💰</div>
            <h2 className="mt-4 text-xl font-bold">حساب الربح</h2>
            <p className="mt-2 text-slate-400">
              احسب ربح كل عملية بيع تلقائيًا وبوضوح.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-orange-500/30 bg-[#0d2035] p-8 text-center">
          <h2 className="text-3xl font-black">جرّب SAMO الآن</h2>

          <p className="mt-3 text-slate-400">
            ابدأ بإدارة منتجاتك ومبيعاتك من لوحة واحدة.
          </p>

          <a
            href="/"
            className="mt-7 inline-block rounded-2xl bg-orange-500 px-10 py-4 text-lg font-black hover:bg-orange-400"
          >
            الدخول إلى النظام
          </a>
        </section>

        <footer className="mt-12 text-center text-sm text-slate-500">
          SAMO Business AI — نظام إدارة الأعمال الذكي
        </footer>
      </div>
    </main>
  );
}
