import { useTheme } from "../../theme/ThemeContext";

export default function SectionWrapper({
  id,
  children,
  style = {},
  noPad = false,
}) {
  const { theme } = useTheme();

  const wrapper = {
    width: "100%",
    padding: noPad ? "0" : `${theme.spacing.xxl} ${theme.spacing.lg}`,
    boxSizing: "border-box",
    ...style,
  };

  const inner = {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  };

  return (
    <section id={id} style={wrapper} aria-label={id}>
      <div style={inner}>{children}</div>
    </section>
  );
}
