"use client";
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
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function FeaturesSection() {
  const features = [
    {
      title: "Clinical Reasoning",
      description:
        "AI-powered differential diagnosis generation to expand clinical thinking patterns.",
      icon: <IconBrain className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Privacy First",
      description:
        "Built-in PII sanitization and regulatory-safe language for healthcare compliance.",
      icon: <IconShieldCheck className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Educational Focus",
      description:
        "Designed exclusively for learning, not for diagnosis or treatment recommendations.",
      icon: <IconBook className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Cognitive Checkpoints",
      description:
        "Structured output with reasoning patterns and suggested follow-up questions.",
      icon: <IconMessageCheck className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Real-Time Analysis",
      description:
        "Instant clinical reasoning exploration with state-of-the-art language models.",
      icon: <IconClock className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Collaborative Learning",
      description:
        "Supporting medical education and fostering critical thinking among healthcare professionals.",
      icon: <IconUsersGroup className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Regulatory Compliant",
      description:
        "Carefully designed to avoid diagnosis, treatment, and triage recommendations.",
      icon: <IconLicense className="h-8 w-8" />,
      href: "/about",
    },
    {
      title: "Comprehensive Insights",
      description:
        "Multiple diagnostic considerations with reasoning and often-missed diagnoses.",
      icon: <IconChartDots className="h-8 w-8" />,
      href: "/about",
    },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-7xl py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <a key={feature.title} href={feature.href}>
            <CardSpotlight className="h-full">
              <div className="relative z-20">
                <div className="mb-4 text-blue-400">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-300">
                  {feature.description}
                </p>
              </div>
            </CardSpotlight>
          </a>
        ))}
      </div>
    </div>
  );
}
