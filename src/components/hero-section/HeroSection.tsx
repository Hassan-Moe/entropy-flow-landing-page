"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";

interface TimelineNode {
  id: number;
  position: number; // 0-100 percentage along timeline
  verticalOffset: number; // pixels
  timestamp: string;
  size: number; // 8 or 10
  glowIntensity: number; // 0.2 or 0.4
}

const nodes: TimelineNode[] = [
  {
    id: 1,
    position: 15,
    verticalOffset: -12,
    timestamp: "01.24",
    size: 8,
    glowIntensity: 0.2,
  },
  {
    id: 2,
    position: 30,
    verticalOffset: 8,
    timestamp: "03.24",
    size: 10,
    glowIntensity: 0.4,
  },
  {
    id: 3,
    position: 45,
    verticalOffset: -8,
    timestamp: "06.24",
    size: 8,
    glowIntensity: 0.2,
  },
  {
    id: 4,
    position: 60,
    verticalOffset: 15,
    timestamp: "09.24",
    size: 10,
    glowIntensity: 0.4,
  },
  {
    id: 5,
    position: 75,
    verticalOffset: -10,
    timestamp: "12.24",
    size: 8,
    glowIntensity: 0.2,
  },
];

export default function HeroSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<SVGLineElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);

  useEffect(() => {
    // Step 1: Animate timeline axis first (smoothly expand)
    if (timelineRef.current) {
      timelineRef.current.style.strokeDasharray = "400";
      timelineRef.current.style.strokeDashoffset = "400";
      timelineRef.current.style.transition = "stroke-dashoffset 1s ease-out";

      // Start timeline animation immediately
      requestAnimationFrame(() => {
        if (timelineRef.current) {
          timelineRef.current.style.strokeDashoffset = "0";
        }
      });
    }

    // Step 2: After timeline completes, show nodes one by one
    // Timeline takes 1s, so start nodes at 1.1s
    const timelineDuration = 1000;
    const nodeDelay = 100; // Start showing nodes 100ms after timeline
    const staggerDelay = 150; // Delay between each node

    nodes.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);

        // After all nodes are shown, mark as animated
        if (index === nodes.length - 1) {
          setTimeout(() => {
            setHasAnimated(true);
          }, 300);
        }
      }, timelineDuration + nodeDelay + index * staggerDelay);
    });
  }, []);

  // Calculate connection paths between nodes
  const getConnectionPath = (node1: TimelineNode, node2: TimelineNode) => {
    const x1 = (node1.position / 100) * 400;
    const y1 = node1.verticalOffset;
    const x2 = (node2.position / 100) * 400;
    const y2 = node2.verticalOffset;

    // Create a subtle curve
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 + (y2 - y1) * 0.3;

    return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  };

  return (
    <div className="relative py-36  flex items-center justify-center bg-[#0f1014] ">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
        linear-gradient(to right, #ececec 1px, transparent 1px),
        linear-gradient(to bottom, #ececec 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full ">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side: Content */}
          <div className="flex-1 flex flex-col gap-4  lg:gap-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl  font-semibold leading-tight tracking-tight text-[#ececec]">
              Record moments, reveal patterns
            </h1>

            <p className="text-lg sm:text-xl text-[#ececec]/70  leading-relaxed">
              Place events along your timeline, trace your personal history, and
              plan ahead.
            </p>

            <div className="flex justify-center lg:justify-start mt-2">
              <Button variant="primary" size="md">
                Exploring your timeline
              </Button>
            </div>
          </div>

          {/* Right side: Timeline Visualization */}
          <div className="flex-1 lg:flex-[0.8] w-full max-w-md lg:max-w-lg mx-auto">
            <div className="relative pt-5">
              <svg
                ref={svgRef}
                viewBox="0 -30 400 60"
                className="w-full h-auto"
                style={{ minHeight: "120px" }}
              >
                {/* Timeline axis */}
                <line
                  ref={timelineRef}
                  x1="0"
                  y1="0"
                  x2="400"
                  y2="0"
                  stroke="#ececec"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                />

                {/* Connection lines - only show between visible nodes */}
                {nodes.slice(0, -1).map((node, index) => {
                  const nextNode = nodes[index + 1];
                  const path = getConnectionPath(node, nextNode);
                  const isHovered =
                    hoveredNode === node.id || hoveredNode === nextNode.id;
                  const bothNodesVisible =
                    visibleNodes.includes(node.id) &&
                    visibleNodes.includes(nextNode.id);

                  return (
                    <path
                      key={`connection-${node.id}`}
                      className="connection-line"
                      d={path}
                      fill="none"
                      stroke="#1fb8d9"
                      strokeWidth={isHovered ? "1" : "0.5"}
                      strokeOpacity={
                        bothNodesVisible ? (isHovered ? 0.8 : 0.4) : 0
                      }
                      style={{
                        transition:
                          "stroke-width 0.3s ease, stroke-opacity 0.3s ease",
                      }}
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node, index) => {
                  const x = (node.position / 100) * 400;
                  const y = node.verticalOffset;
                  const isHovered = hoveredNode === node.id;
                  const baseSize = node.size / 2;
                  const hoverSize = baseSize * 1.5;

                  return (
                    <g
                      key={node.id}
                      className="node-group"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Ripple effect on first render */}
                      {!hasAnimated && (
                        <circle
                          className="node-ripple"
                          cx={x}
                          cy={y}
                          r={baseSize}
                          fill="#1fb8d9"
                          opacity="0"
                          style={{
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* Enhanced glow effect */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? node.size * 3 : node.size * 2}
                        fill="#1fb8d9"
                        opacity={
                          isHovered
                            ? node.glowIntensity * 2
                            : node.glowIntensity
                        }
                        style={{
                          filter: isHovered ? "blur(25px)" : "blur(20px)",
                          animation: isHovered
                            ? "glowIntensify 2s ease-in-out infinite"
                            : "pulse-slow 4s ease-in-out infinite",
                          transition:
                            "opacity 0.3s ease, r 0.3s ease, filter 0.3s ease",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Outer ring on hover */}
                      {isHovered && (
                        <circle
                          cx={x}
                          cy={y}
                          r={baseSize * 2.5}
                          fill="none"
                          stroke="#1fb8d9"
                          strokeWidth="1"
                          strokeOpacity="0.3"
                          style={{
                            animation: "ripple 1.5s ease-out infinite",
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* Main Node */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? hoverSize : baseSize}
                        fill="#1fb8d9"
                        className="timeline-node"
                        style={{
                          animation: hasAnimated
                            ? `float 4s ease-in-out infinite ${index * 0.5}s`
                            : `nodeEntrance 0.8s ease-out ${
                                1.2 + index * 0.15
                              }s both, float 4s ease-in-out infinite ${
                                index * 0.5
                              }s`,
                          transition: "r 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />

                      {/* Inner highlight */}
                      {isHovered && (
                        <circle
                          cx={x}
                          cy={y}
                          r={baseSize * 0.4}
                          fill="#ffffff"
                          opacity="0.4"
                          style={{
                            pointerEvents: "none",
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      )}

                      {/* Timestamp label */}
                      <text
                        x={x}
                        y={y + 20}
                        textAnchor="middle"
                        fill="#ececec"
                        opacity={isHovered ? 0.8 : 0.5}
                        fontSize={isHovered ? "11" : "10"}
                        className="timestamp-label"
                        style={{
                          animation: hasAnimated
                            ? "none"
                            : `fadeIn 0.6s ease-out ${
                                1.4 + index * 0.15
                              }s both`,
                          transition: "opacity 0.3s ease, font-size 0.3s ease",
                          pointerEvents: "none",
                        }}
                      >
                        {node.timestamp}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
