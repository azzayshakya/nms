import { useTheme } from "../../theme/ThemeContext";
import { useAnimateOnScroll } from "../../hooks/useAnimateOnScroll";
import SectionWrapper from "./SectionWrapper";
import image from "../../assets/products/neo-orbit/neo-orbit2.jpeg";
const features = [
  {
    icon: "⚡",
    title: "Ultra-Fast Processing",
    desc: "Powered by an ESP32 microcontroller for smooth performance and instant response across all on-device operations.",
  },
  {
    icon: "📡",
    title: "Smart Connectivity",
    desc: "Wi-Fi enabled for real-time data updates like weather, time, and environment — always connected, always current.",
  },
  {
    icon: "🔋",
    title: "Optimized Battery Life",
    desc: "Efficient power management ensures long-lasting performance for continuous daily use without frequent charging.",
  },
  {
    icon: "🔄",
    title: "Always Synced",
    desc: "Data refreshes automatically in the background, so what you see is always accurate and up to date.",
  },
  {
    icon: "🎨",
    title: "Custom UI Themes",
    desc: "Switch between different dashboard layouts and color modes to match your setup and personal style.",
  },
  {
    icon: "👀",
    title: "At-a-Glance Info",
    desc: "Time, date, and weather visible instantly on your desk — no phone, no distractions, just what matters.",
  },
];

function FeatureCard({ feature, delay }) {
  const { theme } = useTheme();
  const { colors, fonts, radius, transitions, shadows, spacing } = theme;
  const { ref, animatedStyle } = useAnimateOnScroll("slideUp", delay);

  const card = {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.md,
    transition: `all ${transitions.base}`,
    cursor: "default",
  };

  const iconWrap = {
    width: "48px",
    height: "48px",
    borderRadius: radius.md,
    background: colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    marginBottom: spacing.sm,
  };

  return (
    <div
      ref={ref}
      style={{ ...animatedStyle, ...card }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.borderStrong;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = shadows.lg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={iconWrap}>{feature.icon}</div>
      <h3
        style={{
          fontFamily: fonts.display,
          fontSize: "1.1rem",
          fontWeight: 700,
          color: colors.text,
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: "0.9rem",
          lineHeight: 1.65,
          color: colors.textSecondary,
          margin: 0,
        }}
      >
        {feature.desc}
      </p>
    </div>
  );
}

export default function ProductShowcase() {
  const { theme } = useTheme();
  const { colors, fonts, spacing, radius, shadows } = theme;
  const { ref: headRef, animatedStyle: headAnim } = useAnimateOnScroll(
    "slideUp",
    0,
  );

  const imgBox = {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.xl,
    height: "380px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    position: "relative",
    overflow: "hidden",
    boxShadow: shadows.lg,
  };

  const label = {
    position: "absolute",
    top: "24px",
    left: "24px",
    fontFamily: fonts.mono,
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: colors.textTertiary,
    background: colors.surface,
    padding: "6px 12px",
    borderRadius: radius.full,
    border: `1px solid ${colors.border}`,
  };

  return (
    <SectionWrapper id="features" style={{ background: colors.bgSecondary }}>
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
          What's Inside
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
          Built different.
          <br />
          Works better.
        </h2>
      </div>

      <div style={imgBox}>
        <div style={label}>Sine Device — Side View</div>
        {/* Replace with actual product image */}
        {/* <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
          <rect
            x="20"
            y="20"
            width="160"
            height="80"
            rx="12"
            fill={colors.surface}
            stroke={colors.border}
            strokeWidth="1.5"
          />
          <rect
            x="35"
            y="35"
            width="130"
            height="50"
            rx="6"
            fill={colors.bgCard}
            stroke={colors.border}
            strokeWidth="1"
          />
          <circle cx="162" cy="60" r="8" fill={colors.border} />
          <circle cx="162" cy="60" r="4" fill={colors.surface} />
        </svg> */}
        <img src={image} alt="" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: spacing.sm,
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} delay={i * 80} />
        ))}
      </div>
    </SectionWrapper>
  );
}
