"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import PositionNode from "./PositionNode";
import DetailPanel from "./DetailPanel";
import SearchOverlay from "./SearchOverlay";
import Navbar from "./Navbar";
import LegendPanel from "./LegendPanel";
import { useTheme } from "./ThemeProvider";
import { positions, Position, getPositionById } from "@/data/positions";
import { edges as edgeData } from "@/data/edges";

// Layout with Dagre
const nodeWidth = 270;
const nodeHeight = 90;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 80, ranksep: 120 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const pos = dagreGraph.node(node.id);
      return {
        ...node,
        position: { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 },
      };
    }),
    edges,
  };
};

// Build nodes from data
const processedNodes: Node[] = positions.map((p) => ({
  id: p.id,
  type: "position",
  position: { x: 0, y: 0 },
  data: {
    title: p.title,
    subtitle: p.subtitle,
    icon: p.icon,
    color: p.color,
    tier: p.tier,
    branch: p.branch,
    appointedBy: p.appointedBy,
  },
}));

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  processedNodes,
  edgeData
);

const nodeTypes = { position: PositionNode };

function TreeOfPowerInner() {
  const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const reactFlowInstance = useReactFlow();

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSelectedPosition(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const pos = getPositionById(node.id);
    if (pos) setSelectedPosition(pos);
  }, []);

  const focusNode = useCallback(
    (position: Position) => {
      const node = nodes.find((n) => n.id === position.id);
      if (node && reactFlowInstance) {
        reactFlowInstance.setCenter(
          node.position.x + nodeWidth / 2,
          node.position.y + nodeHeight / 2,
          { zoom: 1.2, duration: 800 }
        );
        setSelectedPosition(position);
      }
    },
    [nodes, reactFlowInstance]
  );

  return (
    <div className="w-full h-screen relative overflow-hidden flex font-sans bg-neutral-50 dark:bg-neutral-950">
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <div className="flex-1 h-full pt-[72px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          className="bg-transparent"
          minZoom={0.2}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color={darkMode ? "#333" : "#ddd"} gap={20} />
          <Controls
            className="!bg-white/90 dark:!bg-neutral-900/90 !backdrop-blur-lg !border-neutral-200 dark:!border-neutral-800 !rounded-xl !shadow-sm"
            showInteractive={false}
          />
          <Panel position="bottom-left" className="m-4">
            <LegendPanel />
          </Panel>
        </ReactFlow>
      </div>

      {/* Detail Panel */}
      <DetailPanel
        position={selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={focusNode}
      />
    </div>
  );
}

export default function TreeOfPower() {
  return (
    <ReactFlowProvider>
      <TreeOfPowerInner />
    </ReactFlowProvider>
  );
}
