"use client";

import dynamic from "next/dynamic";

const Agentation = dynamic(
  () => import("agentation").then((module) => module.Agentation),
  { ssr: false },
);

export function DevelopmentAgentation() {
  // Keep the annotation controls out of the public site while making them
  // immediately available during local development.
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return <Agentation />;
}
