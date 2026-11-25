import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

const MANIFESTO_WORDS = [
  'در',
  'جهان',
  'سازمان‌های',
  'پرمخاطب،',
  'امضای',
  'کاغذی',
  'و',
  'مراجعه',
  'حضوری',
  'بزرگ‌ترین',
  'گلوگاه',
  'رشد',
  'است.',
  'ساینو',
  'با',
  'احراز',
  'هویت',
  'زنده،',
  'کلید',
  'سخت‌افزاری',
  'و',
  'گواهی',
  'مرکز',
  'ریشه',
  'کشور،',
  'هر',
  'قرارداد',
  'حقیقی،',
  'حقوقی',
  'و',
  'سفته',
  'الکترونیک',
  'را',
  'در',
  'کمتر',
  'از',
  'دو',
  'دقیقه',
  'به',
  'سندی',
  'معتبر',
  'و',
  'انکارناپذیر',
  'تبدیل',
  'می‌کند.',
];

const HIGHLIGHT_WORDS = new Set(['ساینو', 'زنده،', 'سخت‌افزاری', 'مرکز', 'ریشه', 'سفته', 'الکترونیک', 'انکارناپذیر']);

interface WordTokenProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

function WordToken({ word, range, progress }: WordTokenProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [4, 0]);
  const isAccent = HIGHLIGHT_WORDS.has(word);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block ml-2.5 sm:ml-3.5 transition-colors ${
        isAccent ? 'text-[#0057B8]' : 'text-[#0B162C]'
      }`}
    >
      {word}
    </motion.span>
  );
}

export function ScrollManifesto() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const ribbonPathLength = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section
      ref={containerRef}
      aria-label="بیانیه ارزش ساینو"
      className="relative h-[185vh] bg-[#F8FAFC] border-b border-slate-200/80"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
        {/* Scrubbed Signature Ribbon Accent in Background */}
        <svg
          viewBox="0 0 1440 520"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-auto opacity-35"
        >
          <motion.path
            d="M-80 410 C 240 120, 510 470, 780 230 C 1020 30, 1220 360, 1520 140"
            stroke="#0057B8"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength: ribbonPathLength }}
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-[1140px] px-5 sm:px-8">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200/90 pb-4">
            <p className="text-sm font-semibold text-[#0057B8]">
              چرا ساینو؟ · فلسفه تحول قراردادی
            </p>
            <span className="text-xs font-medium text-slate-500">
              اسکرول کنید تا بیانیه کامل شود
            </span>
          </div>

          <p
            className="font-extrabold tracking-tight leading-[1.65]"
            style={{ fontSize: 'clamp(1.55rem, 3.1vw, 2.75rem)' }}
          >
            {MANIFESTO_WORDS.map((word, index) => {
              const start = index / MANIFESTO_WORDS.length;
              const end = Math.min(1, start + 1.8 / MANIFESTO_WORDS.length);
              return (
                <WordToken
                  key={`${word}-${index}`}
                  word={word}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              );
            })}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 sm:text-sm">
            <span>حذف کامل کاغذ و بایگانی فیزیکی</span>
            <span aria-hidden="true">·</span>
            <span>امضای هم‌زمان اشخاص حقیقی و حقوقی</span>
            <span aria-hidden="true">·</span>
            <span>استقرار ۱۰۰٪ مستقل در دیتاسنتر سازمان</span>
          </div>
        </div>
      </div>
    </section>
  );
}
