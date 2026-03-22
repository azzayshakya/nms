import { useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";
import SectionWrapper from "./SectionWrapper";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { useAnimateOnScroll } from "../../hooks/useAnimateOnScroll";
import { submitContact } from "../../utils/api";

const initial = { name: "", email: "", phone: "", message: "", location: "" };

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactForm() {
  const { theme } = useTheme();
  const { colors, fonts, spacing, radius, transitions } = theme;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const { ref: headRef, animatedStyle: headAnim } = useAnimateOnScroll(
    "slideUp",
    0,
  );
  const { ref: formRef, animatedStyle: formAnim } = useAnimateOnScroll(
    "slideUp",
    100,
  );

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setSubmitted(true);
      setToast({
        type: "success",
        message: "Message sent! We'll get back to you soon.",
      });
      setForm(initial);
    } catch {
      setToast({ type: "error", message: "Failed to send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "14px 18px",
    background: colors.bgSecondary,
    border: `1.5px solid ${hasError ? colors.danger : colors.border}`,
    borderRadius: radius.md,
    fontFamily: fonts.body,
    fontSize: "0.95rem",
    color: colors.text,
    outline: "none",
    transition: `border-color ${transitions.fast}`,
    boxSizing: "border-box",
    appearance: "none",
  });

  const labelStyle = {
    fontFamily: fonts.body,
    fontSize: "0.82rem",
    fontWeight: 600,
    color: colors.textSecondary,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    marginBottom: "6px",
    display: "block",
  };

  const errStyle = {
    fontFamily: fonts.body,
    fontSize: "0.8rem",
    color: colors.danger,
    marginTop: "5px",
  };

  const fieldGroup = { marginBottom: spacing.sm };

  const fields = [
    {
      key: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Aryan Kapoor",
      span: false,
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      placeholder: "aryan@example.com",
      span: false,
    },
    {
      key: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      span: false,
    },
    {
      key: "location",
      label: "Location",
      type: "text",
      placeholder: "Mumbai, India",
      span: false,
    },
  ];

  /* ─── Responsive layout values ─── */

  const outerGrid = {
    display: "grid",
    // Single column on mobile/tablet, side-by-side on desktop
    gridTemplateColumns: isTablet ? "1fr" : "1fr 1.4fr",
    gap: isMobile ? spacing.lg : spacing.xl,
    alignItems: "start",
  };

  // Input fields: 2-col grid on ≥480px, single col on very small screens
  const fieldsGrid = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: spacing.sm,
  };

  const formCard = {
    ...formAnim,
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.xl,
    padding: isMobile ? spacing.md : spacing.lg,
  };

  const contactInfoItems = [
    { icon: "📧", label: "Email", value: "hello@sinenetwork.com" },
    { icon: "📍", label: "Office", value: "Delhi, India" },
    { icon: "🕐", label: "Response Time", value: "Within 24 hours" },
  ];

  return (
    <SectionWrapper id="contact" style={{ background: colors.bg }}>
      <div style={outerGrid}>
        {/* ── Left: info side ── */}
        <div ref={headRef} style={headAnim}>
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
            Get In Touch
          </p>

          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: isMobile
                ? "clamp(2rem, 8vw, 2.6rem)"
                : "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: colors.text,
              margin: "0 0 20px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Let's talk
            <br />
            <span style={{ color: colors.highlight }}>about Sine.</span>
          </h2>

          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "1rem",
              lineHeight: 1.7,
              color: colors.textSecondary,
              margin: `0 0 ${spacing.lg}`,
              maxWidth: isTablet ? "560px" : "unset",
            }}
          >
            Have a question, partnership inquiry, or want to learn more? Drop us
            a message and we'll respond within 24 hours.
          </p>

          {/* Contact info items — horizontal row on tablet (since layout is stacked), vertical on desktop */}
          <div
            style={{
              display: "flex",
              flexDirection: isTablet && !isMobile ? "row" : "column",
              flexWrap: "wrap",
              gap: isTablet && !isMobile ? spacing.lg : "20px",
            }}
          >
            {contactInfoItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    flexShrink: 0,
                    borderRadius: radius.md,
                    background: colors.surface,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "0.8rem",
                      color: colors.textTertiary,
                      marginBottom: "2px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "0.95rem",
                      color: colors.text,
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div ref={formRef} style={formCard}>
          {/* 4 input fields in responsive grid */}
          <div style={fieldsGrid}>
            {fields.map((f) => (
              <div key={f.key} style={fieldGroup}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={set(f.key)}
                  style={inputStyle(!!errors[f.key])}
                  onFocus={(e) =>
                    (e.target.style.borderColor = colors.highlight)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors[f.key]
                      ? colors.danger
                      : colors.border)
                  }
                  aria-label={f.label}
                />
                {errors[f.key] && <p style={errStyle}>{errors[f.key]}</p>}
              </div>
            ))}
          </div>

          {/* Message — always full width */}
          <div style={fieldGroup}>
            <label style={labelStyle}>Message</label>
            <textarea
              placeholder="Tell us what's on your mind..."
              value={form.message}
              onChange={set("message")}
              rows={isMobile ? 4 : 5}
              style={{
                ...inputStyle(!!errors.message),
                resize: "vertical",
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.target.style.borderColor = colors.highlight)}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.message
                  ? colors.danger
                  : colors.border)
              }
              aria-label="Message"
            />
            {errors.message && <p style={errStyle}>{errors.message}</p>}
          </div>

          <Button
            label={submitted ? "Message Sent ✓" : "Send Message"}
            onClick={handleSubmit}
            loading={loading}
            disabled={submitted}
            variant="primary"
            fullWidth
          />
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
