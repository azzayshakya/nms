import { HelmetProvider, Helmet } from "react-helmet-async";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import Navbar from "./components/layout/Navbar";

import ProductShowcase from "./components/sections/Productshowcase";
import { seoConfig } from "./config/Seo.config";
import Hero from "./components/sections/HeroSection";
import ProductScroll from "./components/sections/ProductScroll";
import Benefits from "./components/sections/Benifits";
import Reviews from "./components/sections/Review";
import InterestCheck from "./components/sections/InterestCheck";
import ContactForm from "./components/sections/ContactForm";

function AppContent() {
  const { theme } = useTheme();
  const { colors, fonts } = theme;

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        fontFamily: fonts.body,
        minHeight: "100vh",
        transition: "background 0.4s ease, color 0.4s ease",
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <ProductScroll />
        <Benefits />
        <Reviews />
        <InterestCheck />
        <ContactForm />
      </main>
      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "2rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: colors.text,
            letterSpacing: "-0.02em",
          }}
        >
          SINE
        </span>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: "0.85rem",
            color: colors.textTertiary,
          }}
        >
          © 2025 Sine Network. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                color: colors.textSecondary,
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta property="og:title" content={seoConfig.ogTitle} />
        <meta property="og:description" content={seoConfig.ogDescription} />
        <meta property="og:image" content={seoConfig.ogImage} />
        <meta name="twitter:card" content={seoConfig.twitterCard} />
        <link rel="canonical" href={seoConfig.canonical} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}
