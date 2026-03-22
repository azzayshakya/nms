import { useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";

export default function Navbar() {
  const { theme, isDark, toggle } = useTheme();
  const { colors, fonts, transitions, radius } = theme;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: scrolled ? "12px 2.5rem" : "20px 2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: scrolled ? colors.overlay : "transparent",
    backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
    borderBottom: scrolled ? `1px solid ${colors.border}` : "none",
    transition: `all ${transitions.base}`,
    boxSizing: "border-box",
  };

  const logo = {
    fontFamily: fonts.display,
    fontSize: "1.3rem",
    fontWeight: 700,
    color: colors.text,
    textDecoration: "none",
    letterSpacing: "-0.02em",
  };

  const links = ["Features", "Benefits", "Reviews", "Contact"];

  const linkStyle = {
    fontFamily: fonts.body,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: colors.textSecondary,
    textDecoration: "none",
    transition: `color ${transitions.fast}`,
    letterSpacing: "0.01em",
  };

  const toggleBtn = {
    width: "44px",
    height: "24px",
    borderRadius: radius.full,
    background: isDark ? colors.accent : colors.surface,
    border: `1.5px solid ${colors.borderStrong}`,
    cursor: "pointer",
    position: "relative",
    flexShrink: 0,
    transition: `background ${transitions.base}`,
  };

  const knob = {
    position: "absolute",
    top: "2px",
    left: isDark ? "20px" : "2px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: isDark ? colors.accentText : colors.text,
    transition: `left ${transitions.base}`,
  };

  return (
    <header>
      <nav style={nav} aria-label="Main navigation">
        <a href="#hero" style={logo}>
          SINE
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.color = colors.text)}
              onMouseLeave={(e) =>
                (e.target.style.color = colors.textSecondary)
              }
            >
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            style={toggleBtn}
            onClick={toggle}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <div style={knob} />
          </button>
          <a
            href="#contact"
            style={{
              fontFamily: fonts.body,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: colors.accentText,
              background: colors.accent,
              padding: "9px 20px",
              borderRadius: radius.full,
              textDecoration: "none",
              transition: `all ${transitions.base}`,
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.accentHover;
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.accent;
              e.target.style.transform = "translateY(0)";
            }}
          >
            Get Notified
          </a>
        </div>
      </nav>
    </header>
  );
}
