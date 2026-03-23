import { Edge } from "@xyflow/react";
import { BRANCH_COLORS } from "./positions";

const edgeStyle = (branch: string) => ({
  stroke: BRANCH_COLORS[branch] || "#999",
  strokeWidth: 2,
});

export const edges: Edge[] = [
  // Constitution → Three Pillars (animated)
  { id: "e1-2", source: "1", target: "2", animated: true, style: edgeStyle("executive") },
  { id: "e1-3", source: "1", target: "3", animated: true, style: edgeStyle("legislature") },
  { id: "e1-4", source: "1", target: "4", animated: true, style: edgeStyle("judiciary") },

  // Executive Branch — Central
  { id: "e2-5", source: "2", target: "5", style: edgeStyle("executive") },
  { id: "e5-6", source: "5", target: "6", style: edgeStyle("executive") },
  { id: "e6-7", source: "6", target: "7", style: edgeStyle("executive") },
  { id: "e7-8", source: "7", target: "8", style: edgeStyle("executive") },

  // Executive Branch — State
  { id: "e2-16", source: "2", target: "16", style: edgeStyle("executive") },
  { id: "e16-17", source: "16", target: "17", style: edgeStyle("executive") },
  { id: "e8-18", source: "8", target: "18", style: edgeStyle("executive") },

  // Legislature Branch
  { id: "e3-9", source: "3", target: "9", style: edgeStyle("legislature") },
  { id: "e9-19", source: "9", target: "19", style: edgeStyle("legislature") },
  { id: "e19-10", source: "19", target: "10", style: edgeStyle("legislature") },
  { id: "e9-20", source: "9", target: "20", style: edgeStyle("legislature") },
  { id: "e20-11", source: "20", target: "11", style: edgeStyle("legislature") },
  { id: "e3-12", source: "3", target: "12", style: edgeStyle("legislature") },

  // Judiciary Branch
  { id: "e4-13", source: "4", target: "13", style: edgeStyle("judiciary") },
  { id: "e13-14", source: "13", target: "14", style: edgeStyle("judiciary") },
  { id: "e14-15", source: "14", target: "15", style: edgeStyle("judiciary") },

  // Constitutional Bodies
  { id: "e1-21", source: "1", target: "21", animated: true, style: edgeStyle("constitutional") },
  { id: "e1-22", source: "1", target: "22", animated: true, style: edgeStyle("constitutional") },
  { id: "e1-23", source: "1", target: "23", animated: true, style: edgeStyle("constitutional") },

  // Local Government
  { id: "e12-24", source: "12", target: "24", style: edgeStyle("local") },
  { id: "e12-25", source: "12", target: "25", style: edgeStyle("local") },
  { id: "e12-26", source: "12", target: "26", style: edgeStyle("local") },
];
