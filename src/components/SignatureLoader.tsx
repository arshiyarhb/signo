import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SIGNO_LOGO_SRC } from '../data/signoData';

interface SignatureLoaderProps {
  onComplete: () => void;
}

export function SignatureLoader({ onComplete }: SignatureLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1650);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="signo-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0B162C]"
          aria-label="در حال بارگذاری سامانه ساینو"
        >
          {/* Sweeping Background Ribbon Stroke (Two26-inspired) */}
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
          >
            <motion.path
              d="M-120 690 C 210 510, 380 780, 690 460 C 980 160, 1180 620, 1560 220"
              stroke="#0057B8"
              strokeWidth="120"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.path
              d="M1560 720 C 1180 560, 960 820, 680 480 C 420 170, 210 520, -120 260"
              stroke="#007B7A"
              strokeWidth="36"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 1.25, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>

          {/* Center Calligraphic Infinity-Signature Draw + Brand Lockup */}
          <div className="relative z-10 flex flex-col items-center px-6">
            <svg
              viewBox="0 0 360 150"
              fill="none"
              className="w-56 sm:w-72 h-auto"
              aria-hidden="true"
            >
              {/* Continuous infinity-pen stroke echoing Signo's official mark */}
              <motion.path
                d="M168 62 C 198 28, 286 4, 308 30 C 330 56, 294 122, 248 128 C 198 135, 152 82, 112 68 C 70 54, 32 72, 36 104 C 40 134, 98 142, 150 112 C 176 96, 198 82, 214 70"
                stroke="#FFFFFF"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              />
              {/* Inner highlight stroke */}
              <motion.path
                d="M262 24 C 282 18, 296 22, 302 32"
                stroke="#38BDF8"
                strokeWidth="4.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.7 }}
              />
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex flex-col items-center text-center"
            >
              <div className="rounded-xl bg-white px-4 py-2">
                <img
                  src={SIGNO_LOGO_SRC}
                  alt="ساینو"
                  referrerPolicy="no-referrer"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-xs font-medium tracking-wide text-slate-300">
                امضای دیجیتال و قرارداد الکترونیک · گروه شرکت‌های گرایش تازه کیش (GSS)
              </p>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-7 left-7 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ورود سریع
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
