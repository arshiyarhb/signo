import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Fingerprint, KeyRound, ScanFace, ShieldCheck } from 'lucide-react';
import { HERO_METRICS, SIGNO_LOGO_SRC } from '../data/signoData';
import { LineReveal, MagneticButton, MagneticHeading } from './MotionPrimitives';

interface HeroSectionProps {
  onRequestDemo: () => void;
  onTrySimulator: () => void;
  loaderDone: boolean;
}

const VERIFICATION_LAYERS = [
  {
    id: 'liveness',
    label: '۱. احراز هویت زنده',
    icon: ScanFace,
    headline: 'تطبیق چهره زنده با ثبت احوال (هدا) و شاهکار',
    detail: 'فناوری ضد جعل Deepfake Resistant برای تایید عینی امضاکننده پیش از صدور گواهی.',
    specLabel: 'منبع اعتبارسنجی',
    specValue: 'سامانه هدا · شاهکار · استعلام صاحبان حق امضا',
  },
  {
    id: 'key',
    label: '۲. کلید سخت‌افزاری',
    icon: KeyRound,
    headline: 'تولید زوج کلید درون Secure Element دستگاه',
    detail: 'کلید خصوصی هرگز از سخت‌افزار گوشی خارج نمی‌شود و با ورود One Tap محافظت می‌گردد.',
    specLabel: 'استاندارد رمزنگاری',
    specValue: 'ECDH · گواهی مرکز ریشه سطح ۱ و ۲',
  },
  {
    id: 'pades',
    label: '۳. امضای PAdES و مهر زمانی',
    icon: Fingerprint,
    headline: 'ثبت امضای حقوقی و حقیقی انکارناپذیر روی PDF',
    detail: 'اعمال هم‌زمان امضای اشخاص و مهر دیجیتال سازمانی با مهر زمانی معتبر و استنادپذیری قضایی.',
    specLabel: 'استاندارد سند',
    specValue: 'PAdES / CAdES · Timestamp Authority',
  },
] as const;

