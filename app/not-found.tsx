import type { Metadata } from "next";
import { HoldingPage } from "./components/HoldingPage";

export const metadata: Metadata = {
  title: "Page Not Found | Data Power Analytics",
  description: "The requested Data Power Analytics page could not be found.",
};

export default function NotFound() {
  return <HoldingPage kind="not-found" />;
}
