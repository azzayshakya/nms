// import { useTheme } from "../../theme/ThemeContext";
// import { useInView } from "react-intersection-observer";
// import SectionWrapper from "./SectionWrapper";

// export default function ProductScroll() {
//   const { theme } = useTheme();
//   const { colors, fonts, spacing, radius, shadows } = theme;

//   const { ref: sectionRef, inView } = useInView({
//     threshold: 0.2,
//     triggerOnce: true,
//   });

//   const tagline = {
//     fontFamily: fonts.display,
//     fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
//     fontWeight: 800,
//     color: colors.text,
//     letterSpacing: "-0.03em",
//     lineHeight: 1.15,
//     margin: 0,
//   };

//   const grid = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: spacing.xl,
//     alignItems: "center",
//   };

//   const textSide = {
//     opacity: inView ? 1 : 0,
//     transform: inView ? "translateX(0)" : "translateX(-60px)",
//     transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)`,
//   };

//   const imgSide = {
//     opacity: inView ? 1 : 0,
//     transform: inView ? "translateX(0)" : "translateX(100px)",
//     transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s`,
//   };

//   const imgCard = {
//     background: colors.bgCard,
//     border: `1px solid ${colors.border}`,
//     borderRadius: radius.xl,
//     height: "480px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//     overflow: "hidden",
//     boxShadow: shadows.xl,
//   };

//   const glowLayer = {
//     position: "absolute",
//     inset: 0,
//     background: `radial-gradient(ellipse at 70% 50%, ${colors.highlight}12 0%, transparent 60%)`,
//     pointerEvents: "none",
//   };

//   const specs = [
//     { label: "Chip", value: "Sine X1 Pro" },
//     { label: "RAM", value: "8 GB LPDDR5" },
//     { label: "Connectivity", value: "WiFi 6E + BT 5.3" },
//     { label: "Battery", value: "4800 mAh" },
//   ];

//   const specRow = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "14px 0",
//     borderBottom: `1px solid ${colors.border}`,
//   };

