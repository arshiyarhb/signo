import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  Clock,
  Landmark,
  Minus,
  Plus,
  Server,
} from 'lucide-react';
import { DEPLOYMENT_PHASES, VOLUME_TIERS } from '../data/signoData';
import { ClipMaskReveal, MagneticButton, MagneticHeading } from './MotionPrimitives';
import { StackedProjectsDeck } from './StackedProjectsDeck';

interface DeploymentAndProofProps {
  onRequestDemo: () => void;
}

const BASE_LICENSE_BILLION_TOMAN = 2.15;
const EXTRA_PANEL_MILLION_TOMAN = 320;
const MONTHLY_SUPPORT_MILLION_TOMAN = 60;

function formatFaNumber(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value);
}

export function DeploymentAndProof({ onRequestDemo }: DeploymentAndProofProps) {
  const [activePhase, setActivePhase] = useState<number>(0);
  const [panelCount, setPanelCount] = useState<number>(4);
  const [annualSignatures, setAnnualSignatures] = useState<number>(3500);

  const extraPanels = Math.max(0, panelCount - 4);
  const totalLicenseMillionToman =
    BASE_LICENSE_BILLION_TOMAN * 1000 + extraPanels * EXTRA_PANEL_MILLION_TOMAN;

  const activeTier =
    VOLUME_TIERS.find(
      (tier) => annualSignatures >= tier.min && annualSignatures <= tier.max
    ) ?? VOLUME_TIERS[0];

  const annualSignatureCostToman = annualSignatures * activeTier.pricePerSign;

  return (
    <>
      {/* Deployment & Transparent Pricing Estimator */}
      <section id="deployment" className="border-t border-slate-200/90 bg-white py-18 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0057B8]">
              استقرار مستقل درون‌سازمانی و مدل تجاری شفاف
            </p>
            <div className="mt-2.5">
              <MagneticHeading
                as="h2"
                className="text-2xl font-extrabold tracking-tight text-[#0B162C] sm:text-4xl leading-snug"
              >
                تحویل کامل On-Premise ظرف یک هفته تقویمی
              </MagneticHeading>
            </div>
            <p className="mt-3 text-base leading-7 text-slate-600">
              کلیه اجزای سامانه، پایگاه داده، گواهی‌ها و اسناد امضاشده به‌صورت ۱۰۰٪ مستقل در بستر
              زیرساختی داخلی سازمان شما نصب، نگهداری و مدیریت می‌شوند.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Right: 7-Day Deployment Timeline */}
            <ClipMaskReveal className="lg:col-span-6 flex">
              <div className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-2.5">
                      <Server className="h-5 w-5 text-[#0057B8]" />
                      <h3 className="text-lg font-bold text-[#0B162C]">
                        برنامه زمان‌بندی استقرار ۷ روزه
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-[#0057B8]" />
                      <span>مجموع: ۷ روز تقویمی</span>
                    </span>
                  </div>

                  {/* Phase Switcher */}
                  <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-200/70 p-1">
                    {DEPLOYMENT_PHASES.map((phase, idx) => (
                      <button
                        key={phase.phase}
                        type="button"
                        onClick={() => setActivePhase(idx)}
                        className={`rounded-lg py-2.5 px-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activePhase === idx
                            ? 'bg-white text-[#0B162C] shadow-xs'
                            : 'text-slate-600 hover:text-[#0B162C]'
                        }`}
                      >
                        {phase.phase} · {phase.duration}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="mt-6"
                    >
                      <p className="text-sm font-bold text-[#0057B8]">
                        {DEPLOYMENT_PHASES[activePhase].title}
                      </p>
                      <div className="mt-5 space-y-4">
                        {DEPLOYMENT_PHASES[activePhase].tasks.map((task, idx) => (
                          <div
                            key={task.name}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xs font-bold text-[#0057B8] tabular-fa mt-0.5">
                                ۰{idx + 1}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-[#0B162C]">{task.name}</h4>
                                <p className="mt-1 text-xs leading-6 text-slate-600">
                                  {task.detail}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
                  شامل ۶ ماه گارانتی رایگان پس از تحویل و پشتیبانی فنی ماهانه پس از اتمام دوره
                  گارانتی.
                </div>
              </div>
            </ClipMaskReveal>

            {/* Left: Interactive Volume & License Estimator */}
            <ClipMaskReveal delay={0.08} className="lg:col-span-6 flex">
              <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-200 pb-5">
                    <h3 className="text-lg font-bold text-[#0B162C]">
                      برآوردگر شفاف بهره‌برداری و تخفیف حجمی
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      بر اساس ساختار تعرفه تجاری ساینو (بهره‌برداری پایه شامل ۴ پنل مستقل + تعرفه
                      پلکانی امضا)
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                    <div>
                      <p className="text-sm font-bold text-[#0B162C]">
                        تعداد پنل یا شرکت حقوقی مستقل
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        پکیج پایه شامل ۴ پنل مستقل است · هر پنل مازاد ۳۲۰ میلیون تومان
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        aria-label="کاهش تعداد پنل"
                        onClick={() => setPanelCount((c) => Math.max(4, c - 1))}
                        disabled={panelCount <= 4}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-base font-extrabold text-[#0B162C] tabular-fa">
                        {formatFaNumber(panelCount)}
                      </span>
                      <button
                        type="button"
                        aria-label="افزایش تعداد پنل"
                        onClick={() => setPanelCount((c) => Math.min(12, c + 1))}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="signature-volume"
                        className="text-sm font-bold text-[#0B162C]"
                      >
                        تخمین حجم امضای اسناد PDF در سال
                      </label>
                      <span className="text-base font-extrabold text-[#0057B8] tabular-fa">
                        {formatFaNumber(annualSignatures)} امضا
                      </span>
                    </div>

                    <input
                      id="signature-volume"
                      type="range"
                      min={500}
                      max={10000}
                      step={250}
                      value={annualSignatures}
                      onChange={(e) => setAnnualSignatures(Number(e.target.value))}
                      className="mt-4 w-full accent-[#0057B8] cursor-pointer"
                    />

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 tabular-fa">
                      <span>۵۰۰ امضا</span>
                      <span>۲,۰۰۰ (۰٪)</span>
                      <span>۳,۰۰۰ (۶٪)</span>
                      <span>۴,۰۰۰ (۸٪)</span>
                      <span>۱۰,۰۰۰ (۱۰٪)</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-600">
                        واگذاری حق بهره‌برداری، نصب، آموزش ({formatFaNumber(panelCount)} پنل مستقل)
                      </span>
                      <span className="font-bold text-[#0B162C] tabular-fa whitespace-nowrap">
                        {formatFaNumber(totalLicenseMillionToman)} میلیون تومان
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-600">
                        تعرفه هر امضا در پله {activeTier.label}
                        {activeTier.discount > 0
                          ? ` (${formatFaNumber(activeTier.discount)}٪ تخفیف)`
                          : ''}
                      </span>
                      <span className="font-bold text-[#0057B8] tabular-fa whitespace-nowrap">
                        {formatFaNumber(activeTier.pricePerSign)} تومان
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-600">برآورد هزینه سالانه تراکنش امضای PDF</span>
                      <span className="font-bold text-[#0B162C] tabular-fa whitespace-nowrap">
                        {formatFaNumber(annualSignatureCostToman)} تومان
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500 pt-1">
                      <span>خدمات پشتیبانی فنی پس از اتمام ۶ ماه گارانتی رایگان</span>
                      <span className="tabular-fa whitespace-nowrap">
                        ماهانه {formatFaNumber(MONTHLY_SUPPORT_MILLION_TOMAN)} میلیون تومان
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500">
                    سایر تراکنش‌های احراز هویت و صدور گواهی: زنده‌سنجی و تطبیق چهره ۱۰,۰۰۰ تومان ·
                    صدور گواهی سطح دوشش ۲۵,۰۰۰ تومان · احراز هویت هدا طبق تعرفه مصوب ثبت احوال کشور.
                  </div>
                </div>

                <div className="mt-6">
                  <MagneticButton
                    variant="dark"
                    onClick={onRequestDemo}
                    className="w-full px-6 py-3.5 text-sm"
                  >
                    <span>دریافت پیشنهاد تجاری اختصاصی سازمان شما</span>
                    <ArrowLeft className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>
            </ClipMaskReveal>
          </div>
        </div>
      </section>

      {/* GSS Heritage & Interactive Stacked Projects Deck */}
      <section
        id="gss"
        className="border-t border-slate-200/90 bg-[#0B162C] py-20 text-white lg:py-26 overflow-hidden"
      >
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Company Identity */}
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-teal-400">
                پشتوانه اجرایی و فنی · گروه شرکت‌های گرایش تازه کیش (GSS)
              </p>
              <div className="mt-3">
                <MagneticHeading
                  as="h2"
                  accentColorClass="text-sky-400/25"
                  className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl leading-snug"
                >
                  بیش از سه دهه اعتماد شبکه بانکی و زیرساخت‌های حاکمیتی کشور
                </MagneticHeading>
              </div>
              <p className="mt-4 text-sm leading-8 text-slate-300">
                گروه شرکت‌های گرایش تازه کیش با برند تجاری{' '}
                <span className="font-latin font-semibold text-white">GSS</span> در سال ۱۳۶۸
                به‌عنوان یک مجموعه تماماً ایرانی و دانش‌بنیان تأسیس گردید. امروز این هلدینگ با توان
                ۱۲ شرکت زیرمجموعه و ۱۸ ثبت اختراع، راهکارهای بانکداری دیجیتال، احراز هویت، کلید
                عمومی و خدمات حاکمیتی را در مقیاس ملی طراحی و پشتیبانی می‌کند.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <div className="flex items-center gap-2 text-teal-400">
                    <Landmark className="h-4 w-4" />
                    <span className="text-xs font-medium">پشتیبانی سراسری</span>
                  </div>
                  <p className="mt-1.5 text-2xl font-extrabold text-white tabular-fa">۲۱,۵۰۰+</p>
                  <p className="mt-0.5 text-xs text-slate-400">شعبه بانکی تحت پشتیبانی در کشور</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-teal-400">
                    <Award className="h-4 w-4" />
                    <span className="text-xs font-medium">پروژه‌های ملی</span>
                  </div>
                  <p className="mt-1.5 text-2xl font-extrabold text-white tabular-fa">
                    ۵ پروژه ملی
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">اجرا و پشتیبانی در ۶۰۰ نقطه کشور</p>
                </div>
              </div>
            </div>

            {/* Two26-Inspired Organic Stacked Card Deck */}
            <div className="lg:col-span-7">
              <StackedProjectsDeck />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
