import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Building2,
  Check,
  CheckCircle2,
  FileCheck2,
  FileSignature,
  Fingerprint,
  Lock,
  Monitor,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Smartphone,
  Stamp,
  UserCheck,
} from 'lucide-react';
import {
  MOBILE_FEATURES,
  SAMPLE_WEB_DOCUMENTS,
  SIGNO_LOGO_SRC,
  WEB_CONSOLE_FEATURES,
  type SampleDocument,
} from '../data/signoData';
import { ClipMaskReveal, MagneticHeading } from './MotionPrimitives';

type PlatformTab = 'simulator' | 'mobile' | 'web';
type MobileScreen = 'docs' | 'liveness' | 'legal';

const SIMULATOR_CONTRACTS = [
  {
    id: 'corporate',
    title: 'قرارداد همکاری و تأمین زیرساخت سازمانی',
    type: 'قرارداد دوجانبه حقوقی',
    code: 'CTR-1405-419',
    standard: 'PAdES-LTV',
  },
  {
    id: 'promissory',
    title: 'سفته الکترونیک و تعهدنامه ضمانت اعتباری',
    type: 'سند مالی الکترونیک',
    code: 'PRM-1405-802',
    standard: 'PAdES + مهر زمانی',
  },
  {
    id: 'hr',
    title: 'قرارداد کار الکترونیکی پرسنل رسمی',
    type: 'قرارداد حقیقی و مهر کارفرما',
    code: 'HR-1405-215',
    standard: 'PAdES · مصوب وزارت کار',
  },
];

async function computeSha256Hex(payload: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(payload);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  }
}

