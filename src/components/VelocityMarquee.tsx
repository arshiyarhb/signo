import { useEffect, useRef } from 'react';
import { useMotionValue, useScroll, useSpring, useVelocity } from 'motion/react';

const MARQUEE_ITEMS = [
  'مورد تایید آزمایشگاه مرکز ریشه کشور',
  'استاندارد PAdES و CAdES',
  'مقاوم در برابر جعل Deepfake Resistant',
  'ذخیره کلید در Secure Element',
  'اتصال به سامانه هدا و شاهکار',
  'صدور و مدیریت سفته الکترونیک',
  'مهر دیجیتال سازمانی با ماژول توکن',
  'تبادل کلید امن ECDH',
  'استقرار کامل On-Premise در ۷ روز',
  'پشتوانه ۲۱,۵۰۰+ شعبه بانکی GSS',
];

export function VelocityMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef<number>(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 350,
  });
  const velocityFactor = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = smoothVelocity.on('change', (v) => {
      velocityFactor.set(Math.max(-6, Math.min(6, v / 320)));
    });

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      return () => unsubscribe();
    }

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(48, now - lastTime) / 16.67;
      lastTime = now;

      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          const boost = Math.abs(velocityFactor.get()) * 1.4;
          const speed = (0.95 + boost) * dt;
          offsetRef.current = (offsetRef.current + speed) % halfWidth;
          // In RTL, shifting left-to-right or right-to-left seamlessly via translate3d
          track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [smoothVelocity, velocityFactor]);

  return (
    <div
      aria-label="استانداردها و افتخارات ساینو"
      className="relative overflow-hidden border-b border-slate-200 bg-[#0B162C] py-5 text-white select-none"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        dir="rtl"
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {MARQUEE_ITEMS.map((item, idx) => (
              <div
                key={`${dup}-${idx}`}
                className="flex items-center shrink-0 whitespace-nowrap"
              >
                <span className="px-6 text-sm font-semibold tracking-tight text-slate-100 sm:text-[15px]">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="text-sky-400/70 text-xs font-bold"
                >
                  /
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
