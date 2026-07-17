"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";

interface ScrollVelocityRowProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 10,
  direction = 1,
}: ScrollVelocityRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, direction * baseVelocity * 50]);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x: smoothX }} className="inline-block">
        {children}
      </motion.div>
    </div>
  );
}

interface ScrollVelocityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocityContainer({
  children,
  className,
}: ScrollVelocityContainerProps) {
  return <div className={className}>{children}</div>;
}