export function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState<PlatformTab>('simulator');
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>('docs');
  const [webFilter, setWebFilter] = useState<'all' | 'signed' | 'pending' | 'rejected'>('all');
  const [webDocs, setWebDocs] = useState<SampleDocument[]>(SAMPLE_WEB_DOCUMENTS);

  const [selectedContractId, setSelectedContractId] = useState<string>(SIMULATOR_CONTRACTS[0].id);
  const [signerMode, setSignerMode] = useState<'legal' | 'individual'>('legal');
  const [signerName, setSignerName] = useState<string>('مهدی رضایی');
  const [orgName, setOrgName] = useState<string>('شرکت توسعه فناوری پارس');
  const [simStep, setSimStep] = useState<0 | 1 | 2 | 3>(0);
  const [signatureHash, setSignatureHash] = useState<string>('');
  const [signedTimestamp, setSignedTimestamp] = useState<string>('');

  const selectedContract =
    SIMULATOR_CONTRACTS.find((c) => c.id === selectedContractId) ?? SIMULATOR_CONTRACTS[0];

  const filteredDocs =
    webFilter === 'all' ? webDocs : webDocs.filter((doc) => doc.status === webFilter);

  const handleApplyOrgSeal = (docId: string) => {
    setWebDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              orgSeal: true,
              status: 'signed',
              order: 'مهر سازمانی درج شد',
              signers: 'امضا و ممهور شد',
            }
          : doc
      )
    );
  };

  const handleSignContract = async () => {
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(now);

    const digest = await computeSha256Hex(
      `${selectedContract.code}|${signerMode}|${signerName}|${orgName}|${now.toISOString()}`
    );
    setSignatureHash(digest);
    setSignedTimestamp(formattedTime);
    setSimStep(3);
  };

  const handleResetSimulator = () => {
    setSimStep(0);
    setSignatureHash('');
    setSignedTimestamp('');
  };

  return (
    <section
      id="experience"
      className="border-y border-slate-200/90 bg-white py-18 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0057B8]">تجربه زنده محصول</p>
            <div className="mt-2.5">
              <MagneticHeading
                as="h2"
                className="text-2xl font-extrabold tracking-tight text-[#0B162C] sm:text-4xl leading-snug"
              >
                یکپارچگی کامل میان اپلیکیشن موبایل و پنل مدیریت وب
              </MagneticHeading>
            </div>
            <p className="mt-3 text-base leading-7 text-slate-600">
              فرایند امضای دیجیتال را همین‌جا آزمایش کنید یا محیط اپلیکیشن موبایل و کارتابل
              سازمانی تحت وب ساینو را بررسی نمایید.
            </p>
          </div>

          {/* Segmented Mode Control with Smooth Spring Active Pill */}
          <div
            role="tablist"
            aria-label="نمای سامانه ساینو"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100/90 p-1 self-start lg:self-auto"
          >
            {[
              { id: 'simulator' as const, label: 'شبیه‌ساز امضا', icon: FileSignature },
              { id: 'mobile' as const, label: 'اپلیکیشن موبایل', icon: Smartphone },
              { id: 'web' as const, label: 'پنل تحت وب', icon: Monitor },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-[#0B162C]' : 'text-slate-600 hover:text-[#0B162C]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="platform-tab-bg"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-lg bg-white shadow-xs"
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4 shrink-0" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Interactive Signature Simulator */}
          {activeTab === 'simulator' && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch"
            >
              {/* Configuration & Interactive Steps */}
              <ClipMaskReveal className="lg:col-span-5 flex">
                <div className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B162C]">
                      تنظیمات سند و احراز هویت امضاکننده
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600">
                      نوع سند و شخصیت امضاکننده را انتخاب کرده و مراحل ۳گانه امضای دیجیتال را اجرا
                      کنید.
                    </p>

                    <div className="mt-6">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        انتخاب نوع سند الکترونیک
                      </label>
                      <div className="space-y-2">
                        {SIMULATOR_CONTRACTS.map((contract) => {
                          const isSelected = selectedContractId === contract.id;
                          return (
                            <button
                              key={contract.id}
                              type="button"
                              onClick={() => {
                                setSelectedContractId(contract.id);
                                if (simStep === 3) handleResetSimulator();
                              }}
                              className={`w-full rounded-xl border px-4 py-3 text-right transition-colors duration-150 cursor-pointer ${
                                isSelected
                                  ? 'border-[#0057B8] bg-white text-[#0B162C]'
                                  : 'border-slate-200 bg-white/60 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-semibold">{contract.title}</span>
                                {isSelected && (
                                  <CheckCircle2 className="h-4 w-4 text-[#0057B8] shrink-0" />
                                )}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                {contract.type} · {contract.standard}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-5">
                      <span className="block text-xs font-semibold text-slate-700 mb-2">
                        نوع امضای دیجیتال
                      </span>
                      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-200/70 p-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSignerMode('legal');
                            if (simStep === 3) handleResetSimulator();
                          }}
                          className={`rounded-md py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            signerMode === 'legal'
                              ? 'bg-white text-[#0B162C] shadow-xs'
                              : 'text-slate-600 hover:text-[#0B162C]'
                          }`}
                        >
                          حقوقی + مهر سازمانی
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSignerMode('individual');
                            if (simStep === 3) handleResetSimulator();
                          }}
                          className={`rounded-md py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            signerMode === 'individual'
                              ? 'bg-white text-[#0B162C] shadow-xs'
                              : 'text-slate-600 hover:text-[#0B162C]'
                          }`}
                        >
                          شخص حقیقی
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="sim-signer-name"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          نام امضاکننده
                        </label>
                        <input
                          id="sim-signer-name"
                          type="text"
                          value={signerName}
                          onChange={(e) => setSignerName(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B162C] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20"
                        />
                      </div>
                      {signerMode === 'legal' && (
                        <div>
                          <label
                            htmlFor="sim-org-name"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            نام شرکت / سازمان
                          </label>
                          <input
                            id="sim-org-name"
                            type="text"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B162C] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-7 border-t border-slate-200 pt-5">
                    {simStep === 0 && (
                      <button
                        type="button"
                        onClick={() => setSimStep(1)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0057B8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004494] cursor-pointer"
                      >
                        <ScanFace className="h-4 w-4" />
                        <span>مرحله ۱: اجرای زنده‌سنجی و استعلام هدا و شاهکار</span>
                      </button>
                    )}

                    {simStep === 1 && (
                      <button
                        type="button"
                        onClick={() => setSimStep(2)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0057B8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004494] cursor-pointer"
                      >
                        <Lock className="h-4 w-4" />
                        <span>مرحله ۲: تولید کلید در Secure Element و صدور گواهی</span>
                      </button>
                    )}

                    {simStep === 2 && (
                      <button
                        type="button"
                        onClick={handleSignContract}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#007B7A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006362] cursor-pointer"
                      >
                        <Fingerprint className="h-4 w-4" />
                        <span>مرحله ۳: تایید One Tap و امضای PAdES سند</span>
                      </button>
                    )}

                    {simStep === 3 && (
                      <button
                        type="button"
                        onClick={handleResetSimulator}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0B162C] transition-colors hover:bg-slate-50 cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>بازنشانی و آزمون مجدد با سند دیگر</span>
                      </button>
                    )}
                  </div>
                </div>
              </ClipMaskReveal>

              {/* Live Document & Cryptographic Output Panel */}
              <ClipMaskReveal delay={0.08} className="lg:col-span-7 flex">
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
                      <div>
                        <p className="text-xs font-medium text-slate-500 tabular-fa">
                          شماره سند: {selectedContract.code} · استاندارد {selectedContract.standard}
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-[#0B162C]">
                          {selectedContract.title}
                        </h3>
                      </div>
                      <img
                        src={SIGNO_LOGO_SRC}
                        alt="لوگوی ساینو"
                        referrerPolicy="no-referrer"
                        className="h-9 w-auto object-contain mix-blend-multiply"
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3 border-b border-slate-100 pb-6">
                      {[
                        {
                          step: 1,
                          title: '۱. احراز هویت زنده',
                          done: 'تایید در هدا و شاهکار',
                          wait: 'در انتظار اجرا',
                        },
                        {
                          step: 2,
                          title: '۲. گواهی مرکز ریشه',
                          done: 'کلید Secure Element فعال',
                          wait: 'در انتظار صدور',
                        },
                        {
                          step: 3,
                          title: '۳. امضای PAdES',
                          done: 'ممهور و انکارناپذیر',
                          wait: 'در انتظار تایید',
                        },
                      ].map((item) => {
                        const completed = simStep >= item.step;
                        return (
                          <motion.div
                            key={item.step}
                            animate={{ scale: completed ? [1, 1.03, 1] : 1 }}
                            transition={{ duration: 0.35 }}
                            className={`rounded-lg border p-3 transition-colors ${
                              completed
                                ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900'
                                : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                          >
                            <p className="text-xs font-bold">{item.title}</p>
                            <p className="mt-1 text-[11px]">
                              {completed ? item.done : item.wait}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                      <p>
                        این سند الکترونیکی میان{' '}
                        <strong className="font-semibold text-[#0B162C]">
                          {signerMode === 'legal'
                            ? `${orgName || 'سازمان طرف قرارداد'} (با امضای مجاز ${signerName || 'مدیرعامل'})`
                            : signerName || 'امضاکننده حقیقی'}
                        </strong>{' '}
                        و سازمان بهره‌بردار مطابق قانون تجارت الکترونیکی و با اتکا به گواهی صادرشده
                        از مرکز میانی ریشه کشور تنظیم گردیده است.
                      </p>
                      <p className="text-xs text-slate-500">
                        هرگونه تغییر پس از اعمال امضای PAdES، هش رمزنگاری سند را نامعتبر کرده و
                        قابلیت استنادپذیری و اصالت سند به صورت برخط در ساینو قابل راستی‌آزمایی است.
                      </p>
                    </div>
                  </div>

                  {/* Cryptographic Seal Box */}
                  <div className="mt-8 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                    {simStep < 3 ? (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <FileCheck2 className="h-5 w-5 text-slate-400 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              محل درج امضای دیجیتال و مهر زمانی ساینو
                            </p>
                            <p className="text-xs text-slate-500">
                              برای مشاهده اثرانگشت رمزنگاری (SHA-256) و مهر قانونی، ۳ مرحله سمت راست
                              را تکمیل کنید.
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                          وضعیت: آماده امضا
                        </span>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
                          <div className="flex items-center gap-2 text-emerald-800">
                            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                            <span className="text-sm font-bold">
                              سند با موفقیت امضا و مهر زمانی ثبت شد
                            </span>
                          </div>
                          <span className="text-xs font-medium text-slate-600 tabular-fa">
                            زمان ثبت: {signedTimestamp}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                          <div>
                            <span className="text-slate-500">امضاکننده تاییدشده:</span>
                            <p className="mt-0.5 font-semibold text-[#0B162C]">
                              {signerName || 'مهدی رضایی'}
                              {signerMode === 'legal'
                                ? ` · ${orgName || 'شخص حقوقی'}`
                                : ' · شخص حقیقی'}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-500">مهر دیجیتال و استاندارد:</span>
                            <p className="mt-0.5 font-semibold text-[#0B162C]">
                              {signerMode === 'legal'
                                ? 'مهر سازمانی (توکن) + PAdES'
                                : 'گواهی ریشه سطح ۲ + PAdES'}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3.5 rounded-lg bg-[#0B162C] px-3.5 py-2.5 text-[11px] text-slate-300">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-slate-400">اثرانگشت رمزنگاری سند (SHA-256)</span>
                            <span className="font-mono-tech text-emerald-400">VERIFIED</span>
                          </div>
                          <p className="font-mono-tech break-all text-sky-300 leading-5" dir="ltr">
                            {signatureHash}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </ClipMaskReveal>
            </motion.div>
          )}

          {/* TAB 2: Mobile Application (Android & PWA) */}
          {activeTab === 'mobile' && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[340px] rounded-[32px] border-[6px] border-[#0B162C] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={SIGNO_LOGO_SRC}
                        alt="اپلیکیشن ساینو"
                        referrerPolicy="no-referrer"
                        className="h-6 w-auto object-contain"
                      />
                      <span className="text-xs font-bold text-[#0B162C]">اپلیکیشن ساینو</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 font-latin">
                      Android · PWA
                    </span>
                  </div>

                  <div className="mt-4 min-h-[300px]">
                    <AnimatePresence mode="wait">
                      {mobileScreen === 'docs' && (
                        <motion.div
                          key="m-docs"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-2.5"
                        >
                          <p className="text-xs font-bold text-[#0B162C] mb-3">
                            اسناد دریافتی شما (کارتابل همراه)
                          </p>
                          {[
                            {
                              title: 'قرارداد تسهیلات شرکتی ۱۴۰۵',
                              sender: 'ارسال‌کننده: واحد اعتبارات',
                              state: 'امضا شده',
                              tone: 'text-emerald-700',
                            },
                            {
                              title: 'سفته الکترونیک ضمانت قرارداد',
                              sender: 'ارسال‌کننده: شعبه مرکزی',
                              state: 'در انتظار امضا',
                              tone: 'text-[#0057B8]',
                            },
                            {
                              title: 'تفاهم‌نامه همکاری تامین‌کنندگان',
                              sender: 'ارسال‌کننده: امور حقوقی',
                              state: 'امضا شده',
                              tone: 'text-emerald-700',
                            },
                            {
                              title: 'الحاقیه شماره ۲ قرارداد پرسنلی',
                              sender: 'ارسال‌کننده: منابع انسانی',
                              state: 'رد شده',
                              tone: 'text-rose-700',
                            },
                          ].map((item) => (
                            <div
                              key={item.title}
                              className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-3"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-semibold text-[#0B162C]">{item.title}</p>
                                <span
                                  className={`text-[11px] font-semibold whitespace-nowrap ${item.tone}`}
                                >
                                  {item.state}
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] text-slate-500">{item.sender}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {mobileScreen === 'liveness' && (
                        <motion.div
                          key="m-live"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.22 }}
                          className="flex flex-col items-center text-center py-4"
                        >
                          <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-[#0057B8] bg-[#0057B8]/5">
                            <ScanFace className="h-12 w-12 text-[#0057B8]" />
                          </div>
                          <p className="mt-4 text-sm font-bold text-[#0B162C]">
                            زنده‌سنجی و تطبیق چهره با ثبت احوال
                          </p>
                          <p className="mt-2 text-xs leading-6 text-slate-600">
                            فراخوانی امن سرویس هدا در بستر IPC، بررسی شاهکار و جلوگیری کامل از
                            تلاش‌های جعل تصویر (Deepfake Resistant).
                          </p>
                          <div className="mt-4 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] p-3 text-right text-[11px] space-y-1.5 text-slate-600">
                            <div className="flex items-center justify-between">
                              <span>تطبیق کد ملی و موبایل (شاهکار)</span>
                              <span className="font-semibold text-emerald-700">تایید شده</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>تطبیق تصویر با کارت ملی (هدا)</span>
                              <span className="font-semibold text-emerald-700">تایید شده</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {mobileScreen === 'legal' && (
                        <motion.div
                          key="m-legal"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-3 py-2"
                        >
                          <div className="rounded-xl border border-slate-200 bg-[#0B162C] p-4 text-white">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-sky-400" />
                              <span className="text-xs font-bold">گواهی هم‌زمان حقیقی و حقوقی</span>
                            </div>
                            <p className="mt-2 text-[11px] leading-5 text-slate-300">
                              استعلام برخط شناسه ملی شرکت، تطبیق کد ملی مدیرعامل و تایید حق امضا از
                              مراجع قانونی ذی‌ربط.
                            </p>
                          </div>

                          <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">گواهی شخص حقیقی:</span>
                              <span className="font-semibold text-[#0B162C]">مرکز ریشه سطح ۲</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">گواهی شخص حقوقی:</span>
                              <span className="font-semibold text-[#0B162C]">دارنده حق امضا مجاز</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">تایید هویت امضا:</span>
                              <span className="font-semibold text-[#0057B8] font-latin">
                                One Tap Auth
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-1 border-t border-slate-200 pt-3">
                    {[
                      { id: 'docs' as const, label: 'اسناد' },
                      { id: 'liveness' as const, label: 'زنده‌سنجی' },
                      { id: 'legal' as const, label: 'امضای حقوقی' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMobileScreen(tab.id)}
                        className={`rounded-lg py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          mobileScreen === tab.id
                            ? 'bg-[#0057B8] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0B162C]">
                    اپلیکیشن موبایل ساینو در دو پلتفرم اندروید و iOS (PWA)
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    تمامی مراحل احراز هویت غیرحضوری، دریافت گواهی ریشه سطح ۱ و ۲، مشاهده جزئیات
                    اسناد دریافتی، ترتیب امضاکنندگان و تایید نهایی از طریق چهار بخش خانه، پروفایل،
                    اسناد و پیام‌ها به سادگی روی گوشی هوشمند انجام می‌شود.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {MOBILE_FEATURES.map((feat) => (
                    <div
                      key={feat.title}
                      className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5"
                    >
                      <h4 className="text-sm font-bold text-[#0B162C]">{feat.title}</h4>
                      <p className="mt-2 text-xs leading-6 text-slate-600">{feat.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Web Management Console */}
          {activeTab === 'web' && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 space-y-8"
            >
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-[#F8FAFC] px-6 py-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B162C]">
                      کارتابل مدیریت اسناد و قراردادهای تحت وب ساینو
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      پنج بخش کلیدی: داشبورد آنالیز · اسناد و ارسال · کاربران موبایل · کاربران وب و
                      نقش‌ها · اپراتورها
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
                    {[
                      { id: 'all' as const, label: 'همه' },
                      { id: 'signed' as const, label: 'امضا شده' },
                      { id: 'pending' as const, label: 'در انتظار' },
                      { id: 'rejected' as const, label: 'رد شده' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setWebFilter(f.id)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          webFilter === f.id
                            ? 'bg-[#0B162C] text-white'
                            : 'text-slate-600 hover:text-[#0B162C]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-500">
                      <tr>
                        <th className="px-5 py-3.5 whitespace-nowrap">شناسه و عنوان سند</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">ارسال‌کننده</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">توالی امضاکنندگان</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">تاریخ ایجاد</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">وضعیت و مهر سازمانی</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDocs.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#0B162C]">{doc.title}</p>
                            <p className="mt-0.5 text-xs text-slate-500 tabular-fa">
                              {doc.id} · {doc.docType}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-600 whitespace-nowrap">
                            {doc.sender}
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-600 whitespace-nowrap">
                            <span className="font-medium text-[#0B162C]">{doc.signers}</span>
                            <span className="block text-[11px] text-slate-500 mt-0.5">
                              {doc.order}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-600 tabular-fa whitespace-nowrap">
                            {doc.date}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {doc.status === 'signed' && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                                  <Check className="h-3.5 w-3.5" />
                                  <span>امضا و ممهور</span>
                                </span>
                              )}
                              {doc.status === 'pending' && (
                                <>
                                  <span className="text-xs font-semibold text-amber-700">
                                    در انتظار امضا
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleApplyOrgSeal(doc.id)}
                                    className="inline-flex items-center gap-1 rounded-md border border-[#0057B8]/30 bg-[#0057B8]/5 px-2.5 py-1 text-[11px] font-semibold text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors cursor-pointer"
                                  >
                                    <Stamp className="h-3 w-3" />
                                    <span>درج مهر سازمانی</span>
                                  </button>
                                </>
                              )}
                              {doc.status === 'rejected' && (
                                <span className="text-xs font-semibold text-rose-700">رد شده</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {WEB_CONSOLE_FEATURES.map((feat) => (
                  <div
                    key={feat.title}
                    className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5"
                  >
                    <div className="flex items-center gap-2 text-[#0057B8] mb-2">
                      <UserCheck className="h-4 w-4 shrink-0" />
                    </div>
                    <h4 className="text-sm font-bold text-[#0B162C] leading-snug">{feat.title}</h4>
                    <p className="mt-2 text-xs leading-6 text-slate-600">{feat.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
