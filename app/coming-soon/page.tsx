import type { Metadata } from "next";
import { HoldingPage } from "../components/HoldingPage";

export const metadata: Metadata = {
  title: "Coming Soon | Data Power Analytics",
  description: "This Data Power Analytics page is currently being refined.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  return <HoldingPage kind="coming-soon" />;
}
