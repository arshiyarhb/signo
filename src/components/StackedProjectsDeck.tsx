import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Landmark } from 'lucide-react';
import { GSS_MILESTONE_PROJECTS } from '../data/signoData';

const STACK_ROTATIONS = [0, -3.5, 3, -5, 4.5, -2.5];

export function StackedProjectsDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = GSS_MILESTONE_PROJECTS.length;

  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold text-slate-300">
          پروژه‌های شاخص اجرایی گروه GSS · برای ورق زدن روی کارت کلیک کنید
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="پروژه قبلی"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.14] cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-semibold text-slate-300 tabular-fa">
            ۰{activeIndex + 1} / ۰{total}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="پروژه بعدی"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.14] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Organic Stacked Deck + Dynamic Sidebar Ticks */}
      <div className="flex items-center gap-5 sm:gap-7">
        {/* Stacked Cards Stage */}
        <div
          onClick={goNext}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              goNext();
            }
          }}
          aria-label="مشاهده پروژه شاخص بعدی گروه GSS"
          className="relative h-[290px] sm:h-[310px] w-full flex-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl"
        >
          {GSS_MILESTONE_PROJECTS.map((project, idx) => {
            const offset = (idx - activeIndex + total) % total;
            const isFront = offset === 0;
            const visibleDepth = Math.min(offset, 4);
            const rotation = isFront ? 0 : STACK_ROTATIONS[offset % STACK_ROTATIONS.length];

            return (
              <motion.div
                key={project.title}
                initial={false}
                animate={{
                  rotate: rotation,
                  y: visibleDepth * 10,
                  x: isFront ? 0 : offset % 2 === 0 ? -8 : 8,
                  scale: 1 - visibleDepth * 0.045,
                  opacity: offset > 4 ? 0 : 1 - visibleDepth * 0.16,
                  zIndex: total - offset,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 230,
                  damping: 22,
                }}
                whileHover={isFront ? { y: -4, scale: 1.01 } : undefined}
                className={`absolute inset-0 flex flex-col justify-between rounded-2xl border p-6 sm:p-8 ${
                  isFront
                    ? 'border-white/25 bg-[#122240] text-white shadow-xl shadow-black/30'
                    : 'border-white/10 bg-[#0F1C36] text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                    <Landmark className="h-4 w-4 shrink-0" />
                    <span>{project.category}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 tabular-fa">
                    پروژه ۰{idx + 1}
                  </span>
                </div>

                <div className="my-auto py-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-sky-300">
                    بهره‌بردار: {project.institution}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>عملیاتی در مقیاس بانکی و ملی</span>
                  </span>
                  <span className="text-slate-400">کلیک برای پروژه بعدی</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Vertical Tick Sidebar (Two26 .side-bar style) */}
        <div
          aria-label="شاخص انتخاب پروژه"
          className="hidden sm:flex flex-col items-end gap-2.5 shrink-0"
        >
          {GSS_MILESTONE_PROJECTS.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.title}
                type="button"
                aria-label={`نمایش ${project.title}`}
                onClick={() => setActiveIndex(idx)}
                className="group py-1.5 pl-1 cursor-pointer focus-visible:outline-none"
              >
                <motion.span
                  animate={{
                    width: isActive ? 38 : 16,
                    backgroundColor: isActive ? '#38BDF8' : 'rgba(255,255,255,0.28)',
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="block h-[3px] rounded-full group-hover:bg-white/70"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
