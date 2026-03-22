import { useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";

export default function Toast({ message, type = "success", onClose }) {
  const { theme } = useTheme();
  const { colors, radius, fonts, shadows } = theme;

  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === "success";

  const style = {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 24px",
    background: colors.bgCard,
    border: `1.5px solid ${isSuccess ? colors.success : colors.danger}`,
    borderRadius: radius.lg,
    boxShadow: shadows.xl,
    fontFamily: fonts.body,
    fontSize: "0.95rem",
    color: colors.text,
    animation: "toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    maxWidth: "420px",
    width: "90vw",
  };

  const dotStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: isSuccess ? colors.success : colors.danger,
    flexShrink: 0,
  };

  const closeStyle = {
    marginLeft: "auto",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.textTertiary,
    fontSize: "1.2rem",
    lineHeight: 1,
    padding: "0 0 0 12px",
  };

  /*
   */

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
        }
      `}</style>
      <div role="alert" style={style}>
        <span style={dotStyle} />
        <span>{message}</span>
        <button
          style={closeStyle}
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </>
  );
}
