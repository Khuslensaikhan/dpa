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
    let idleCallbackId: number | undefined;
    let startTimer: number | undefined;

    const getRenderKey = () => {
      if (window.innerWidth < 768) return "mobile";
      if (window.innerWidth < 1024) return "tablet";
      return "desktop";
    };
    let activeRenderKey = getRenderKey();
    const getStartDelay = () => {
      if (window.innerWidth < 768) return 3_500;
      if (window.innerWidth < 1024) return 2_800;
      return 1_200;
    };
    const clearScheduledStart = () => {
      if (startTimer !== undefined) {
        window.clearTimeout(startTimer);
      }

      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
    const scheduleScene = () => {
      clearScheduledStart();
      setRenderKey(activeRenderKey);
      setIsReady(false);

      if (reducedMotionQuery.matches) {
        return;
      }

      startTimer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleCallbackId = window.requestIdleCallback(
            () => setIsReady(true),
            { timeout: 1_500 },
          );
          return;
        }

        setIsReady(true);
      }, getStartDelay());
    };
    const handleResize = () => {
      const nextRenderKey = getRenderKey();

      // Mobile browsers emit resize events while their address bar expands or
      // collapses during scroll. Only recreate the WebGL scene when its actual
      // quality tier changes.
      if (nextRenderKey === activeRenderKey) {
        return;
      }

      activeRenderKey = nextRenderKey;
      scheduleScene();
    };

    scheduleScene();
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotionQuery.addEventListener("change", scheduleScene);

    return () => {
      clearScheduledStart();
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", scheduleScene);
    };
  }, []);

  return isReady ? <ParticleHero key={renderKey} /> : null;
}
