"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleHero = dynamic(
  () => import("./ParticleHero").then((module) => module.ParticleHero),
  { ssr: false },
);

/**
 * The WebGL scene is decorative, so defer it until the initial content has
 * settled. This protects the LCP while preserving the animated experience.
 */
export function ParticleHeroGate() {
  const [isReady, setIsReady] = useState(false);
  const [renderKey, setRenderKey] = useState("initial");

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const getRenderKey = () => {
      if (window.innerWidth < 768) return "mobile";
      if (window.innerWidth < 1024) return "tablet";
      return "desktop";
    };
    const updateRenderKey = () => setRenderKey(getRenderKey());
    const updateMotionPreference = () => setIsReady(!reducedMotionQuery.matches);
    const startTimer = window.setTimeout(updateMotionPreference, 1_200);

    updateRenderKey();
    window.addEventListener("resize", updateRenderKey, { passive: true });
    reducedMotionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.clearTimeout(startTimer);
      window.removeEventListener("resize", updateRenderKey);
      reducedMotionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return isReady ? <ParticleHero key={renderKey} /> : null;
}
