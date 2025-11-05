'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DataFlowVisualization() {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNodes = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9));
      setActiveNodes(randomNodes);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { x: 50, y: 50, label: 'PDFs', type: 'input' },
    { x: 150, y: 30, label: 'Emails', type: 'input' },
    { x: 50, y: 150, label: 'Docs', type: 'input' },
    { x: 250, y: 90, label: 'Neural Flow', type: 'processor' },
    { x: 400, y: 30, label: 'Workflow A', type: 'output' },
    { x: 450, y: 90, label: 'Agent 1', type: 'output' },
    { x: 400, y: 150, label: 'Workflow B', type: 'output' },
    { x: 150, y: 180, label: 'APIs', type: 'input' },
    { x: 450, y: 180, label: 'Agent 2', type: 'output' },
  ];

  const connections = [
    { from: 0, to: 3 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 7, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 8 },
  ];

  return (
    <div className="relative w-full h-[500px]">
      <svg className="w-full h-full" viewBox="0 0 500 220">
        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const isActive = activeNodes.includes(i);

          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? 'url(#gradient)' : '#333'}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                stroke: isActive ? ['#667eea', '#764ba2', '#4facfe', '#667eea'] : '#333'
              }}
              transition={{
                pathLength: { duration: 1.5, ease: 'easeInOut' },
                stroke: { duration: 2, repeat: Infinity }
              }}
            />
          );
        })}

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#4facfe" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={
                node.type === 'processor'
                  ? 'url(#gradient)'
                  : node.type === 'input'
                  ? '#1a1a2e'
                  : '#0f3460'
              }
              stroke={activeNodes.includes(i) ? '#4facfe' : '#444'}
              strokeWidth="2"
              animate={{
                scale: activeNodes.includes(i) ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            />
            <text
              x={node.x}
              y={node.y + 35}
              textAnchor="middle"
              fill="#888"
              fontSize="11"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating data particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-500"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
