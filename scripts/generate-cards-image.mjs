import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WIDTH = 1600;
const HEIGHT = 900;
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

const cards = [
  { icon: "🧠", title: "Clinical Reasoning", desc: "AI-powered differential diagnosis\ngeneration to expand clinical\nthinking patterns.", color: "#3b82f6" },
  { icon: "🛡️", title: "Privacy First", desc: "Built-in PII sanitization and\nregulatory-safe language for\nhealthcare compliance.", color: "#8b5cf6" },
  { icon: "📖", title: "Educational Focus", desc: "Designed exclusively for learning,\nnot for diagnosis or treatment\nrecommendations.", color: "#10b981" },
  { icon: "💬", title: "Cognitive Checkpoints", desc: "Structured output with reasoning\npatterns and suggested follow-up\nquestions.", color: "#f59e0b" },
  { icon: "⏱️", title: "Real-Time Analysis", desc: "Instant clinical reasoning\nexploration with state-of-the-art\nlanguage models.", color: "#ef4444" },
  { icon: "👥", title: "Collaborative Learning", desc: "Supporting medical education and\nfostering critical thinking among\nhealthcare professionals.", color: "#6366f1" },
  { icon: "📋", title: "Regulatory Compliant", desc: "Carefully designed to avoid\ndiagnosis, treatment, and triage\nrecommendations.", color: "#ec4899" },
  { icon: "📊", title: "Comprehensive Insights", desc: "Multiple diagnostic considerations\nwith reasoning and often-missed\ndiagnoses.", color: "#14b8a6" },
];

const COLS = 4;
const ROWS = 2;
const PADDING = 40;
const GAP = 20;
const CARD_W = (WIDTH - PADDING * 2 - GAP * (COLS - 1)) / COLS;
const CARD_H = (HEIGHT - PADDING * 2 - GAP * (ROWS - 1)) / ROWS;
const RADIUS = 16;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

cards.forEach((card, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PADDING + col * (CARD_W + GAP);
  const y = PADDING + row * (CARD_H + GAP);

  // Card shadow
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.08)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 4;
  roundRect(ctx, x, y, CARD_W, CARD_H, RADIUS);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  // Card border
  roundRect(ctx, x, y, CARD_W, CARD_H, RADIUS);
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Left accent bar
  const barX = x + 16;
  const barY = y + 100;
  ctx.fillStyle = "#d1d5db";
  roundRect(ctx, barX, barY, 3, 28, 2);
  ctx.fill();

  // Icon circle background
  const iconX = x + 30;
  const iconY = y + 30;
  const iconSize = 48;
  roundRect(ctx, iconX, iconY, iconSize, iconSize, 12);
  ctx.fillStyle = card.color + "15";
  ctx.fill();

  // Icon emoji
  ctx.font = "24px Arial";
  ctx.fillStyle = card.color;
  ctx.fillText(card.icon, iconX + 12, iconY + 34);

  // Title
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillStyle = "#1e293b";
  ctx.fillText(card.title, x + 30, y + 115);

  // Description
  ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillStyle = "#64748b";
  const lines = card.desc.split("\n");
  lines.forEach((line, li) => {
    ctx.fillText(line, x + 30, y + 150 + li * 22);
  });
});

// Export as PNG
const buffer = canvas.toBuffer("image/png");
const outPath = join(__dirname, "..", "public", "cards-screenshot.png");
writeFileSync(outPath, buffer);
console.log("✅ Image saved to", outPath);
