import { useTheme } from "../../theme/ThemeContext";

export default function Button({
  label,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  type = "button",
}) {
  const { theme } = useTheme();
  const { colors, transitions, radius, fonts } = theme;

  const isPrimary = variant === "primary";

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px 32px",
    borderRadius: radius.full,
    border: isPrimary ? "none" : `1.5px solid ${colors.borderStrong}`,
    background: isPrimary ? colors.accent : "transparent",
    color: isPrimary ? colors.accentText : colors.text,
    fontFamily: fonts.body,
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.55 : 1,
    transition: `all ${transitions.base}`,
    width: fullWidth ? "100%" : "auto",
    pointerEvents: disabled || loading ? "none" : "auto",
    minWidth: "160px",
  };

  const spinnerStyle = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: `2.5px solid ${isPrimary ? colors.accentText : colors.text}`,
    borderTopColor: "transparent",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  };
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        style={base}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.background = isPrimary
              ? colors.accentHover
              : colors.surface;
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = theme.shadows.md;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isPrimary
            ? colors.accent
            : "transparent";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {loading && <span style={spinnerStyle} />}
        {label}
      </button>
    </>
  );
}
