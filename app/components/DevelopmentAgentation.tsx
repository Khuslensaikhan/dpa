"use client";

import dynamic from "next/dynamic";

const Agentation = dynamic(
  () => import("agentation").then((module) => module.Agentation),
  { ssr: false },
);

export function DevelopmentAgentation() {
  // Keep the development annotation tool opt-in. Its own controls are not
  // part of the site UI and add a sizeable client bundle to local audits.
  if (process.env.NEXT_PUBLIC_ENABLE_AGENTATION !== "true") {
    return null;
  }

  return <Agentation />;
}
