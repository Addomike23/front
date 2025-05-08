// components/ScrollFadeIn.js
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollFadeIn({ children, direction = "up", duration = 0.6 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // allow multiple triggers
    threshold: 0.2,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // reset when out of view
    }
  }, [inView, controls]);

  return (
    <div className="overflow-hidden">
      <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
        {children}
      </motion.div>
    </div>
  );
}
