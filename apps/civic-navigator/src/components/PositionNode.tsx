"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import {
  Shield,
  Book,
  Scale,
  Landmark,
  User,
  Users,
  Crown,
  Building2,
  Gavel,
  Vote,
  FileText,
} from "lucide-react";

export const iconsMap: Record<string, React.ElementType> = {
  shield: Shield,
  book: Book,
  scale: Scale,
  landmark: Landmark,
  user: User,
  users: Users,
  crown: Crown,
  building: Building2,
  gavel: Gavel,
  vote: Vote,
  file: FileText,
};

export type PositionNodeData = {
  title: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  desc?: string;
  tier?: string;
  branch?: string;
  appointedBy?: string;
};

const tierLabel: Record<string, string> = {
  central: "Central",
  state: "State",
  local: "Local",
};

const PositionNode = ({ data, selected }: { data: PositionNodeData; selected?: boolean }) => {
  const Icon = data.icon && iconsMap[data.icon] ? iconsMap[data.icon] : User;

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-neutral-400 !w-2 !h-2 !border-none" />
      <motion.div
        whileHover={{ scale: 1.04, y: -3 }}
        whileTap={{ scale: 0.97 }}
        className={`relative pl-0 shadow-lg rounded-2xl border overflow-hidden ${
          selected
            ? "border-indigo-500 ring-2 ring-indigo-500/30"
            : "border-neutral-200 dark:border-neutral-800"
        } bg-white dark:bg-neutral-900 min-w-[230px] max-w-[280px] cursor-pointer transition-all duration-200 hover:shadow-xl`}
      >
        {/* Left color accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ backgroundColor: data.color || "#6366f1" }}
        />

        <div className="flex items-start gap-3 px-4 py-3 pl-5">
          <div
            className="flex items-center justify-center p-2 rounded-xl shrink-0 mt-0.5"
            style={{
              backgroundColor: data.color ? `${data.color}15` : "#6366f115",
              color: data.color || "#6366f1",
            }}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-[13px] text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
              {data.title}
            </div>
            {data.subtitle && (
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium leading-tight">
                {data.subtitle}
              </div>
            )}
            {/* Tier + appointment chips */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {data.tier && (
                <span
                  className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: data.color ? `${data.color}15` : "#6366f115",
                    color: data.color || "#6366f1",
                  }}
                >
                  {tierLabel[data.tier] || data.tier}
                </span>
              )}
              {data.appointedBy && (
                <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  {data.appointedBy.includes("Elected") || data.appointedBy.includes("elected") || data.appointedBy.includes("Directly")
                    ? "Elected"
                    : data.appointedBy.includes("UPSC") || data.appointedBy.includes("exam")
                    ? "Exam"
                    : "Appointed"}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <Handle type="source" position={Position.Bottom} className="!bg-neutral-400 !w-2 !h-2 !border-none" />
    </>
  );
};

export default memo(PositionNode);
