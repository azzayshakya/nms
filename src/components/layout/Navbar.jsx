import { useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";

export default function Navbar() {
  const { theme, isDark, toggle } = useTheme();
  const { colors, fonts, transitions, radius } = theme;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = ["Features", "Benefits", "Reviews", "Contact"];

  /* ─── Styles ─── */

  const nav = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: scrolled
      ? isMobile
        ? "12px 1.25rem"
        : "12px 2.5rem"
      : isMobile
        ? "16px 1.25rem"
        : "20px 2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: scrolled || menuOpen ? colors.overlay : "transparent",
    backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(180%)" : "none",
    borderBottom: scrolled || menuOpen ? `1px solid ${colors.border}` : "none",
    transition: `padding ${transitions.base}, background ${transitions.base}, border ${transitions.base}`,
    boxSizing: "border-box",
  };

  const logo = {
    fontFamily: fonts.display,
    fontSize: "1.3rem",
    fontWeight: 700,
    color: colors.text,
    textDecoration: "none",
    letterSpacing: "-0.02em",
    zIndex: 1001,
  };

  const linkStyle = {
    fontFamily: fonts.body,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: colors.textSecondary,
    textDecoration: "none",
    transition: `color ${transitions.fast}`,
    letterSpacing: "0.01em",
  };

  const ctaStyle = {
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
    whiteSpace: "nowrap",
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
    zIndex: 1001,
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

  const bar = (rotate, translateY, opacity = 1) => ({
    display: "block",
    width: "22px",
    height: "2px",
    background: colors.text,
    borderRadius: "2px",
    transition: `all ${transitions.base}`,
    transform: rotate,
    opacity,
    ...(translateY ? { marginTop: translateY } : {}),
  });

  const hamburger = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    zIndex: 1001,
    flexShrink: 0,
  };

  const drawer = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    background: colors.bg,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2.5rem",
    opacity: menuOpen ? 1 : 0,
    pointerEvents: menuOpen ? "auto" : "none",
    transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
    transition: `opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)`,
  };

  const drawerLink = (i) => ({
    fontFamily: fonts.display,
    fontSize: "2rem",
    fontWeight: 800,
    color: colors.text,
    textDecoration: "none",
    letterSpacing: "-0.02em",
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 60 + 80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 60 + 80}ms, color ${transitions.fast}`,
  });

  const drawerCta = {
    fontFamily: fonts.body,
    fontSize: "1rem",
    fontWeight: 700,
    color: colors.accentText,
    background: colors.accent,
    padding: "14px 40px",
    borderRadius: radius.full,
    textDecoration: "none",
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${links.length * 60 + 100}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${links.length * 60 + 100}ms`,
  };

  const drawerToggleWrap = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${links.length * 60 + 160}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${links.length * 60 + 160}ms`,
  };

  return (
    <header>
      <nav style={nav} aria-label="Main navigation">
        <a href="#hero" style={logo} onClick={() => setMenuOpen(false)}>
          SINE
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.text)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.textSecondary)
                }
              >
                {l}
              </a>
            ))}
          </div>
        )}

        {!isMobile && (
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
              style={ctaStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.accentHover;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.accent;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Notified
            </a>
          </div>
        )}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={toggleBtn}
              onClick={toggle}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              <div style={knob} />
            </button>
            <button
              style={hamburger}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                style={bar(
                  menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                )}
              />
              <span style={bar("none", "0", menuOpen ? 0 : 1)} />
              <span
                style={bar(
                  menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                )}
              />
            </button>
          </div>
        )}
      </nav>

      {isMobile && (
        <div
          style={drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {links.map((l, i) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={drawerLink(i)}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.highlight)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.text)}
            >
              {l}
            </a>
          ))}

          <a
            href="#contact"
            style={drawerCta}
            onClick={() => setMenuOpen(false)}
          >
            Get Notified
          </a>

          <div style={drawerToggleWrap}>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                color: colors.textSecondary,
              }}
            >
              {isDark ? "Dark mode" : "Light mode"}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