//   return (
//     <SectionWrapper id="product" style={{ background: colors.bg }}>
//       <div ref={sectionRef} style={grid}>
//         <div style={textSide}>
//           <div>
//             {specs.map((s, i) => (
//               <div
//                 key={s.label}
//                 style={{
//                   ...specRow,
//                   ...(i === specs.length - 1 ? { borderBottom: "none" } : {}),
//                 }}
//               >
//                 <span
//                   style={{
//                     fontFamily: fonts.body,
//                     fontSize: "0.9rem",
//                     color: colors.textSecondary,
//                   }}
//                 >
//                   {s.label}
//                 </span>
//                 <span
//                   style={{
//                     fontFamily: fonts.mono,
//                     fontSize: "0.85rem",
//                     color: colors.text,
//                     fontWeight: 500,
//                   }}
//                 >
//                   {s.value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div style={imgSide}>
//           <div style={imgCard}>
//             <div style={glowLayer} />
//             {/* Replace with actual product image: <img src="..." style={{ width: '85%', objectFit: 'contain' }} /> */}
//             <svg width="240" height="300" viewBox="0 0 240 300" fill="none">
//               <rect
//                 x="50"
//                 y="20"
//                 width="140"
//                 height="260"
//                 rx="20"
//                 fill={colors.surface}
//                 stroke={colors.border}
//                 strokeWidth="1.5"
//               />
//               <rect
//                 x="62"
//                 y="38"
//                 width="116"
//                 height="200"
//                 rx="10"
//                 fill={colors.bgCard}
//                 stroke={colors.border}
//                 strokeWidth="1"
//               />
//               <rect
//                 x="90"
//                 y="30"
//                 width="60"
//                 height="4"
//                 rx="2"
//                 fill={colors.border}
//               />
//               <circle
//                 cx="120"
//                 cy="276"
//                 r="10"
//                 fill={colors.surface}
//                 stroke={colors.border}
//                 strokeWidth="1.5"
//               />
//               <circle cx="120" cy="276" r="5" fill={colors.border} />
//               <rect
//                 x="75"
//                 y="100"
//                 width="90"
//                 height="60"
//                 rx="6"
//                 fill={colors.surface}
//               />
//               <circle cx="90" cy="130" r="8" fill={colors.borderStrong} />
//               <rect
//                 x="105"
//                 y="122"
//                 width="50"
//                 height="6"
//                 rx="3"
//                 fill={colors.border}
//               />
//               <rect
//                 x="105"
//                 y="134"
//                 width="36"
//                 height="4"
//                 rx="2"
//                 fill={colors.surface}
//               />
//             </svg>
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "24px",
//                 left: "24px",
//                 fontFamily: fonts.mono,
//                 fontSize: "0.7rem",
//                 letterSpacing: "0.1em",
//                 textTransform: "uppercase",
//                 color: colors.textTertiary,
//                 background: colors.surface,
//                 padding: "6px 12px",
//                 borderRadius: radius.full,
//                 border: `1px solid ${colors.border}`,
//               }}
//             >
//               Sine Network Pro
//             </div>
//           </div>
//         </div>
//       </div>
//     </SectionWrapper>
//   );
// }
import SectionWrapper from "./SectionWrapper";
import { useState, useEffect } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { useInView } from "react-intersection-observer";
import image from "../../assets/products/neo-orbit/neo-orbit5.png";
export default function ProductScroll() {
  const { theme } = useTheme();
  const { colors, fonts, spacing, radius, shadows } = theme;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const specs = [
    { label: "Chip", value: "Sine X1 Pro" },
    { label: "RAM", value: "8 GB LPDDR5" },
    { label: "Connectivity", value: "WiFi 6E + BT 5.3" },
    { label: "Battery", value: "4800 mAh" },
  ];

  /* ─── Layout ─── */

  const grid = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: isMobile ? spacing.lg : spacing.xl,
    alignItems: "center",
  };

  /* ─── Animations ─── */

  const textSide = {
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateX(0)"
      : isMobile
        ? "translateY(40px)"
        : "translateX(-60px)",
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)`,
    // On mobile image comes first visually, so text is below — order it second
    order: isMobile ? 2 : 1,
  };

  const imgSide = {
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateX(0)"
      : isMobile
        ? "translateY(40px)"
        : "translateX(100px)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s`,
    order: isMobile ? 1 : 2,
  };

  /* ─── Image card ─── */

  const imgCard = {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.xl,
    height: isMobile ? "320px" : "480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: shadows.xl,
  };

  const glowLayer = {
    position: "absolute",
    inset: 0,
    background: `radial-gradient(ellipse at 70% 50%, ${colors.highlight}12 0%, transparent 60%)`,
    pointerEvents: "none",
  };

  /* ─── Typography ─── */

  const tagline = {
    fontFamily: fonts.display,
    fontSize: isMobile
      ? "clamp(1.8rem, 7vw, 2.4rem)"
      : "clamp(1.8rem, 4vw, 3.2rem)",
    fontWeight: 800,
    color: colors.text,
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    margin: 0,
  };

  const specRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: `1px solid ${colors.border}`,
  };

  return (
    <SectionWrapper id="product" style={{ background: colors.bg }}>
      <div ref={sectionRef} style={grid}>
        {/* ── Image side ── */}
        <div style={imgSide}>
          <div style={imgCard}>
            <div style={glowLayer} />
            <img src={image} alt="" />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                fontFamily: fonts.mono,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: colors.textTertiary,
                background: colors.surface,
                padding: "6px 12px",
                borderRadius: radius.full,
                border: `1px solid ${colors.border}`,
              }}
            >
              Neo Orbit V1
            </div>
          </div>
        </div>

        {/* ── Text side ── */}
        <div style={textSide}>
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
            The Device
          </p>

          <h2 style={tagline}>
            Real-Time
            <br />
            <span style={{ color: colors.highlight }}>Data ,</span>
            <br />
            Futuristic Design.
          </h2>

          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "0.95rem" : "1rem",
              lineHeight: 1.7,
              color: colors.textSecondary,
              margin: `${spacing.md} 0`,
            }}
          >
            neo orbit v1, this sculpture fetches local and global weather data,
            sunrise/sunset times, humidity, and wind conditions, all in real
            time using blynk iot.
          </p>

          {/* Specs table */}
          <div>
            {specs.map((s, i) => (
              <div
                key={s.label}
                style={{
                  ...specRow,
                  ...(i === specs.length - 1 ? { borderBottom: "none" } : {}),
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.9rem",
                    color: colors.textSecondary,
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: "0.85rem",
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
