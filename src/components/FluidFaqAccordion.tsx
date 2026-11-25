import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SIGNO_LOGO_SRC } from '../data/signoData';
import { MagneticHeading } from './MotionPrimitives';

const FAQ_ITEMS = [
  {
    id: 'legal',
    number: '۰۱',
    question: 'آیا قراردادها و اسناد امضاشده در ساینو در مراجع قضایی اعتبار قانونی دارند؟',
    answer:
      'بله. ساینو با اتصال مستقیم به مراکز میانی صدور گواهی زیرمجموعه مرکز ریشه کشور، تاییدیه آزمایشگاه مرکز ریشه و پیروی از استانداردهای PAdES، CAdES و مهر زمانی معتبر، کاملاً منطبق با قانون تجارت الکترونیکی، مصوبات هیئت وزیران و نظریه مشورتی وزارت کار است و استنادپذیری و انکارناپذیری کامل حقوقی ایجاد می‌کند.',
  },
  {
    id: 'on-premise',
    number: '۰۲',
    question: 'اطلاعات مشتریان، گواهی‌ها و قراردادهای محرمانه ما در کجا نگهداری می‌شود؟',
    answer:
      'در مدل تحویل درون‌سازمانی (On-Premise)، تمامی اجزای نرم‌افزاری، پایگاه داده، ماژول‌های امنیتی و آرشیو اسناد به‌صورت ۱۰۰٪ مستقل در دیتاسنتر و زیرساخت داخلی سازمان شما نصب می‌شود. هیچ سند یا اطلاعات محرمانه‌ای از شبکه سازمان شما خارج نمی‌گردد و کل استقرار ظرف ۷ روز تقویمی انجام می‌شود.',
  },
  {
    id: 'secure-element',
    number: '۰۳',
    question: 'امنیت کلید خصوصی امضا روی گوشی هوشمند کاربران چگونه تضمین می‌شود؟',
    answer:
      'در نسخه اندروید ساینو، زوج کلید رمزنگاری مستقیماً درون تراشه سخت‌افزاری Secure Element گوشی تولید و نگهداری می‌شود و هرگز قابل استخراج نیست؛ در نسخه iOS (PWA) نیز کلیدها در محیط امن نرم‌افزاری با تبادل کلید ECDH محافظت شده و هنگام امضا با ورود One Tap و در صورت نیاز زنده‌سنجی مجدد تایید می‌شوند.',
  },
  {
    id: 'corporate-sign',
    number: '۰۴',
    question: 'امضای اشخاص حقوقی و مهر دیجیتال سازمانی در تعاملات بین‌شرکتی چگونه کار می‌کند؟',
    answer:
      'ساینو شناسه ملی شرکت را به‌صورت برخط با کد ملی مدیرعامل و دارندگان حق امضا از مراجع قانونی استعلام و تطبیق می‌دهد و به‌طور هم‌زمان گواهی شخص حقیقی و حقوقی صادر می‌کند. علاوه بر این، از طریق ماژول توکن در پنل مدیریت وب می‌توان مهر دیجیتال رسمی سازمان را روی قراردادها درج کرد.',
  },
  {
    id: 'promissory-support',
    number: '۰۵',
    question: 'آیا سفته الکترونیک و پشتیبانی فنی پس از استقرار در ساینو پوشش داده می‌شود؟',
    answer:
      'بله. قابلیت صدور و مدیریت سفته الکترونیک به‌صورت آماده در ساینو تعبیه شده است. همچنین تحویل سامانه شامل آموزش کامل کاربران، مدیران سیستم و تیم Helpdesk، ۶ ماه گارانتی رایگان و پس از آن خدمات پشتیبانی فنی مستمر با اتکا به شبکه سراسری گروه شرکت‌های گرایش تازه کیش (GSS) است.',
  },
];

export function FluidFaqAccordion() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  return (
    <section
      id="faq"
      className="border-t border-slate-200/90 bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#0057B8]">پاسخ به پرسش‌های کلیدی</p>
          <div className="mt-2.5">
            <MagneticHeading
              as="h2"
              className="text-2xl font-extrabold tracking-tight text-[#0B162C] sm:text-4xl leading-snug"
            >
              سوالات متداول مدیران فناوری، حقوقی و بانکی
            </MagneticHeading>
          </div>
        </div>

        {/* Two26-Inspired Fluid Width & Spring Expanding Accordion */}
        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="py-5 sm:py-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  {/* Question Column — smoothly transitions width on desktop */}
                  <motion.button
                    type="button"
                    layout
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    className={`flex items-start justify-between gap-4 rounded-xl text-right transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8] ${
                      isOpen
                        ? 'lg:w-[46%] border border-slate-200 bg-[#F8FAFC] p-5'
                        : 'w-full px-2 py-2 hover:text-[#0057B8]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-xs font-bold text-[#0057B8] tabular-fa mt-1.5 shrink-0">
                        {item.number}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#0B162C] leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="mt-1 shrink-0 text-slate-500"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </motion.button>

                  {/* Expanding Answer Block (Right/Left split on Desktop) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, scale: 0.94, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{
                          type: 'spring',
                          stiffness: 240,
                          damping: 24,
                        }}
                        className="lg:w-[50%] rounded-2xl border border-[#0057B8]/20 bg-[#0B162C] p-6 text-white"
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3.5 mb-4">
                          <span className="text-xs font-semibold text-sky-300">
                            پاسخ تیم فنی ساینو
                          </span>
                          <div className="rounded-md bg-white px-2 py-1">
                            <img
                              src={SIGNO_LOGO_SRC}
                              alt="ساینو"
                              referrerPolicy="no-referrer"
                              className="h-5 w-auto object-contain"
                            />
                          </div>
                        </div>

                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.08 }}
                          className="text-sm leading-8 text-slate-200"
                        >
                          {item.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
