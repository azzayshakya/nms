import { useEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeContext";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { useAnimateOnScroll } from "../../hooks/useAnimateOnScroll";
import { submitInterest } from "../../utils/api";
import SectionWrapper from "./SectionWrapper";

export default function InterestCheck() {
  const { theme } = useTheme();
  const { colors, fonts, spacing, radius } = theme;
  const [loading, setLoading] = useState(null);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState(null);

  const { ref: headRef, animatedStyle: headAnim } = useAnimateOnScroll(
    "slideUp",
    0,
  );
  const { ref: btnRef, animatedStyle: btnAnim } = useAnimateOnScroll(
    "slideUp",
    150,
  );
  const STORAGE_KEY = "interest_submitted";

  const handleClick = async (interested) => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();

      //  24 hours = 86400000 ms
      if (now - parsed.time < 86400000) {
        setToast({
          type: "info",
          message: "You have already responded. Try again after 24 hours.",
        });
        return;
      } else {
        // expired → remove old
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoading(interested ? "yes" : "no");

    try {
      await submitInterest({
        interest: interested,
      });

      // ✅ Save to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          interest: interested,
          time: Date.now(),
        }),
      );

      setDone(true);

      setToast({
        type: "success",
        message: "Thank you! We'll be in touch for a review. 🎉",
      });
    } catch (err) {
      console.error(err);

      setToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const card = {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.xl,
    padding: spacing.xl,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const glow = {
    position: "absolute",
    top: "-50%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "300px",
    background: `radial-gradient(ellipse, ${colors.highlight}10 0%, transparent 70%)`,
    pointerEvents: "none",
  };
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();

      if (now - parsed.time < 86400000) {
        setDone(true);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  return (
    <SectionWrapper id="interest" style={{ background: colors.bgSecondary }}>
      <div ref={headRef} style={headAnim}>
        <div style={card}>
          <div style={glow} />

          <p
            style={{
              fontFamily: fonts.mono,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.textTertiary,
              marginBottom: "16px",
            }}
          >
            Join the Wave
          </p>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: colors.text,
              margin: "0 0 16px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Are you interested
            <br />
            in <span style={{ color: colors.highlight }}>Sine Network?</span>
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "1rem",
              lineHeight: 1.7,
              color: colors.textSecondary,
              maxWidth: "480px",
              margin: `0 auto ${spacing.lg}`,
            }}
          >
            Let us know and we'll prioritize your early access. Your feedback
            shapes our next release.
          </p>

          {done ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: fonts.body,
                fontWeight: 600,
                color: colors.success,
                fontSize: "1rem",
                background: `${colors.success}14`,
                padding: "14px 28px",
                borderRadius: radius.full,
                border: `1px solid ${colors.success}33`,
              }}
            >
              <span>✓</span> Response recorded — thank you!
            </div>
          ) : (
            <div
              ref={btnRef}
              style={{
                ...btnAnim,
                display: "flex",
                gap: spacing.sm,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                label="Yes, I'm Interested!"
                onClick={() => handleClick(true)}
                loading={loading === "yes"}
                disabled={loading === "no"}
                variant="primary"
              />
              <Button
                label="Not Right Now"
                onClick={() => handleClick(false)}
                loading={loading === "no"}
                disabled={loading === "yes"}
                variant="secondary"
              />
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </SectionWrapper>
  );
}
