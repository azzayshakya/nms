import { useState } from "react";
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
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      placeholder: "aryan@example.com",
    },
    {
      key: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
    },
    {
      key: "location",
      label: "Location",
      type: "text",
      placeholder: "Mumbai, India",
    },
  ];

  return (
    <SectionWrapper id="contact" style={{ background: colors.bg }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: spacing.xl,
          alignItems: "start",
        }}
      >
        {/* Left side */}
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
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
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
            }}
          >
            Have a question, partnership inquiry, or want to learn more? Drop us
            a message and we'll respond within 24 hours.
          </p>

          {[
            { icon: "📧", label: "Email", value: "hello@sinenetwork.com" },
            { icon: "📍", label: "Office", value: "Delhi, India" },
            { icon: "🕐", label: "Response Time", value: "Within 24 hours" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                marginBottom: "20px",
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

        {/* Right side — form */}
        <div
          ref={formRef}
          style={{
            ...formAnim,
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xl,
            padding: spacing.lg,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: spacing.sm,
            }}
          >
            {fields.map((f) => (
              <div
                key={f.key}
                style={{
                  ...fieldGroup,
                  gridColumn:
                    f.key === "phone" || f.key === "location" ? "auto" : "auto",
                }}
              >
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

          <div style={fieldGroup}>
            <label style={labelStyle}>Message</label>
            <textarea
              placeholder="Tell us what's on your mind..."
              value={form.message}
              onChange={set("message")}
              rows={5}
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
