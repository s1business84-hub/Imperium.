"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

const swipeMessages = [
  "Explore clinical reasoning with AI assistance",
  "Privacy-first design for healthcare education",
  "Built for learning, not diagnosis",
  "Cognitive checkpoints to guide your thinking",
  "Real-time analysis at your fingertips",
  "Collaborate and learn together",
  "Designed with regulatory compliance in mind",
  "Comprehensive insights await you",
];

export function FeaturesSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [swipeMessage, setSwipeMessage] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const handleDragStart = useCallback(() => {
    setSwipeMessage(swipeMessages[messageIndex % swipeMessages.length]);
    setMessageIndex((prev) => prev + 1);
  }, [messageIndex]);

  const handleDragEnd = useCallback(() => {
    // Keep message visible for a moment, then fade out
    setTimeout(() => {
      setSwipeMessage(null);
    }, 2000);
  }, []);

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
      {/* Swipe Message Animation */}
      <AnimatePresence>
        {swipeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="px-6 py-3 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/10">
              <p className="text-sm md:text-base font-medium text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text whitespace-nowrap">
                {swipeMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DraggableCardContainer className="flex flex-wrap items-center justify-center gap-6">
        {features.map((feature) => (
          <div 
            key={feature.title} 
            onClick={() => setActiveCard(activeCard === feature.title ? null : feature.title)}
            className="cursor-grab active:cursor-grabbing"
          >
            <DraggableCardBody 
              className="h-full"
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="relative z-20 flex flex-col h-full">
                <div className="mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70 flex-1">
                  {feature.description}
                </p>
              </div>
            </DraggableCardBody>
          </div>
        ))}
      </DraggableCardContainer>
    </div>
  );
}
