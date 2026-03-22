import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../../theme/ThemeContext";
import { useAnimateOnScroll } from "../../hooks/useAnimateOnScroll";
import SectionWrapper from "./SectionWrapper";

function useCountUp(target, duration = 1800, inView) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

const benefits = [
  {
    value: 10,
    suffix: "%",
    label: "Below Market Price",
    desc: "We cut the middleman so you get premium quality at a fraction of the cost.",
  },
  {
    value: 99,
    suffix: ".9%",
    label: "Uptime Guarantee",
    desc: "Built on a robust architecture that keeps you connected around the clock.",
  },
  {
    value: 72,
    suffix: "hr",
    label: "Battery Life",
    desc: "Three days of continuous use on a single charge — no compromises.",
  },
  {
    value: 5,
    suffix: "★",
    label: "Average Rating",
    desc: "Thousands of verified customers rate Sine Network at the very top.",
  },
];

function BenefitCard({ benefit, delay }) {
  const { theme } = useTheme();
  const { colors, fonts, radius, transitions, shadows, spacing } = theme;

  const { ref: cardRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: animRef, animatedStyle } = useAnimateOnScroll("slideUp", delay);
  const count = useCountUp(benefit.value, 1600, inView);

  const isLast = benefit.suffix === "★";

  const card = {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.md,
    transition: `all ${transitions.base}`,
  };

  const num = {
    fontFamily: fonts.display,
    fontSize: "clamp(3rem, 5vw, 4.5rem)",
    fontWeight: 900,
    color: colors.highlight,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    display: "flex",
    alignItems: "baseline",
    gap: "2px",
  };

  return (
    <div
      ref={(node) => {
        cardRef(node);
        animRef(node);
      }}
      style={{ ...animatedStyle, ...card }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.highlight;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = shadows.lg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={num}>
        <span>{isLast ? "★".repeat(count) : count}</span>
        {!isLast && (
          <span style={{ fontSize: "0.55em", color: colors.textSecondary }}>
            {benefit.suffix}
          </span>
        )}
      </div>
      <h3
        style={{
          fontFamily: fonts.display,
          fontSize: "1.05rem",
          fontWeight: 700,
          color: colors.text,
          margin: "12px 0 8px",
          letterSpacing: "-0.01em",
        }}
      >
        {benefit.label}
      </h3>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: "0.88rem",
          lineHeight: 1.65,
          color: colors.textSecondary,
          margin: 0,
        }}
      >
        {benefit.desc}
      </p>
    </div>
  );
}

export default function Benefits() {
  const { theme } = useTheme();
  const { colors, fonts, spacing } = theme;
  const { ref: headRef, animatedStyle: headAnim } = useAnimateOnScroll(
    "slideUp",
    0,
  );

  return (
    <SectionWrapper id="benefits" style={{ background: colors.bgSecondary }}>
      <div
        ref={headRef}
        style={{ ...headAnim, textAlign: "center", marginBottom: spacing.xl }}
      >
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: colors.textTertiary,
            marginBottom: "12px",
          }}
        >
          Why Sine Network
        </p>
        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 800,
            color: colors.text,
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Numbers that speak
          <br />
          <span style={{ color: colors.highlight }}>for themselves.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: spacing.sm,
        }}
      >
        {benefits.map((b, i) => (
          <BenefitCard key={b.label} benefit={b} delay={i * 100} />
        ))}
      </div>
    </SectionWrapper>
  );
}
