import type { Metadata } from "next";
import GuideIndex from "./GuideIndex";

export const metadata: Metadata = {
  title: "The Guide — Fumage",
  description: "In-depth articles on scent families, buying advice, and the psychology of fragrance.",
};

export default function GuidePage() {
  return <GuideIndex />;
}
