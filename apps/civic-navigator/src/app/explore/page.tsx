import type { Metadata } from "next";
import TreeOfPower from "@/components/TreeOfPower";

export const metadata: Metadata = {
  title: "Explore — Civic Navigator",
  description:
    "Interactive tree visualization of the Indian Constitution's power structure. Click any position to learn about its powers, eligibility, and constitutional articles.",
};

export default function ExplorePage() {
  return <TreeOfPower />;
}
