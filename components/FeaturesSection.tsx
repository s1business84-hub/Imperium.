"use client";
import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconShieldCheck,
  IconBook,
  IconMessageCheck,
  IconClock,
  IconUsersGroup,
  IconLicense,
  IconChartDots,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Clinical Reasoning",
      description:
        "AI-powered differential diagnosis generation to expand clinical thinking patterns.",
      icon: <IconBrain />,
      href: "/about",
    },
    {
      title: "Privacy First",
      description:
        "Built-in PII sanitization and regulatory-safe language for healthcare compliance.",
      icon: <IconShieldCheck />,
      href: "/about",
    },
    {
      title: "Educational Focus",
      description:
        "Designed exclusively for learning, not for diagnosis or treatment recommendations.",
      icon: <IconBook />,
      href: "/about",
    },
    {
      title: "Cognitive Checkpoints",
      description:
        "Structured output with reasoning patterns and suggested follow-up questions.",
      icon: <IconMessageCheck />,
      href: "/about",
    },
    {
      title: "Real-Time Analysis",
      description:
        "Instant clinical reasoning exploration with state-of-the-art language models.",
      icon: <IconClock />,
      href: "/about",
    },
    {
      title: "Collaborative Learning",
      description:
        "Supporting medical education and fostering critical thinking among healthcare professionals.",
      icon: <IconUsersGroup />,
      href: "/about",
    },
    {
      title: "Regulatory Compliant",
      description:
        "Carefully designed to avoid diagnosis, treatment, and triage recommendations.",
      icon: <IconLicense />,
      href: "/about",
    },
    {
      title: "Comprehensive Insights",
      description:
        "Multiple diagnostic considerations with reasoning and often-missed diagnoses.",
      icon: <IconChartDots />,
      href: "/about",
    },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-7xl py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon,
  href,
  index,
}) => {
  return (
    <a
      href={href}
      className={cn(
        "flex flex-col py-10 relative group/feature cursor-pointer transition-all duration-200 lg:border-r dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 pointer-events-none dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 pointer-events-none dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </a>
  );
};
