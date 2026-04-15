"use client";

import * as React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { cn } from "@/lib/utils";

export interface DataFlowNode {
  id: string;
  x: number;
  y: number;
  label?: string;
}

export interface DataFlowEdge {
  from: string;
  to: string;
  /** Frame when the pulse on this edge starts. */
  startFrame?: number;
}

export interface DataFlowPipesProps {
  nodes?: DataFlowNode[];
  edges?: DataFlowEdge[];
  pipeColor?: string;
  pulseColor?: string;
  pulseLength?: number;
  pulseDuration?: number;
  background?: string;
  nodeColor?: string;
  textColor?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const DEFAULT_NODES: DataFlowNode[] = [
  { id: "father", x: 240, y: 360, label: "Father" },
  { id: "mother", x: 1040, y: 360, label: "Mother" },
  { id: "saloni", x: 640, y: 240, label: "Saloni" },
  { id: "simran", x: 640, y: 480, label: "Simran" },
];

const DEFAULT_EDGES: DataFlowEdge[] = [
  { from: "father", to: "saloni", startFrame: 0 },
  { from: "mother", to: "saloni", startFrame: 15 },
  { from: "father", to: "simran", startFrame: 30 },
  { from: "mother", to: "simran", startFrame: 45 },
];

/**
 * Build a smooth cubic bezier path string between two points.
 */
function bezierPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const handle = Math.max(60, Math.abs(dx) * 0.5);
  const c1x = a.x + handle;
  const c1y = a.y;
  const c2x = b.x - handle;
  const c2y = b.y;
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
}

/**
 * Approximate arc length of a cubic bezier by sampling.
 */
function bezierLength(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const handle = Math.max(60, Math.abs(b.x - a.x) * 0.5);
  const c1 = { x: a.x + handle, y: a.y };
  const c2 = { x: b.x - handle, y: b.y };
  let len = 0;
  let prev = a;
  const steps = 32;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const p = {
      x:
        u * u * u * a.x +
        3 * u * u * t * c1.x +
        3 * u * t * t * c2.x +
        t * t * t * b.x,
      y:
        u * u * u * a.y +
        3 * u * u * t * c1.y +
        3 * u * t * t * c2.y +
        t * t * t * b.y,
    };
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

export function DataFlowPipes({
  nodes = DEFAULT_NODES,
  edges = DEFAULT_EDGES,
  pipeColor = "#fbcfe8", // pink-200
  pulseColor = "#ec4899", // pink-500
  pulseLength = 60,
  pulseDuration = 60,
  background = "transparent",
  nodeColor = "#fdf2f8", // pink-50
  textColor = "#db2777", // pink-600
  speed = 1,
  className,
}: DataFlowPipesProps) {
  const frame = useCurrentFrame() * speed;
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div
      className={cn("relative w-full h-full", className)}
      style={{
        background,
        fontFamily: FONT_FAMILY,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 720"
        className="absolute inset-0"
      >
        {/* Static pipes */}
        {edges.map((edge, i) => {
          const a = nodeMap.get(edge.from);
          const b = nodeMap.get(edge.to);
          if (!a || !b) return null;
          const path = bezierPath(a, b);
          return (
            <path
              key={`pipe-${i}`}
              d={path}
              fill="none"
              stroke={pipeColor}
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}

        {/* Pulses with trailing ghosts */}
        {edges.map((edge, i) => {
          const a = nodeMap.get(edge.from);
          const b = nodeMap.get(edge.to);
          if (!a || !b) return null;
          const path = bezierPath(a, b);
          const len = bezierLength(a, b);
          const startFrame = edge.startFrame ?? 0;
          const localFrame = frame % 120 - startFrame; // Loop every 120 frames

          const offset = interpolate(
            localFrame,
            [0, pulseDuration],
            [len + pulseLength, -pulseLength],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          if (localFrame < 0 || localFrame > pulseDuration + 6) {
            return null;
          }

          return (
            <g key={`pulse-${i}`}>
              {[0.15, 0.3, 0.55].map((alpha, idx) => (
                <path
                  key={`trail-${idx}`}
                  d={path}
                  fill="none"
                  stroke={pulseColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={`${pulseLength} 9999`}
                  strokeDashoffset={offset + (idx + 1) * 8}
                  opacity={alpha}
                />
              ))}
              <path
                d={path}
                fill="none"
                stroke={pulseColor}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeDasharray={`${pulseLength} 9999`}
                strokeDashoffset={offset}
                style={{
                  filter: `drop-shadow(0 0 8px ${pulseColor})`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute flex items-center justify-center shadow-xl border border-pink-100"
          style={{
            left: node.x - 75,
            top: node.y - 30,
            width: 150,
            height: 60,
            background: nodeColor,
            color: textColor,
            borderRadius: 15,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {node.label ?? node.id}
        </div>
      ))}
    </div>
  );
}
