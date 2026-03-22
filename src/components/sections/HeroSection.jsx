import { useTheme } from "../../theme/ThemeContext";
import { useAnimateOnScroll } from "../../hooks/useAnimateOnScroll";

export default function Hero() {
  const { theme } = useTheme();
  const { colors, fonts, spacing, radius, transitions, shadows } = theme;

  const { ref: textRef, animatedStyle: textAnim } = useAnimateOnScroll(
    "slideRight",
    0,
  );
  const { ref: imgRef, animatedStyle: imgAnim } = useAnimateOnScroll(
    "slideLeft",
    150,
  );
  const { ref: badgeRef, animatedStyle: badgeAnim } = useAnimateOnScroll(
    "slideUp",
    300,
  );

  const heroStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    paddingTop: "100px",
    background: colors.bg,
    position: "relative",
    overflow: "hidden",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: spacing.xl,
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `0 ${spacing.lg}`,
    boxSizing: "border-box",
  };

  const eyebrow = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.textSecondary,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    padding: "7px 14px",
    borderRadius: radius.full,
    marginBottom: spacing.md,
  };

  const headline = {
    fontFamily: fonts.display,
    fontSize: "clamp(3rem, 6vw, 5.5rem)",
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: "-0.04em",
    color: colors.text,
    margin: `0 0 ${spacing.md}`,
  };

  const highlight = {
    color: colors.highlight,
    display: "block",
  };

  const sub = {
    fontFamily: fonts.body,
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: colors.textSecondary,
    maxWidth: "480px",
    marginBottom: spacing.lg,
  };

  const ctaRow = {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap",
  };

  const primaryCta = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "15px 36px",
    background: colors.accent,
    color: colors.accentText,
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: "1rem",
    borderRadius: radius.full,
    textDecoration: "none",
    transition: `all ${transitions.base}`,
    letterSpacing: "0.01em",
  };

  const secondaryCta = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: "0.95rem",
    textDecoration: "none",
    transition: `color ${transitions.fast}`,
  };

  const imgWrap = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgBg = {
    position: "absolute",
    inset: "-20%",
    background: `radial-gradient(ellipse at center, ${colors.highlight}18 0%, transparent 70%)`,
    pointerEvents: "none",
  };

  const productImg = {
    width: "100%",
    maxWidth: "540px",
    aspectRatio: "1",
    background: colors.bgCard,
    borderRadius: radius.xl,
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.xl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  };

  const productInner = {
    width: "70%",
    height: "70%",
    background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.bgCard} 100%)`,
    borderRadius: radius.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "12px",
    border: `1px solid ${colors.border}`,
  };

  const badge = {
    position: "absolute",
    bottom: "24px",
    right: "24px",
    background: colors.highlight,
    color: colors.highlightText,
    fontFamily: fonts.display,
    fontWeight: 800,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "10px 16px",
    borderRadius: radius.md,
  };

  const bgDecor = {
    position: "absolute",
    top: "10%",
    right: "0",
    width: "40vw",
    height: "80vh",
    background: `radial-gradient(ellipse at right, ${colors.highlight}08 0%, transparent 60%)`,
    pointerEvents: "none",
  };

  return (
    <section id="hero" style={heroStyle} aria-label="Hero">
      <div style={bgDecor} />
      <div style={grid}>
        <div ref={textRef} style={textAnim}>
          <div style={eyebrow}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: colors.highlight,
                display: "inline-block",
              }}
            />
            Introducing Sine Network
          </div>
          <h1 style={headline}>
            Connect
            <span style={highlight}>Beyond</span>
            Limits.
          </h1>
          <p style={sub}>
            The next-generation electronic gadget engineered for precision,
            speed, and seamless connectivity. Everything you need, nothing you
            don't.
          </p>
          <div style={ctaRow}>
            <a
              href="#interest"
              style={primaryCta}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.accentHover;
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.accent;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              I'm Interested →
            </a>
            <a
              href="#contact"
              style={secondaryCta}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.textSecondary)
              }
            >
              Contact Us
            </a>
          </div>
        </div>

        <div ref={imgRef} style={{ ...imgAnim, ...imgWrap }}>
          <div style={imgBg} />
          <div style={productImg}>
            <div style={productInner}>
              {/* Product image placeholder — replace with <img src="..." /> */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect
                  x="10"
                  y="20"
                  width="60"
                  height="40"
                  rx="8"
                  fill={colors.border}
                />
                <rect
                  x="18"
                  y="28"
                  width="44"
                  height="24"
                  rx="4"
                  fill={colors.surface}
                />
                <circle cx="40" cy="68" r="4" fill={colors.border} />
                <rect
                  x="30"
                  y="62"
                  width="20"
                  height="2"
                  rx="1"
                  fill={colors.border}
                />
              </svg>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "0.7rem",
                  color: colors.textTertiary,
                  letterSpacing: "0.1em",
                }}
              >
                SINE DEVICE
              </span>
            </div>
            <div ref={badgeRef} style={{ ...badgeAnim, ...badge }}>
              New 2025
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: colors.textTertiary,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: `linear-gradient(to bottom, ${colors.textTertiary}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
