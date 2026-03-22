import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeContext";
import SectionWrapper from "./SectionWrapper";
import { useAnimateOnScroll } from "../../hooks/useAnimateOnScroll";

const reviews = [
  {
    name: "Aryan Kapoor",
    role: "Tech Reviewer",
    rating: 5,
    text: "Completely blew my expectations. The build quality is on par with devices twice the price. Sine Network just raised the bar.",
  },
  {
    name: "Priya Sharma",
    role: "Product Designer",
    rating: 5,
    text: "The connectivity is flawless. I have tested dozens of devices in this category — this one stands alone in terms of reliability and speed.",
  },
  {
    name: "Rohan Mehta",
    role: "Software Engineer",
    rating: 5,
    text: "I was skeptical at first, but after using it for a month I can say it is the best purchase I have made this year. Battery life is insane.",
  },
  {
    name: "Nisha Verma",
    role: "Content Creator",
    rating: 5,
    text: "Sleek, fast, dependable. Exactly what I needed. And the price — honestly unbelievable for what you get.",
  },
  {
    name: "Karan Joshi",
    role: "Entrepreneur",
    rating: 5,
    text: "Sine Network redefined what I expect from a gadget. Premium feel, zero compromise on performance. Highly recommend.",
  },
];

export default function Reviews() {
  const { theme } = useTheme();
  const { colors, fonts, spacing, radius, shadows, transitions } = theme;
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const { ref: headRef, animatedStyle: headAnim } = useAnimateOnScroll(
    "slideUp",
    0,
  );

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % reviews.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    setActive(i);
    startAuto();
  };

  const card = (i) => ({
    background: colors.bgCard,
    border: `1px solid ${i === active ? colors.highlight : colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.md,
    minWidth: "340px",
    maxWidth: "340px",
    flexShrink: 0,
    transition: `all ${transitions.slow}`,
    opacity: i === active ? 1 : 0.45,
    transform: i === active ? "scale(1.04)" : "scale(0.95)",
    boxShadow: i === active ? shadows.lg : "none",
  });

  const trackStyle = {
    display: "flex",
    gap: spacing.sm,
    transform: `translateX(calc(-${active * 372}px + 50% - 170px))`,
    transition: `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
  };

  const dot = (i) => ({
    width: i === active ? "28px" : "8px",
    height: "8px",
    borderRadius: radius.full,
    background: i === active ? colors.highlight : colors.borderStrong,
    cursor: "pointer",
    border: "none",
    transition: `all ${transitions.base}`,
    padding: 0,
  });

  return (
    <SectionWrapper id="reviews" style={{ background: colors.bg }} noPad>
      <div style={{ padding: `${theme.spacing.xxl} 0` }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: `0 ${spacing.lg}`,
          }}
        >
          <div
            ref={headRef}
            style={{
              ...headAnim,
              textAlign: "center",
              marginBottom: spacing.xl,
            }}
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
              Social Proof
            </p>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                color: colors.text,
                margin: 0,
                letterSpacing: "-0.03em",
              }}
            >
              People love <span style={{ color: colors.highlight }}>Sine.</span>
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div
          style={{
            overflow: "hidden",
            padding: `${spacing.lg} 0`,
            cursor: "grab",
          }}
        >
          <div style={trackStyle}>
            {reviews.map((r, i) => (
              <div key={r.name} style={card(i)} onClick={() => goTo(i)}>
                <div
                  style={{ display: "flex", gap: "4px", marginBottom: "12px" }}
                >
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span
                      key={j}
                      style={{ color: colors.highlight, fontSize: "1rem" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: colors.text,
                    margin: "0 0 20px",
                    fontStyle: "italic",
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: colors.surface,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: colors.text,
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: "0.8rem",
                        color: colors.textSecondary,
                      }}
                    >
                      {r.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: spacing.sm,
          }}
        >
          {reviews.map((_, i) => (
            <button
              key={i}
              style={dot(i)}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
