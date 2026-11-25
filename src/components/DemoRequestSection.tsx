import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { CheckCircle2, Mail, Phone, Send } from 'lucide-react';
import { SIGNO_LOGO_SRC } from '../data/signoData';
import { ClipMaskReveal, MagneticButton, MagneticHeading } from './MotionPrimitives';

interface FormValues {
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  interest: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  organization?: string;
  phone?: string;
  email?: string;
}

const INTEREST_OPTIONS = [
  'استقرار کامل On-Premise سازمانی',
  'امضای دیجیتال قراردادهای مشتریان و پرسنل',
  'صدور و مدیریت سفته الکترونیک',
  'احراز هویت غیرحضوری (هدا و شاهکار)',
  'مهر دیجیتال سازمانی و امضای حقوقی',
];

const INITIAL_VALUES: FormValues = {
  fullName: '',
  organization: '',
  phone: '',
  email: '',
  interest: INTEREST_OPTIONS[0],
  notes: '',
};

export function DemoRequestSection() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Two26 / Wolff Olins Signature Elastic Stretch Footer
  const footerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const rawScaleY = useTransform(footerProgress, [0, 0.72, 0.9, 1], [0.35, 1.18, 1.04, 1]);
  const elasticScaleY = useSpring(rawScaleY, {
    stiffness: 170,
    damping: 12,
    mass: 0.7,
  });
  const footerRibbonPath = useTransform(footerProgress, [0.1, 0.95], [0, 1]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 3) {
      nextErrors.fullName = 'لطفاً نام و نام خانوادگی معتبر وارد کنید.';
    }
    if (!values.organization.trim() || values.organization.trim().length < 2) {
      nextErrors.organization = 'لطفاً نام سازمان یا شرکت خود را وارد کنید.';
    }
    const normalizedPhone = values.phone.replace(/[\s-]/g, '');
    if (!/^(09\d{9}|0\d{10}|\+989\d{9})$/.test(normalizedPhone)) {
      nextErrors.phone = 'شماره تماس معتبر وارد کنید (مثلاً 09123456789).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'نشانی ایمیل سازمانی معتبر وارد کنید.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    const tracking = `SGN-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(tracking);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmittedRef(null);
  };

  return (
    <>
      <section
        id="demo-request"
        className="border-t border-slate-200/90 bg-[#F8FAFC] py-18 lg:py-24"
      >
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Right Column: Executive Invitation */}
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-[#0057B8]">
                درخواست جلسه دمو و مشاوره فنی
              </p>
              <div className="mt-2.5">
                <MagneticHeading
                  as="h2"
                  className="text-2xl font-extrabold tracking-tight text-[#0B162C] sm:text-3xl leading-snug"
                >
                  زیرساخت امضای دیجیتال سازمان خود را در یک هفته راه‌اندازی کنید
                </MagneticHeading>
              </div>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                تیم محصول ساینو آماده برگزاری جلسه دموی اختصاصی، بررسی نیازهای یکپارچه‌سازی با
                سامانه‌های داخلی شما و ارائه پیشنهاد تجاری متناسب با تعداد پنل‌ها و حجم اسناد سازمان
                است.
              </p>

              <div className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0057B8] shrink-0 mt-0.5" />
                  <span>نمایش زنده اپلیکیشن اندروید، نسخه PWA و کارتابل مدیریت وب</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0057B8] shrink-0 mt-0.5" />
                  <span>بررسی الزامات امنیتی On-Premise و اتصال به هدا، شاهکار و مرکز ریشه</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0057B8] shrink-0 mt-0.5" />
                  <span>ارائه مستندات فنی و برنامه زمان‌بندی دقیق استقرار ۷ روزه</span>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-latin">info@gssint.com</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>گروه شرکت‌های گرایش تازه کیش (GSS)</span>
                </span>
              </div>
            </div>

            {/* Left Column: Validated Enterprise Form */}
            <ClipMaskReveal className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                {submittedRef ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                    className="py-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#0B162C]">
                      درخواست جلسه دمو با موفقیت ثبت شد
                    </h3>
                    <p className="mt-2 max-w-md mx-auto text-sm leading-7 text-slate-600">
                      سپاس از {values.fullName} ({values.organization}). کارشناسان تیم محصول ساینو در
                      کمترین زمان برای هماهنگی جلسه با شماره{' '}
                      <span className="font-semibold text-[#0B162C] tabular-fa" dir="ltr">
                        {values.phone}
                      </span>{' '}
                      تماس خواهند گرفت.
                    </p>
                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      کد پیگیری درخواست:{' '}
                      <span className="font-mono-tech text-[#0057B8]" dir="ltr">
                        {submittedRef}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B162C] hover:bg-slate-50 cursor-pointer"
                    >
                      ثبت درخواست جدید
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="lead-name"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          نام و نام خانوادگی *
                        </label>
                        <input
                          id="lead-name"
                          type="text"
                          value={values.fullName}
                          onChange={(e) => {
                            setValues((v) => ({ ...v, fullName: e.target.value }));
                            if (errors.fullName) setErrors((er) => ({ ...er, fullName: undefined }));
                          }}
                          placeholder="مثلاً: علی محمدی"
                          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#0B162C] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.fullName
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                              : 'border-slate-300 focus:border-[#0057B8] focus:ring-[#0057B8]/20'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1.5 text-xs text-rose-600">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-org"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          نام سازمان / بانک / شرکت *
                        </label>
                        <input
                          id="lead-org"
                          type="text"
                          value={values.organization}
                          onChange={(e) => {
                            setValues((v) => ({ ...v, organization: e.target.value }));
                            if (errors.organization)
                              setErrors((er) => ({ ...er, organization: undefined }));
                          }}
                          placeholder="نام مجموعه شما"
                          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#0B162C] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.organization
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                              : 'border-slate-300 focus:border-[#0057B8] focus:ring-[#0057B8]/20'
                          }`}
                        />
                        {errors.organization && (
                          <p className="mt-1.5 text-xs text-rose-600">{errors.organization}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="lead-phone"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          شماره تماس *
                        </label>
                        <input
                          id="lead-phone"
                          type="tel"
                          dir="ltr"
                          value={values.phone}
                          onChange={(e) => {
                            setValues((v) => ({ ...v, phone: e.target.value }));
                            if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                          }}
                          placeholder="09123456789"
                          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-left text-[#0B162C] placeholder:text-slate-400 tabular-fa focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                              : 'border-slate-300 focus:border-[#0057B8] focus:ring-[#0057B8]/20'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-rose-600">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          ایمیل سازمانی *
                        </label>
                        <input
                          id="lead-email"
                          type="email"
                          dir="ltr"
                          value={values.email}
                          onChange={(e) => {
                            setValues((v) => ({ ...v, email: e.target.value }));
                            if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                          }}
                          placeholder="name@company.ir"
                          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-left text-[#0B162C] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.email
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                              : 'border-slate-300 focus:border-[#0057B8] focus:ring-[#0057B8]/20'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-rose-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-interest"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        موضوع اصلی درخواست
                      </label>
                      <select
                        id="lead-interest"
                        value={values.interest}
                        onChange={(e) => setValues((v) => ({ ...v, interest: e.target.value }))}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B162C] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20"
                      >
                        {INTEREST_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-notes"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        توضیحات تکمیلی (اختیاری)
                      </label>
                      <textarea
                        id="lead-notes"
                        rows={3}
                        value={values.notes}
                        onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
                        placeholder="تعداد شعب، پنل‌های مورد نیاز یا سامانه‌هایی که قصد اتصال به ساینو را دارید..."
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-[#0B162C] placeholder:text-slate-400 focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20"
                      />
                    </div>

                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="w-full px-6 py-3.5 text-sm"
                    >
                      <Send className="h-4 w-4" />
                      <span>ثبت درخواست دمو و دریافت مشاوره</span>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </ClipMaskReveal>
          </div>
        </div>
      </section>

      {/* Two26 / Wolff Olins Signature Elastic Stretch Institutional Footer */}
      <footer
        ref={footerRef}
        className="relative overflow-hidden border-t border-slate-200 bg-white pt-14 pb-10"
      >
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={SIGNO_LOGO_SRC}
                alt="لوگوی ساینو"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain mix-blend-multiply"
              />
              <div className="border-r border-slate-200 pr-4">
                <p className="text-sm font-bold text-[#0B162C]">
                  ساینو — سامانه امضای دیجیتال و قرارداد الکترونیک
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  توسعه‌یافته در گروه شرکت‌های گرایش تازه کیش (GSS · Just Innovation)
                </p>
              </div>
            </div>

            <nav
              aria-label="لینک‌های فوتر"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600"
            >
              <a href="#capabilities" className="hover:text-[#0057B8] transition-colors">
                قابلیت‌ها
              </a>
              <a href="#experience" className="hover:text-[#0057B8] transition-colors">
                شبیه‌ساز امضا
              </a>
              <a href="#security" className="hover:text-[#0057B8] transition-colors">
                امنیت و قانون
              </a>
              <a href="#deployment" className="hover:text-[#0057B8] transition-colors">
                استقرار و تعرفه
              </a>
              <a href="#gss" className="hover:text-[#0057B8] transition-colors">
                پشتوانه GSS
              </a>
              <a href="#faq" className="hover:text-[#0057B8] transition-colors">
                سوالات متداول
              </a>
            </nav>
          </div>

          {/* Elastic Bottom-Anchored Signo Architectural Signature Ribbon */}
          <div className="mt-10 overflow-hidden border-y border-slate-100 py-8">
            <motion.div
              style={{
                scaleY: elasticScaleY,
                transformOrigin: 'bottom center',
              }}
              className="flex flex-col items-center justify-center gap-3"
            >
              <svg
                viewBox="0 0 1160 140"
                fill="none"
                aria-hidden="true"
                className="w-full max-w-[920px] h-auto"
              >
                <motion.path
                  d="M20 96 C 180 28, 320 132, 510 68 C 670 14, 790 124, 960 54 C 1035 24, 1095 40, 1140 72"
                  stroke="#0057B8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{ pathLength: footerRibbonPath }}
                />
              </svg>
              <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1 text-center">
                <span
                  className="font-extrabold tracking-tight text-[#0B162C]"
                  style={{ fontSize: 'clamp(2.25rem, 6vw, 4.75rem)', lineHeight: 1.05 }}
                >
                  ساینو
                </span>
                <span
                  className="font-latin font-bold tracking-tight text-[#0057B8]"
                  style={{ fontSize: 'clamp(1.75rem, 4.8vw, 3.85rem)', lineHeight: 1.05 }}
                >
                  Signo
                </span>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>تمامی حقوق مادی و معنوی سامانه ساینو متعلق به گروه شرکت‌های گرایش تازه کیش است.</p>
            <p className="font-latin text-slate-400" dir="ltr">
              gssint.com · Signo Digital Signature Platform
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
