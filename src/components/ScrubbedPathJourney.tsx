import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  Building2,
  Cpu,
  FileSignature,
  ScanFace,
  Server,
  WalletCards,
} from 'lucide-react';
import { MagneticHeading } from './MotionPrimitives';

const JOURNEY_STEPS = [
  {
    index: '۰۱',
    icon: ScanFace,
    title: 'احراز هویت غیرحضوری و زنده‌سنجی هوشمند',
    subtitle: 'Deepfake Resistant · هدا و شاهکار',
    description:
      'تطبیق برخط تصویر زنده چهره با پایگاه سازمان ثبت احوال (سامانه هدا) و استعلام شاهکار برای جلوگیری مطلق از جعل هویت در افتتاح حساب، تسهیلات و امضای اسناد.',
  },
  {
    index: '۰۲',
    icon: Cpu,
    title: 'تولید کلید امن روی سخت‌افزار Secure Element',
    subtitle: 'ECDH · گواهی ریشه سطح ۱ و ۲',
    description:
      'صدور آنلاین گواهی امضای الکترونیکی از مرکز میانی ریشه کشور و نگهداری زوج کلید رمزنگاری درون تراشه امن گوشی هوشمند با ورود یک‌ضربه‌ای (One Tap).',
  },
  {
    index: '۰۳',
    icon: FileSignature,
    title: 'امضای چندگانه اسناد و قراردادهای PDF',
    subtitle: 'PAdES · CAdES · مهر زمانی معتبر',
    description:
      'ارسال اسناد یک‌جانبه، دوجانبه و چندجانبه با تعریف دقیق توالی امضاکنندگان و ثبت مهر زمانی قانونی با حذف کامل کاغذ، چاپ و تبادل فیزیکی میان شعب.',
  },
  {
    index: '۰۴',
    icon: Building2,
    title: 'امضای اشخاص حقوقی و مهر دیجیتال سازمانی',
    subtitle: 'استعلام مدیرعامل · ماژول توکن',
    description:
      'تطبیق برخط شناسه ملی شرکت با کد ملی مدیرعامل و دارندگان حق امضا، صدور هم‌زمان گواهی حقیقی و حقوقی روی موبایل و درج رسمی مهر دیجیتال سازمانی.',
  },
  {
    index: '۰۵',
    icon: WalletCards,
    title: 'صدور و مدیریت سفته الکترونیک',
    subtitle: 'تکمیل زنجیره مالی و ضمانت بانکی',
    description:
      'قابلیت آماده بهره‌برداری برای صدور، امضا و مدیریت سفته الکترونیک و تعهدنامه‌های اعتباری به‌منظور دیجیتالی‌سازی کامل مبادلات مالی سازمان.',
  },
  {
    index: '۰۶',
    icon: Server,
    title: 'تحویل کامل و مستقل درون‌سازمانی در ۷ روز',
    subtitle: 'On-Premise · Zabbix · Load Balancing',
    description:
      'نصب کامل پنل وب، اپلیکیشن اندروید و PWA، اتصال به سرویس‌های حاکمیتی و نگهداری تمام اسناد و گواهی‌ها در دیتاسنتر اختصاصی سازمان شما.',
  },
];

export function ScrubbedPathJourney() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative bg-[#F8FAFC] py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Heading with Two26 Magnetic Dual-Layer Effect */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#0057B8]">
            زنجیره یکپارچه قابلیت‌های ساینو
          </p>
          <div className="mt-2.5">
            <MagneticHeading
              as="h2"
              className="text-2xl font-extrabold tracking-tight text-[#0B162C] sm:text-4xl leading-snug"
            >
              مسیر کامل امضای دیجیتال؛ از احراز هویت تا آرشیو قانونی
            </MagneticHeading>
          </div>
          <p className="mt-4 text-base leading-7 text-slate-600">
            با پیمایش این مسیر، شش لایه کلیدی سامانه ساینو که فرایندهای قراردادی سازمان شما را
            متحول می‌کنند ببینید.
          </p>
        </div>

        {/* Scrubbed Center SVG Path + Alternating Spring-Popped Nodes */}
        <div className="relative mt-16">
          {/* Desktop Center Continuous Sinuous SVG Path */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[180px]"
          >
            <svg
              viewBox="0 0 180 1200"
              fill="none"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* Faint guide path */}
              <path
                d="M90 10 C 160 120, 20 260, 90 390 C 160 520, 20 660, 90 790 C 160 920, 20 1060, 90 1190"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Live Scrubbed Ink Stroke */}
              <motion.path
                d="M90 10 C 160 120, 20 260, 90 390 C 160 520, 20 660, 90 790 C 160 920, 20 1060, 90 1190"
                stroke="#0057B8"
                strokeWidth="4.5"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          {/* Mobile Vertical Scrubbed Rail on Start Edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none lg:hidden absolute top-2 bottom-2 right-5 w-1 bg-slate-200 rounded-full overflow-hidden"
          >
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="h-full w-full bg-[#0057B8]"
            />
          </div>

          {/* 6 Alternating Journey Nodes */}
          <div className="space-y-8 lg:space-y-14">
            {JOURNEY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.index}
                  className={`relative grid grid-cols-1 lg:grid-cols-12 items-center gap-6 pr-12 lg:pr-0`}
                >
                  {/* Node Marker on Timeline */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="absolute right-0.5 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0057B8] bg-white text-[#0057B8] shadow-xs"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </motion.div>

                  {/* Card Placed Alternating Right/Left on Desktop */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      y: 24,
                      rotate: isEven ? -1.5 : 1.5,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      rotate: 0,
                    }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      type: 'spring',
                      stiffness: 210,
                      damping: 20,
                    }}
                    className={`rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 transition-colors hover:border-[#0057B8]/40 ${
                      isEven
                        ? 'lg:col-span-5 lg:col-start-1'
                        : 'lg:col-span-5 lg:col-start-8'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                      <span className="text-[#0057B8] font-bold tabular-fa">
                        {step.index}
                      </span>
                      <span className="font-latin text-slate-400">{step.subtitle}</span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-[#0B162C] leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
