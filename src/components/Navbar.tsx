import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SIGNO_LOGO_SRC } from '../data/signoData';
import { MagneticButton } from './MotionPrimitives';

interface NavbarProps {
  onRequestDemo: () => void;
}

const NAV_LINKS = [
  { href: '#capabilities', label: 'قابلیت‌ها' },
  { href: '#experience', label: 'شبیه‌ساز امضا' },
  { href: '#security', label: 'امنیت و قانون' },
  { href: '#deployment', label: 'استقرار و تعرفه' },
  { href: '#gss', label: 'پشتوانه GSS' },
];

export function Navbar({ onRequestDemo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8] rounded-md"
        >
          <img
            src={SIGNO_LOGO_SRC}
            alt="لوگوی ساینو"
            referrerPolicy="no-referrer"
            className="h-9 w-auto object-contain mix-blend-multiply"
          />
          <span className="text-lg font-extrabold tracking-tight text-[#0B162C]">
            ساینو
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text nav links with curved SVG stroke draw on hover */}
        <nav
          aria-label="منوی اصلی"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => {
            const isHovered = hoveredHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredHref(link.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className="relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#0B162C]"
              >
                <span>{link.label}</span>
                <svg
                  viewBox="0 0 80 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[6px] w-full overflow-visible"
                >
                  <motion.path
                    d="M2 5.5 C 24 1.5, 56 7.5, 78 2.5"
                    stroke="#0057B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={false}
                    animate={{
                      pathLength: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Magnetic CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            variant="primary"
            onClick={onRequestDemo}
            className="hidden sm:inline-flex px-5 py-2.5 text-sm"
          >
            درخواست دمو
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer with Staggered Links */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <nav className="flex flex-col gap-2 px-5 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-medium text-slate-700 hover:text-[#0057B8]"
                >
                  {link.label}
                </motion.a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onRequestDemo();
                }}
                className="mt-2 w-full rounded-lg bg-[#0057B8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#004494] cursor-pointer"
              >
                درخواست جلسه دمو
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
