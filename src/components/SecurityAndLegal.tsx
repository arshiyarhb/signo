import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Cpu,
  FileText,
  Scale,
  ScanFace,
  ShieldCheck,
} from 'lucide-react';
import { LEGAL_BACKINGS } from '../data/signoData';
import { ClipMaskReveal, MagneticHeading } from './MotionPrimitives';

interface StrokeHoverCardProps {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
  delay?: number;
}

function StrokeHoverCard({
  children,
  className = '',
  strokeColor = '#0057B8',
  delay = 0,
}: StrokeHoverCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <ClipMaskReveal delay={delay} className="h-full">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative overflow-hidden h-full transition-transform duration-300 ${className}`}
      >
        {/* Two26-inspired animated calligraphic brush stroke accent on hover */}
        <svg
          viewBox="0 0 600 18"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 right-0 h-3 w-full"
        >
          <motion.path
            d="M0 3 C 150 14, 380 -4, 600 5"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={false}
            animate={{
              pathLength: hovered ? 1 : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        {children}
      </div>
    </ClipMaskReveal>
  );
}

export function SecurityAndLegal() {
  return (
    <section id="security" className="bg-[#F8FAFC] py-18 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#0057B8]">معماری امنیت و استانداردهای رمزنگاری</p>
          <div className="mt-2.5">
            <MagneticHeading
              as="h2"
              className="text-2xl font-extrabold tracking-tight text-[#0B162C] sm:text-4xl leading-snug"
            >
              امنیت در تراز شبکه بانکی و انطباق کامل با قوانین کشور
            </MagneticHeading>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            تمامی اجزای فنی ساینو از احراز هویت چهره‌محور تا نگهداری سخت‌افزاری کلیدها و اتصال به
            مرکز ریشه کشور، مطابق آخرین استانداردهای بین‌المللی و الزامات حاکمیتی مهندسی شده‌اند.
          </p>
        </div>

        {/* Asymmetric Bento Grid with 3D Clip-Mask Reveal & SVG Hover Stroke Draw */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Wide (7 cols) */}
          <div className="lg:col-span-7">
            <StrokeHoverCard
              delay={0}
              className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <ScanFace className="h-6 w-6 text-[#0057B8]" />
                  <span className="text-xs font-semibold text-slate-500 font-latin">
                    Deepfake Resistant · IPC Hoda
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0B162C]">
                  احراز هویت زنده، چهره‌محور و متصل به مراجع حاکمیتی
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  ساینو در موقعیت‌های حساس سازمانی مانند افتتاح حساب، ثبت درخواست تسهیلات، ورود به
                  پنل‌های اختصاصی و امضای قراردادها، هویت عینی کاربر را با زنده‌سنجی هوشمند (مقاوم
                  در برابر حملات جعل چهره و ویدیو) و استعلام برخط از سامانه‌های شاهکار و هدا (ثبت
                  احوال) تایید می‌کند.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3 text-xs">
                <div>
                  <p className="font-bold text-[#0B162C]">سامانه شاهکار</p>
                  <p className="mt-1 text-slate-500">تطبیق برخط کد ملی و مالکیت سیم‌کارت</p>
                </div>
                <div>
                  <p className="font-bold text-[#0B162C]">سامانه هدا (ثبت احوال)</p>
                  <p className="mt-1 text-slate-500">تطبیق چهره زنده با پایگاه کارت ملی</p>
                </div>
                <div>
                  <p className="font-bold text-[#0B162C]">سنجش اصالت مدارک</p>
                  <p className="mt-1 text-slate-500">اعتبارسنجی برخط کارت ملی و شناسنامه</p>
                </div>
              </div>
            </StrokeHoverCard>
          </div>

          {/* Card 2: Narrow (5 cols) */}
          <div className="lg:col-span-5">
            <StrokeHoverCard
              delay={0.08}
              strokeColor="#38BDF8"
              className="rounded-2xl border border-slate-800 bg-[#0B162C] p-7 text-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <Cpu className="h-6 w-6 text-sky-400" />
                  <span className="text-xs font-semibold text-slate-400 font-latin">
                    Strong Authentication
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">
                  ذخیره‌سازی زوج کلید در Secure Element
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  تولید و نگهداری کلید خصوصی امضا بر روی تراشه امن سخت‌افزاری گوشی هوشمند در نسخه
                  اندروید و نگهداری امن نرم‌افزاری در نسخه PWA، همراه با تبادل کلید رمزنگاری{' '}
                  <span className="font-latin font-semibold text-sky-300">ECDH</span> و ورود سریع{' '}
                  <span className="font-latin font-semibold text-sky-300">One Tap</span>.
                </p>
              </div>

              <div className="mt-7 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-300">
                <span>مورد تایید آزمایشگاه مرکز ریشه کشور</span>
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              </div>
            </StrokeHoverCard>
          </div>

          {/* Card 3: Narrow (5 cols) */}
          <div className="lg:col-span-5">
            <StrokeHoverCard
              delay={0.04}
              strokeColor="#007B7A"
              className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <Building2 className="h-6 w-6 text-[#007B7A]" />
                  <span className="text-xs font-semibold text-slate-500">امضای حقوقی و سازمانی</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0B162C]">
                  مهر دیجیتال سازمانی و امضای اشخاص حقوقی
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  استعلام برخط شناسه ملی شرکت، احراز سمت قانونی مدیرعامل و دارندگان حق امضا از مراجع
                  رسمی، صدور هم‌زمان گواهی حقیقی و حقوقی روی موبایل و امکان درج مهر دیجیتال سازمانی
                  از طریق ماژول توکن در پنل وب.
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                مناسب برای تعاملات بین‌سازمانی، قراردادهای پیمانکاری و مصوبات هیئت‌مدیره
              </div>
            </StrokeHoverCard>
          </div>

          {/* Card 4: Wide (7 cols) */}
          <div className="lg:col-span-7">
            <StrokeHoverCard
              delay={0.12}
              className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <FileText className="h-6 w-6 text-[#0057B8]" />
                  <span className="text-xs font-semibold text-slate-500 font-latin">
                    PAdES · CAdES · Timestamp
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0B162C]">
                  امضای چندگانه اسناد PDF و صدور و مدیریت سفته الکترونیک
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  پشتیبانی کامل از امضای چندگانه فایل‌های PDF با استاندارد PAdES و اسناد/داده‌های
                  ساخت‌یافته با استاندارد CAdES به همراه مهر زمانی معتبر. علاوه بر قراردادها، قابلیت{' '}
                  <strong className="font-semibold text-[#0B162C]">
                    صدور و مدیریت سفته الکترونیک
                  </strong>{' '}
                  در ساینو آماده بهره‌برداری است تا زنجیره ضمانت‌های بانکی و خدمات مالی و اعتباری به
                  طور کامل دیجیتالی شود.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-[#0B162C]">
                <span>گواهی ریشه سطح ۱ و ۲</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span>امضای یک‌جانبه، دوجانبه و چندجانبه با توالی</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span>سفته الکترونیک آماده ارائه</span>
              </div>
            </StrokeHoverCard>
          </div>
        </div>

        {/* Legal Backing & Compliance Institutional Ledger */}
        <ClipMaskReveal delay={0.05} className="mt-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#0057B8]">
                  <Scale className="h-5 w-5" />
                  <span className="text-sm font-semibold">پشتوانه‌های قانونی و حقوقی</span>
                </div>
                <h3 className="mt-2 text-2xl font-extrabold text-[#0B162C]">
                  مبنای قانونی و اعتبار قضایی اسناد امضاشده در ساینو
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600">
                محصول ساینو بر پایه مجموعه قوانین و مصوبات رسمی کشور توسعه یافته و استنادپذیری کامل
                قراردادها و اسناد الکترونیکی را در مراجع حقوقی تضمین می‌کند.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
              {LEGAL_BACKINGS.map((law, idx) => (
                <motion.div
                  key={law.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-[#0057B8] font-bold tabular-fa">{law.id}</span>
                    <span aria-hidden="true">/</span>
                    <span>{law.authority}</span>
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-[#0B162C] leading-6">{law.title}</h4>
                  <p className="mt-1.5 text-xs leading-6 text-slate-600">{law.scope}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ClipMaskReveal>
      </div>
    </section>
  );
}
