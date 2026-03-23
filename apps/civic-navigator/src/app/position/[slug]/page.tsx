import { notFound } from "next/navigation";
import Link from "next/link";
import { positions, getPositionBySlug, BRANCH_COLORS } from "@/data/positions";
import {
  ArrowLeft,
  Compass,
  ChevronRight,
  Clock,
  Users,
  FileText,
  ShieldCheck,
  BookOpen,
  IndianRupee,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return positions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pos = getPositionBySlug(slug);
  if (!pos) return {};
  return {
    title: `${pos.title} — Civic Navigator`,
    description: pos.description,
    openGraph: {
      title: `${pos.title} — Civic Navigator`,
      description: pos.description,
    },
  };
}

export default async function PositionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pos = getPositionBySlug(slug);
  if (!pos) notFound();

  const color = pos.color;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Back to Explorer
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Compass size={16} className="text-amber-500" />
            <span className="text-sm font-bold text-neutral-900 dark:text-white">Civic Navigator</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="flex items-start gap-5 mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {pos.title.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              {pos.title}
            </h1>
            <p className="text-neutral-500 font-medium mt-1">{pos.subtitle}</p>
            <div className="flex items-center gap-2 mt-3">
              <span
                className="inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {pos.branch}
              </span>
              <span className="inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                {pos.tier}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10">
          {pos.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <StatCard icon={Users} label="Appointed By" value={pos.appointedBy} />
          <StatCard icon={ChevronRight} label="Reports To" value={pos.reportsTo} />
          <StatCard icon={Clock} label="Term Length" value={pos.termLength} />
          {pos.salary && <StatCard icon={IndianRupee} label="Salary" value={pos.salary} />}
        </div>

        {/* Powers */}
        <Section icon={ShieldCheck} title="Powers & Responsibilities" color={color}>
          {pos.powers.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {i + 1}
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{p}</span>
            </div>
          ))}
        </Section>

        {/* Eligibility */}
        <Section icon={BookOpen} title="Eligibility & Path" color={color}>
          {pos.eligibility.map((e, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800"
            >
              <ChevronRight size={14} className="shrink-0 mt-1" style={{ color }} />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{e}</span>
            </div>
          ))}
        </Section>

        {/* Articles */}
        <Section icon={FileText} title="Constitutional Articles" color={color}>
          {pos.articles.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800"
            >
              <FileText size={14} className="shrink-0 mt-1" style={{ color }} />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {a}
              </span>
            </div>
          ))}
        </Section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <Compass size={16} />
            View in Interactive Tree
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={12} className="text-neutral-400" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{label}</span>
      </div>
      <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-tight">{value}</div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} style={{ color }} />
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