export function HeroSection({
  onRequestDemo,
  onTrySimulator,
  loaderDone,
}: HeroSectionProps) {
  const [activeLayer, setActiveLayer] = useState<number>(2);
  const current = VERIFICATION_LAYERS[activeLayer];

  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-200/80 bg-white">
      {/* Flanking Animated SVG Signature Ribbons (Two26 Hero Path Style) */}
      <svg
        viewBox="0 0 1440 680"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
      >
        <motion.path
          d="M-60 90 C 140 40, 260 220, 410 120"
          stroke="#0057B8"
          strokeOpacity="0.16"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: loaderDone ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M1500 560 C 1280 620, 1140 420, 960 510"
          stroke="#007B7A"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: loaderDone ? 1 : 0 }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-12 pb-14 sm:px-8 lg:pt-18 lg:pb-20">
        {/* Asymmetric 2-Column Editorial Split */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Right Column (RTL Start): Core Proposition */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: loaderDone ? 1 : 0, y: loaderDone ? 0 : 12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-medium text-slate-500"
              >
                زیرساخت بومی احراز هویت و امضای دیجیتال · محصول گروه شرکت‌های گرایش تازه کیش (GSS)
              </motion.p>

              {/* Magnetic Dual-Layer Headline + Line-by-Line Mask Reveal */}
              <div className="mt-5">
                <MagneticHeading
                  as="h1"
                  accentColorClass="text-[#0057B8]/20"
                  className="font-extrabold tracking-tight text-[#0B162C] leading-[1.28]"
                  style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.45rem)' }}
                >
                  <LineReveal delay={loaderDone ? 0.05 : 0}>
                    امضای دیجیتال با اعتبار
                  </LineReveal>
                  <LineReveal delay={loaderDone ? 0.16 : 0}>
                    قانونی، در کمتر از{' '}
                    <span className="text-[#0057B8]">۲ دقیقه</span>
                  </LineReveal>
                </MagneticHeading>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: loaderDone ? 1 : 0, y: loaderDone ? 0 : 18 }}
                transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-[17px]"
              >
                «ساینو» زیرساخت یکپارچه و مستقل سازمانی برای احراز هویت غیرحضوری، صدور گواهی
                امضای حقیقی و حقوقی، مهر دیجیتال سازمانی و مدیریت قراردادها و سفته الکترونیک است؛
                طراحی‌شده برای بانک‌ها، هلدینگ‌ها و سازمان‌های با تعدد شعب.
              </motion.p>

              {/* CTA Block: Magnetic Primary + Magnetic Outline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: loaderDone ? 1 : 0, y: loaderDone ? 0 : 16 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <MagneticButton
                  variant="primary"
                  onClick={onRequestDemo}
                  className="px-7 py-3.5 text-sm"
                >
                  <span>درخواست جلسه دمو و استقرار</span>
                  <ArrowLeft className="h-4 w-4" />
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  onClick={onTrySimulator}
                  className="px-6 py-3.5 text-sm"
                >
                  آزمون شبیه‌ساز امضای سند
                </MagneticButton>
              </motion.div>
            </div>

            {/* Clean Unboxed Institutional Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loaderDone ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 border-t border-slate-200 pt-6"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500 sm:text-[13px]">
                <span className="text-[#0B162C] font-semibold">
                  مورد تایید آزمایشگاه مرکز ریشه کشور
                </span>
                <span aria-hidden="true">·</span>
                <span>منطبق با قانون تجارت الکترونیکی</span>
                <span aria-hidden="true">·</span>
                <span>تحویل مستقل On-Premise</span>
              </div>
            </motion.div>
          </div>

          {/* Left Column (RTL End): Interactive Cryptographic Contract Verification Showcase */}
          <motion.div
            initial={{
              clipPath: 'inset(10% 8% 10% 8% round 28px)',
              opacity: 0,
              scale: 1.05,
            }}
            animate={
              loaderDone
                ? {
                    clipPath: 'inset(0% 0% 0% 0% round 16px)',
                    opacity: 1,
                    scale: 1,
                  }
                : undefined
            }
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="flex w-full flex-col justify-between rounded-2xl border border-slate-200 bg-[#0B162C] p-6 text-white sm:p-8">
              {/* Top Document Metadata Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-medium text-slate-300">
                    نمونه قرارداد الکترونیک ثبت‌شده در ساینو
                  </p>
                  <h2 className="mt-1.5 text-lg font-bold text-white">
                    قرارداد مشارکت و تسهیلات اعتباری شرکتی
                  </h2>
                  <p className="mt-1 text-xs text-slate-400 tabular-fa">
                    شناسه سند: SIG-1405-9042 · امضای دوجانبه حقیقی و حقوقی
                  </p>
                </div>

                <div className="rounded-lg bg-white px-2.5 py-1.5 shrink-0">
                  <img
                    src={SIGNO_LOGO_SRC}
                    alt="ساینو"
                    referrerPolicy="no-referrer"
                    className="h-7 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Simulated Signed Document Preview Body */}
              <div className="my-6 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="h-5 w-5 text-sky-400 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-white">{current.headline}</p>
                          <p className="mt-0.5 text-xs text-slate-300 leading-6">
                            {current.detail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cryptographic Seal Details */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] text-slate-400">طرف اول (مهر دیجیتال سازمانی)</p>
                        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-white">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>امضا و ممهور به توکن حقوقی</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400">
                          طرف دوم (مدیرعامل شرکت طرف قرارداد)
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-white">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>احراز شده در هدا و امضا شده</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-400">{current.specLabel}:</span>
                      <span className="font-mono-tech text-sky-300" dir="ltr">
                        {current.specValue}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Layer Switcher Controls */}
              <div>
                <p className="mb-2.5 text-xs text-slate-400">
                  مراحل زنجیره اعتماد سند را بررسی کنید:
                </p>
                <div
                  role="tablist"
                  aria-label="لایه‌های امنیتی امضا"
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                  {VERIFICATION_LAYERS.map((layer, index) => {
                    const Icon = layer.icon;
                    const isActive = activeLayer === index;
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveLayer(index)}
                        className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#0057B8] text-white'
                            : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.12] hover:text-white'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span>{layer.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <span className="text-2xl font-extrabold tracking-tight text-[#0B162C] tabular-fa sm:text-[26px]">
                {metric.value}
              </span>
              <span className="mt-1.5 text-sm font-semibold text-slate-800">
                {metric.label}
              </span>
              <span className="mt-1 text-xs leading-5 text-slate-500">
                {metric.context}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
