import React from "react";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          {/* Back button skeleton */}
          <div className="h-5 w-44 rounded bg-white/5" />

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Gallery skeleton */}
            <section className="rounded-[30px] border border-white/10 bg-white/5 p-3">
              <div className="aspect-[4/3] w-full rounded-[24px] bg-white/5 sm:aspect-[16/10]" />

              <div className="mt-4 flex gap-3 overflow-hidden">
                <div className="h-20 w-28 shrink-0 rounded-xl bg-white/5" />
                <div className="h-20 w-28 shrink-0 rounded-xl bg-white/5" />
                <div className="h-20 w-28 shrink-0 rounded-xl bg-white/5" />
              </div>
            </section>

            {/* Project information skeleton */}
            <section className="space-y-6">
              <div className="flex gap-3">
                <div className="h-8 w-32 rounded-full bg-white/5" />
                <div className="h-8 w-28 rounded-full bg-white/5" />
              </div>

              <div className="space-y-4">
                <div className="h-12 w-3/4 rounded bg-white/5" />
                <div className="h-5 w-full rounded bg-white/5" />
                <div className="h-5 w-5/6 rounded bg-white/5" />
                <div className="h-5 w-2/3 rounded bg-white/5" />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="h-9 w-24 rounded-xl bg-white/5" />
                <div className="h-9 w-28 rounded-xl bg-white/5" />
                <div className="h-9 w-24 rounded-xl bg-white/5" />
                <div className="h-9 w-32 rounded-xl bg-white/5" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-64 rounded-3xl bg-white/5" />
                <div className="h-64 rounded-3xl bg-white/5" />
              </div>
            </section>
          </div>

          {/* Tabs/content skeleton */}
          <section className="rounded-[30px] border border-white/10 bg-white/5 p-5">
            <div className="flex gap-3 border-b border-white/10 pb-4">
              <div className="h-10 w-24 rounded-full bg-white/5" />
              <div className="h-10 w-24 rounded-full bg-white/5" />
              <div className="h-10 w-28 rounded-full bg-white/5" />
              <div className="h-10 w-24 rounded-full bg-white/5" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-5 w-full rounded bg-white/5" />
              <div className="h-5 w-11/12 rounded bg-white/5" />
              <div className="h-5 w-4/5 rounded bg-white/5" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}