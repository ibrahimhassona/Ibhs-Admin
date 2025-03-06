"use client";
import React from "react";

interface ProgressLoaderProps {
  size?: number;
  stroke?: number;
  speed?: number;
  color?: string;
  bgOpacity?: number;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  size = 90,
  stroke = 5,
  speed = 2,
  color = "#439400",
  bgOpacity = 0.1,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
      style={{
        animation: `wobble ${speed}s ease-in-out infinite`,
      }}
    >
      {/* Background Circle */}
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="gray"
        strokeWidth={stroke}
        opacity={bgOpacity}
      />
      {/* Progress Arc */}
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray="100"
        strokeDashoffset="20"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ProgressLoader;
