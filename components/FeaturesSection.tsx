"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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

export function FeaturesSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Staggered parallax for cards - each row moves differently
  const row1Y = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const row2Y = useTransform(scrollYProgress, [0, 1], [40, -20]);

  const features = [
    {
      title: "Clinical Reasoning",
      description:
        "AI-powered differential diagnosis generation to expand clinical thinking patterns.",
      icon: <IconBrain className="h-8 w-8" />,
      swipeText: "Expand your diagnostic thinking with AI",
    },
    {
      title: "Privacy First",
      description:
        "Built-in PII sanitization and regulatory-safe language for healthcare compliance.",
      icon: <IconShieldCheck className="h-8 w-8" />,
      swipeText: "Your data stays private and secure",
    },
    {
      title: "Educational Focus",
      description:
        "Designed exclusively for learning, not for diagnosis or treatment recommendations.",
      icon: <IconBook className="h-8 w-8" />,
      swipeText: "Built for learning, not diagnosis",
    },
    {
      title: "Cognitive Checkpoints",
      description:
        "Structured output with reasoning patterns and suggested follow-up questions.",
      icon: <IconMessageCheck className="h-8 w-8" />,
      swipeText: "Guide your clinical reasoning process",
    },
    {
      title: "Real-Time Analysis",
      description:
        "Instant clinical reasoning exploration with state-of-the-art language models.",
      icon: <IconClock className="h-8 w-8" />,
      swipeText: "Instant insights at your fingertips",
    },
    {
      title: "Collaborative Learning",
      description:
        "Supporting medical education and fostering critical thinking among healthcare professionals.",
      icon: <IconUsersGroup className="h-8 w-8" />,
      swipeText: "Learn and grow together",
    },
    {
      title: "Regulatory Compliant",
      description:
        "Carefully designed to avoid diagnosis, treatment, and triage recommendations.",
      icon: <IconLicense className="h-8 w-8" />,
      swipeText: "Designed with compliance in mind",
    },
    {
      title: "Comprehensive Insights",
      description:
        "Multiple diagnostic considerations with reasoning and often-missed diagnoses.",
      icon: <IconChartDots className="h-8 w-8" />,
      swipeText: "Discover what others might miss",
    },
  ];

  return (
    <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl py-10">
      {/* Section Title with parallax */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Powerful Features
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore our comprehensive suite of tools designed for medical education
        </p>
      </motion.div>

      <DraggableCardContainer className="flex flex-wrap items-center justify-center gap-6">
        {features.map((feature, index) => (
          <motion.div 
            key={feature.title} 
            style={{ y: index < 4 ? row1Y : row2Y }}
            onClick={() => setActiveCard(activeCard === feature.title ? null : feature.title)}
            className="cursor-grab active:cursor-grabbing flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <DraggableCardBody 
                className="h-full"
                onDragStart={() => setDraggingCard(feature.title)}
                onDragEnd={() => {
                  setTimeout(() => setDraggingCard(null), 1500);
                }}
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
            </motion.div>
            
            {/* Swipe text that appears under the card */}
            <AnimatePresence>
              {draggingCard === feature.title && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-4 pointer-events-none"
                >
                  <div className="px-5 py-2.5 rounded-xl backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/10">
                    <p className="text-sm font-medium text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text whitespace-nowrap">
                      {feature.swipeText}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </DraggableCardContainer>
    </div>
  );
}
