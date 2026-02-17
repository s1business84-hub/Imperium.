"use client";
import React, { useEffect, useState } from "react";

interface EncryptedTextProps {
  text: string;
  interval?: number;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  interval = 50,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    const targetText = text;

    const animate = () => {
      if (currentIndex <= targetText.length) {
        // Build the display text
        const revealed = targetText.slice(0, currentIndex);
        const encrypted = targetText
          .slice(currentIndex)
          .split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join("");

        setDisplayText(revealed + encrypted);
        currentIndex++;

        timeoutId = setTimeout(animate, interval);
      } else {
        setDisplayText(targetText);
        setIsAnimating(false);
      }
    };

    setIsAnimating(true);
    animate();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, interval]);

  return (
    <span className={className}>
      {displayText}
      {isAnimating && (
        <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
      )}
    </span>
  );
};
