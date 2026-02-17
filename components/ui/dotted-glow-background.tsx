"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DottedGlowBackgroundProps {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
}

export const DottedGlowBackground: React.FC<DottedGlowBackgroundProps> = ({
  className,
  opacity = 1,
  gap = 10,
  radius = 1.6,
  colorLightVar = "--color-neutral-500",
  glowColorLightVar = "--color-neutral-600",
  colorDarkVar = "--color-neutral-500",
  glowColorDarkVar = "--color-sky-800",
  backgroundOpacity = 0,
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const dots: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      glowIntensity: number;
      glowDirection: number;
    }> = [];

    // Create dot grid
    const cols = Math.ceil(canvas.width / gap);
    const rows = Math.ceil(canvas.height / gap);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * gap,
          y: j * gap,
          vx: (Math.random() - 0.5) * speedScale,
          vy: (Math.random() - 0.5) * speedScale,
          glowIntensity: Math.random(),
          glowDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    const getColorValue = (varName: string): string => {
      const root = document.documentElement;
      const value = getComputedStyle(root).getPropertyValue(varName).trim();
      return value || "#888888";
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = getColorValue(isDark ? colorDarkVar : colorLightVar);
      const glowColor = getColorValue(
        isDark ? glowColorDarkVar : glowColorLightVar
      );

      dots.forEach((dot) => {
        // Update glow intensity
        dot.glowIntensity += dot.glowDirection * 0.01 * speedScale;
        if (dot.glowIntensity >= 1 || dot.glowIntensity <= 0) {
          dot.glowDirection *= -1;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(
          dot.x,
          dot.y,
          0,
          dot.x,
          dot.y,
          radius * 4
        );
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, "transparent");

        ctx.globalAlpha = dot.glowIntensity * opacity;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw dot
        ctx.globalAlpha = opacity;
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    gap,
    radius,
    opacity,
    colorLightVar,
    glowColorLightVar,
    colorDarkVar,
    glowColorDarkVar,
    backgroundOpacity,
    speedMin,
    speedMax,
    speedScale,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ opacity: backgroundOpacity }}
    />
  );
};
