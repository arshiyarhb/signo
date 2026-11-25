import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/* -------------------------------------------------------------------------- */
/* 1. MagneticButton (Two26-inspired magnetic pull + expanding hover fill)    */
/* -------------------------------------------------------------------------- */
interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'outline';
  className?: string;
}

export function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.5 });

  const innerRawX = useMotionValue(0);
  const innerRawY = useMotionValue(0);
  const innerX = useSpring(innerRawX, { stiffness: 280, damping: 20 });
  const innerY = useSpring(innerRawY, { stiffness: 280, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    rawX.set(Math.max(-9, Math.min(9, dx * 0.18)));
    rawY.set(Math.max(-6, Math.min(6, dy * 0.22)));
    innerRawX.set(Math.max(-4, Math.min(4, dx * 0.08)));
    innerRawY.set(Math.max(-3, Math.min(3, dy * 0.1)));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
    innerRawX.set(0);
    innerRawY.set(0);
  };

  const baseStyles =
    variant === 'primary'
      ? 'bg-[#0057B8] text-white border border-transparent'
      : variant === 'dark'
        ? 'bg-[#0B162C] text-white border border-transparent'
        : 'bg-white text-[#0B162C] border border-slate-300 hover:border-[#0057B8]';

  const fillStyles =
    variant === 'primary'
      ? 'bg-[#0B162C]'
      : variant === 'dark'
        ? 'bg-[#0057B8]'
        : 'bg-[#0057B8]';

  return (
    <motion.button
      ref={btnRef}
      type={type}
      style={{ x, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer ${baseStyles} ${
        variant === 'outline' && hovered ? 'text-white' : ''
      } ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      {/* Expanding circular hover fill */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          scale: hovered ? 14 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-none absolute -bottom-3 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full ${fillStyles}`}
      />
      <motion.span
        style={{ x: innerX, y: innerY }}
        className="relative z-10 inline-flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. MagneticHeading (Two26-inspired dual-layer directional tracking text)   */
/* -------------------------------------------------------------------------- */
interface MagneticHeadingProps {
  children: ReactNode;
  className?: string;
  accentColorClass?: string;
  as?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
}

export function MagneticHeading({
  children,
  className = '',
  accentColorClass = 'text-[#0057B8]/25',
  as = 'h2',
  style,
}: MagneticHeadingProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 180, damping: 14, mass: 0.4 });

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxRadius = Math.max(rect.width, rect.height) / 2 || 120;
    const intensity = Math.min(1, Math.max(0.25, dist / maxRadius));
    const angle = Math.atan2(dy, dx);
    const maxOffset = 4.5;
    rawX.set(Math.cos(angle) * intensity * maxOffset);
    rawY.set(Math.sin(angle) * intensity * maxOffset);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const Tag = as;

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative inline-block"
    >
      {/* Shadow / accent magnetic duplicate layer */}
      <motion.div
        aria-hidden="true"
        style={{ x, y, ...style }}
        className={`pointer-events-none select-none absolute inset-0 ${accentColorClass} ${className}`}
      >
        {children}
      </motion.div>

      {/* Primary legible heading layer */}
      <Tag style={style} className={`relative z-10 ${className}`}>
        {children}
      </Tag>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. ClipMaskReveal (Two26-inspired 3D perspective clip-mask card reveal)    */
/* -------------------------------------------------------------------------- */
interface ClipMaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ClipMaskReveal({
  children,
  className = '',
  delay = 0,
}: ClipMaskRevealProps) {
  return (
    <motion.div
      initial={{
        clipPath: 'inset(12% 8% 12% 8% round 28px)',
        opacity: 0,
        scale: 1.06,
        y: 28,
      }}
      whileInView={{
        clipPath: 'inset(0% 0% 0% 0% round 16px)',
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. LineReveal (Overflow-hidden mask slide-up for display headlines)        */
/* -------------------------------------------------------------------------- */
interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function LineReveal({ children, delay = 0, className = '' }: LineRevealProps) {
  return (
    <span className={`block overflow-hidden pb-1 ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration: 0.72,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
