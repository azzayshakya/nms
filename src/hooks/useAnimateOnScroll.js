import { useInView } from "react-intersection-observer";

const effects = {
  fadeIn: {
    hidden: { opacity: 0, transform: "none" },
    visible: { opacity: 1, transform: "none" },
  },
  slideUp: {
    hidden: { opacity: 0, transform: "translateY(48px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  slideLeft: {
    hidden: { opacity: 0, transform: "translateX(80px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  slideRight: {
    hidden: { opacity: 0, transform: "translateX(-80px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  scaleUp: {
    hidden: { opacity: 0, transform: "scale(0.92)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
};

export function useAnimateOnScroll(
  effect = "slideUp",
  delay = 0,
  threshold = 0.15,
) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const e = effects[effect] || effects.slideUp;

  const animatedStyle = {
    opacity: inView ? e.visible.opacity : e.hidden.opacity,
    transform: inView ? e.visible.transform : e.hidden.transform,
    transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  };

  return { ref, animatedStyle };
}
