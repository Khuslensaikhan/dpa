"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const FIELD = {
  particleCount: 10000,
  farParticleCount: 1000,
  backgroundColor: "#0B1F3A",
  particleColor: "#ffffff",
  farParticleColor: "#ffffff",
  particleSize: 0.055,
  farParticleSize: 0.03,
  particleOpacity: 0.9,
  farParticleOpacity: 0.35,
  idleMotion: 0.045,
  cameraZ: 9,
  scrollEase: 0.08,
  introMorphDuration: 1.5,
  introHoldDuration: 2,
  introScrollExit: 0.55,
  maxPixelRatio: 2,
};

// World-space X offsets: positive moves right, negative moves left.
const SHAPE_X_OFFSETS = [3, -3, 3, -3, 3, -3, 0];

const MESH_SCENES = [
  {
    colors: ["#2FB8C6", "#0F4C5C", "#0A1830", "#1E8F5E"],
    positions: [
      [15, 20],
      [85, 15],
      [70, 80],
      [20, 85],
    ],
    sizes: [65, 60, 55, 45],
  },
  {
    colors: ["#0F4C5C", "#1E8F5E", "#2FB8C6", "#D4AD5C"],
    positions: [
      [80, 10],
      [20, 25],
      [75, 75],
      [30, 90],
    ],
    sizes: [60, 65, 50, 35],
  },
  {
    colors: ["#1E8F5E", "#2FB8C6", "#D4AD5C", "#0F4C5C"],
    positions: [
      [25, 15],
      [80, 30],
      [60, 85],
      [10, 70],
    ],
    sizes: [70, 50, 40, 55],
  },
  {
    colors: ["#D4AD5C", "#1E8F5E", "#0F4C5C", "#2FB8C6"],
    positions: [
      [50, 20],
      [15, 60],
      [85, 70],
      [40, 90],
    ],
    sizes: [45, 60, 55, 40],
  },
  {
    colors: ["#2FB8C6", "#1E8F5E", "#D4AD5C", "#0F4C5C"],
    positions: [
      [80, 30],
      [20, 45],
      [70, 85],
      [25, 80],
    ],
    sizes: [55, 50, 60, 40],
  },
  {
    colors: ["#D4AD5C", "#2FB8C6", "#1E8F5E", "#0F4C5C"],
    positions: [
      [45, 20],
      [15, 75],
      [85, 65],
      [60, 90],
    ],
    sizes: [50, 55, 45, 55],
  },
  {
    colors: ["#2FB8C6", "#0F4C5C", "#0A1830", "#1E8F5E"],
    positions: [
      [30, 30],
      [75, 20],
      [50, 80],
      [85, 90],
    ],
    sizes: [55, 50, 60, 40],
  },
] as const;

type SpherePoint = [number, number, number];

function rotatePoint(
  point: SpherePoint,
  rotateX: number,
  rotateY: number,
  rotateZ: number,
): SpherePoint {
  const [x, y, z] = point;
  const cosX = Math.cos(rotateX);
  const sinX = Math.sin(rotateX);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;

  const cosY = Math.cos(rotateY);
  const sinY = Math.sin(rotateY);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;

  const cosZ = Math.cos(rotateZ);
  const sinZ = Math.sin(rotateZ);

  return [x2 * cosZ - y1 * sinZ, x2 * sinZ + y1 * cosZ, z2];
}

function spherePoint(theta: number, phi: number, radius: number): SpherePoint {
  const ringRadius = Math.cos(phi) * radius;

  return [
    Math.cos(theta) * ringRadius,
    Math.sin(phi) * radius,
    Math.sin(theta) * ringRadius,
  ];
}

function setSpherePoint(
  pos: Float32Array,
  index: number,
  point: SpherePoint,
  jitter = 0,
) {
  const offset = index * 3;

  pos[offset] = point[0] + (Math.random() - 0.5) * jitter;
  pos[offset + 1] = point[1] + (Math.random() - 0.5) * jitter;
  pos[offset + 2] = point[2] + (Math.random() - 0.5) * jitter;
}
function distSq(a: SpherePoint, b: SpherePoint) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];

  return dx * dx + dy * dy + dz * dz;
}

function fibonacciSpherePoint(
  index: number,
  total: number,
  radius: number,
): SpherePoint {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * index;

  return [
    Math.cos(theta) * ringRadius * radius,
    y * radius,
    Math.sin(theta) * ringRadius * radius,
  ];
}
function shapeNeuralCore(count: number) {
  const pos = new Float32Array(count * 3);
  const radius = 4.2;
  const nodeCount = 42;
  const edgesPerNode = 3;
  const hubJitterRadius = 0.16;
  const edgeJitter = 0.028;

  // Evenly distributed hub nodes across the sphere surface.
  const nodes: SpherePoint[] = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push(fibonacciSpherePoint(i, nodeCount, radius));
  }

  // Connect each hub to its nearest neighbors, deduped so A-B isn't added twice.
  const edgeKeys = new Set<string>();
  const edges: Array<[SpherePoint, SpherePoint]> = [];

  for (let i = 0; i < nodeCount; i++) {
    const neighbors = nodes
      .map((n, j) => ({ j, d: j === i ? Infinity : distSq(nodes[i], n) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, edgesPerNode);

    for (const { j } of neighbors) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;

      if (!edgeKeys.has(key)) {
        edgeKeys.add(key);
        edges.push([nodes[i], nodes[j]]);
      }
    }
  }

  // Budget split: most particles fill the sphere's volume, the rest form the
  // hub clusters and connecting lines on top of that fill.
  const fillShare = 0.55;
  const hubShare = 0.16;
  const fillCount = Math.floor(count * fillShare);
  const hubCount = Math.floor(count * hubShare);

  for (let i = 0; i < count; i++) {
    if (i < fillCount) {
      // Volumetric fill: denser near the surface, thinning toward the core,
      // so the sphere reads as solid rather than hollow.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.asin(Math.random() * 2 - 1);
      const fillRadius = radius * Math.pow(Math.random(), 0.42);
      const point = spherePoint(theta, phi, fillRadius);

      pos[i * 3] = point[0] + (Math.random() - 0.5) * 0.05;
      pos[i * 3 + 1] = point[1] + (Math.random() - 0.5) * 0.05;
      pos[i * 3 + 2] = point[2] + (Math.random() - 0.5) * 0.05;
      continue;
    }

    if (i < fillCount + hubCount) {
      // Small dense cluster around a hub, cycling through nodes for even coverage.
      const node = nodes[i % nodeCount];
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.asin(Math.random() * 2 - 1);
      const jitterRadius = hubJitterRadius * Math.pow(Math.random(), 0.5);
      const point = spherePoint(theta, phi, jitterRadius);

      pos[i * 3] = node[0] + point[0];
      pos[i * 3 + 1] = node[1] + point[1];
      pos[i * 3 + 2] = node[2] + point[2];
      continue;
    }

    // Particles traced along hub-to-hub connections, forming the "network" lines.
    const edge = edges[i % edges.length];
    const [start, end] = edge;
    const t = Math.random();

    // Slight bow outward so lines feel like they hug the sphere rather than
    // cutting straight through its interior.
    const bow = Math.sin(t * Math.PI) * 0.12;
    const midLift = 1 + bow / radius;

    const baseX = start[0] + (end[0] - start[0]) * t;
    const baseY = start[1] + (end[1] - start[1]) * t;
    const baseZ = start[2] + (end[2] - start[2]) * t;

    pos[i * 3] =
      baseX * (t > 0 && t < 1 ? midLift : 1) +
      (Math.random() - 0.5) * edgeJitter;
    pos[i * 3 + 1] =
      baseY * (t > 0 && t < 1 ? midLift : 1) +
      (Math.random() - 0.5) * edgeJitter;
    pos[i * 3 + 2] =
      baseZ * (t > 0 && t < 1 ? midLift : 1) +
      (Math.random() - 0.5) * edgeJitter;
  }

  return pos;
}

function shapeDatabaseCylinder(count: number) {
  const pos = new Float32Array(count * 3);
  const radius = 3.15;
  const height = 6.4;
  const bands = 28;

  for (let i = 0; i < count; i++) {
    const band = i % bands;
    const theta = Math.random() * Math.PI * 2;
    const y = (band / (bands - 1) - 0.5) * height;
    const edgeJitter = (Math.random() - 0.5) * 0.12;

    pos[i * 3] = Math.cos(theta) * (radius + edgeJitter);
    pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.055;
    pos[i * 3 + 2] = Math.sin(theta) * (radius + edgeJitter);
  }

  return pos;
}

function shapeBeehive(count: number) {
  const pos = new Float32Array(count * 3);
  const cellRadius = 0.55;
  const columns = 9;
  const rows = 9;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(Math.random() * rows) - (rows - 1) / 2;
    const column = Math.floor(Math.random() * columns) - (columns - 1) / 2;
    const centerX = Math.sqrt(3) * cellRadius * (column + (row & 1 ? 0.5 : 0));
    const centerY = cellRadius * 1.5 * row;
    const side = Math.floor(Math.random() * 6);
    const t = Math.random();
    const start = side * (Math.PI / 3) + Math.PI / 6;
    const end = (side + 1) * (Math.PI / 3) + Math.PI / 6;
    const x =
      centerX + cellRadius * ((1 - t) * Math.cos(start) + t * Math.cos(end));
    const y =
      centerY + cellRadius * ((1 - t) * Math.sin(start) + t * Math.sin(end));

    pos[i * 3] = x + (Math.random() - 0.5) * 0.035;
    pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.035;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.75;
  }

  return pos;
}

function shapeSpiderWeb(count: number) {
  const pos = new Float32Array(count * 3);
  const spokes = 18;
  const maxRadius = 4.8;

  for (let i = 0; i < count; i++) {
    const onSpoke = i % 3 === 0;
    const radius = Math.pow(Math.random(), 0.7) * maxRadius;
    const angle = onSpoke
      ? Math.floor(Math.random() * spokes) * ((Math.PI * 2) / spokes)
      : Math.random() * Math.PI * 2;
    const ringWave = onSpoke ? 0 : Math.sin(radius * 5.8) * 0.12;
    const jitter = (Math.random() - 0.5) * 0.055;

    pos[i * 3] = Math.cos(angle) * (radius + ringWave) + jitter;
    pos[i * 3 + 1] = Math.sin(angle) * (radius + ringWave) + jitter;
    pos[i * 3 + 2] = Math.sin(angle * 3 + radius) * 0.18;
  }

  return pos;
}

function shapeTreeRings(count: number) {
  const pos = new Float32Array(count * 3);
  const rings = 24;

  for (let i = 0; i < count; i++) {
    const ring = Math.floor(Math.random() * rings);
    const angle = Math.random() * Math.PI * 2;
    const baseRadius = 0.28 + ring * 0.19;
    const grain =
      Math.sin(angle * 3 + ring * 0.7) * 0.16 + Math.sin(angle * 7) * 0.06;
    const radius = baseRadius + grain + (Math.random() - 0.5) * 0.035;

    pos[i * 3] = Math.cos(angle) * radius * 1.12;
    pos[i * 3 + 1] = Math.sin(angle) * radius * 0.86;
    pos[i * 3 + 2] = Math.sin(angle * 4 + ring) * 0.15;
  }

  return pos;
}

type TunnelSegment = {
  start: [number, number, number];
  end: [number, number, number];
  width: number;
};

function shapeAntColony(count: number) {
  const pos = new Float32Array(count * 3);
  const tunnels: TunnelSegment[] = [
    { start: [0, 3.4, 0], end: [-0.1, 1.7, 0.1], width: 0.18 },
    { start: [-0.1, 1.7, 0.1], end: [0.3, 0.1, -0.15], width: 0.22 },
    { start: [0.3, 0.1, -0.15], end: [-0.2, -2.6, 0.12], width: 0.28 },
    { start: [-0.1, 1.7, 0.1], end: [-2.8, 2.6, 0.35], width: 0.16 },
    { start: [-0.1, 1.7, 0.1], end: [2.6, 2.35, -0.25], width: 0.16 },
    { start: [0.3, 0.1, -0.15], end: [-3.6, -0.55, 0.25], width: 0.2 },
    { start: [0.3, 0.1, -0.15], end: [3.35, -0.85, -0.35], width: 0.2 },
    { start: [-0.2, -2.6, 0.12], end: [-2.1, -3.7, 0.15], width: 0.18 },
    { start: [-0.2, -2.6, 0.12], end: [2.45, -3.5, -0.1], width: 0.18 },
  ];
  const chambers: Array<[number, number, number, number]> = [
    [-0.1, 1.7, 0.1, 0.55],
    [0.3, 0.1, -0.15, 0.72],
    [-0.2, -2.6, 0.12, 0.62],
  ];

  for (let i = 0; i < count; i++) {
    if (i % 4 === 0) {
      const [x, y, z, radius] = chambers[i % chambers.length];
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * radius;

      pos[i * 3] = x + Math.cos(angle) * distance;
      pos[i * 3 + 1] = y + Math.sin(angle) * distance * 0.72;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.32;
      continue;
    }

    const tunnel = tunnels[i % tunnels.length];
    const t = Math.random();
    const width = tunnel.width * (0.6 + Math.random() * 0.7);

    pos[i * 3] =
      tunnel.start[0] +
      (tunnel.end[0] - tunnel.start[0]) * t +
      (Math.random() - 0.5) * width;
    pos[i * 3 + 1] =
      tunnel.start[1] +
      (tunnel.end[1] - tunnel.start[1]) * t +
      (Math.random() - 0.5) * width;
    pos[i * 3 + 2] =
      tunnel.start[2] +
      (tunnel.end[2] - tunnel.start[2]) * t +
      (Math.random() - 0.5) * width;
  }

  return pos;
}
function shapeTree(count: number) {
  const pos = new Float32Array(count * 3);
  const trunkBottom: [number, number] = [-4.85, -5.1];
  const trunkShoulder: [number, number] = [-3.35, -0.6];
  const jitter = (amount: number) => (Math.random() - 0.5) * amount;
  type TreePath = {
    start: [number, number];
    control: [number, number];
    end: [number, number];
    width: number;
  };
  type LeafCluster = {
    center: [number, number];
    radius: number;
    angle: number;
  };
  const branches: TreePath[] = [
    {
      start: [-3.7, -2.1],
      control: [-2.2, 0.1],
      end: [-1.5, 2.35],
      width: 0.2,
    },
    {
      start: [-3.4, -1.35],
      control: [-1.65, 0.9],
      end: [0.3, 3.65],
      width: 0.18,
    },
    {
      start: [-3.25, -0.55],
      control: [-1.15, 0.25],
      end: [2.1, 2.95],
      width: 0.2,
    },
    {
      start: [-3.1, 0.15],
      control: [-0.65, 0.75],
      end: [3.8, 2.2],
      width: 0.16,
    },
    {
      start: [-3.05, 0.75],
      control: [-0.95, 1.7],
      end: [2.9, 4.15],
      width: 0.16,
    },
    {
      start: [-3.1, 1.25],
      control: [-1.7, 2.6],
      end: [-0.75, 4.55],
      width: 0.14,
    },
    {
      start: [-2.95, -0.1],
      control: [0.05, 0.25],
      end: [4.9, 1.25],
      width: 0.13,
    },
  ];
  const twigs: TreePath[] = [
    {
      start: [-1.95, 1.15],
      control: [-1.7, 2.2],
      end: [-2.3, 3.45],
      width: 0.075,
    },
    {
      start: [-1.7, 1.72],
      control: [-0.55, 2.2],
      end: [0.35, 4.55],
      width: 0.075,
    },
    {
      start: [-0.72, 1.95],
      control: [0.55, 2.2],
      end: [1.9, 4.3],
      width: 0.07,
    },
    {
      start: [0.45, 2.35],
      control: [1.85, 2.25],
      end: [3.75, 3.15],
      width: 0.07,
    },
    {
      start: [1.1, 2.55],
      control: [2.7, 2.8],
      end: [4.65, 2.45],
      width: 0.065,
    },
    { start: [1.9, 2.65], control: [3.45, 1.9], end: [5.25, 1.7], width: 0.06 },
    {
      start: [-2.65, 0.5],
      control: [-1.7, 0.6],
      end: [-0.05, 1.35],
      width: 0.065,
    },
    {
      start: [-2.55, 1.0],
      control: [-1.4, 1.85],
      end: [-2.65, 2.65],
      width: 0.06,
    },
    {
      start: [-3.05, 1.5],
      control: [-2.3, 2.7],
      end: [-1.8, 4.3],
      width: 0.06,
    },
    {
      start: [-2.9, -0.4],
      control: [-1.2, -0.35],
      end: [1.2, 0.7],
      width: 0.06,
    },
    {
      start: [0.85, 2.55],
      control: [0.95, 3.35],
      end: [0.45, 4.7],
      width: 0.06,
    },
  ];
  const rootSegments: TreePath[] = [
    {
      start: [-4.8, -4.55],
      control: [-4.2, -4.75],
      end: [-2.6, -5.05],
      width: 0.14,
    },
    {
      start: [-4.55, -4.6],
      control: [-5.05, -4.35],
      end: [-6.1, -4.0],
      width: 0.12,
    },
    {
      start: [-4.75, -4.35],
      control: [-4.8, -3.8],
      end: [-5.55, -3.1],
      width: 0.09,
    },
  ];
  const leafClusters: LeafCluster[] = [
    { center: [-2.45, 3.75], radius: 0.62, angle: -0.8 },
    { center: [-1.55, 4.2], radius: 0.74, angle: -0.35 },
    { center: [-0.35, 4.35], radius: 0.7, angle: 0.1 },
    { center: [0.7, 4.65], radius: 0.78, angle: 0.55 },
    { center: [1.95, 4.15], radius: 0.75, angle: 0.75 },
    { center: [3.15, 3.55], radius: 0.68, angle: 0.45 },
    { center: [4.25, 3.05], radius: 0.62, angle: 0.15 },
    { center: [4.75, 2.15], radius: 0.58, angle: -0.35 },
    { center: [4.45, 1.05], radius: 0.72, angle: -0.65 },
    { center: [3.35, 1.2], radius: 0.62, angle: -0.9 },
    { center: [2.1, 2.55], radius: 0.62, angle: 0.35 },
    { center: [0.9, 3.15], radius: 0.68, angle: 0.8 },
    { center: [-0.65, 2.8], radius: 0.64, angle: 1.05 },
    { center: [-1.95, 2.7], radius: 0.6, angle: 1.35 },
    { center: [-2.8, 1.85], radius: 0.56, angle: 1.8 },
    { center: [-1.05, 0.8], radius: 0.55, angle: -1.4 },
    { center: [0.45, 0.95], radius: 0.58, angle: -0.8 },
    { center: [1.85, 1.25], radius: 0.58, angle: -0.35 },
  ];
  const setPoint = (index: number, x: number, y: number, z = 0) => {
    pos[index * 3] = x;
    pos[index * 3 + 1] = y;
    pos[index * 3 + 2] = z + Math.sin((x + y) * 1.3) * 0.08;
  };
  const segmentPoint = (segment: TreePath, t: number) => {
    const inverseT = 1 - t;

    return {
      x:
        inverseT * inverseT * segment.start[0] +
        2 * inverseT * t * segment.control[0] +
        t * t * segment.end[0],
      y:
        inverseT * inverseT * segment.start[1] +
        2 * inverseT * t * segment.control[1] +
        t * t * segment.end[1],
    };
  };
  const leafPoint = (cluster: LeafCluster) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * cluster.radius;
    const width = cluster.radius * 0.8;
    const localX = Math.cos(angle) * distance * width;
    const localY = Math.sin(angle) * distance;

    return {
      x:
        cluster.center[0] +
        localX * Math.cos(cluster.angle) -
        localY * Math.sin(cluster.angle),
      y:
        cluster.center[1] +
        localX * Math.sin(cluster.angle) +
        localY * Math.cos(cluster.angle),
    };
  };

  for (let i = 0; i < count; i++) {
    const section = i % 32;

    // The trunk enters from the viewer's lower-left, so the canopy feels close.
    if (section < 7) {
      const t = Math.random();
      const point = segmentPoint(
        {
          start: trunkBottom,
          control: [-4.4, -2.5],
          end: trunkShoulder,
          width: 0.8,
        },
        t,
      );
      const trunkWidth = 0.8 - t * 0.42;

      setPoint(
        i,
        point.x + jitter(trunkWidth),
        point.y + jitter(trunkWidth * 0.6),
        jitter(0.3),
      );
      continue;
    }

    if (section < 9) {
      const root =
        rootSegments[Math.floor(Math.random() * rootSegments.length)];
      const t = Math.pow(Math.random(), 0.85);
      const point = segmentPoint(root, t);

      setPoint(
        i,
        point.x + jitter(root.width),
        point.y + jitter(root.width),
        jitter(0.18),
      );
      continue;
    }

    // Large limbs and fine twigs keep the silhouette visibly branch-like.
    if (section < 21) {
      const branchPool = section < 16 ? branches : twigs;
      const branch = branchPool[Math.floor(Math.random() * branchPool.length)];
      const t = Math.pow(Math.random(), 0.82);
      const point = segmentPoint(branch, t);

      setPoint(
        i,
        point.x + jitter(branch.width),
        point.y + jitter(branch.width),
        jitter(0.24),
      );
      continue;
    }

    // Short stems connect the scattered leaf clusters back to the limbs.
    if (section < 24) {
      const twig = twigs[Math.floor(Math.random() * twigs.length)];
      const t = 0.62 + Math.random() * 0.38;
      const point = segmentPoint(twig, t);

      setPoint(i, point.x + jitter(0.11), point.y + jitter(0.11), jitter(0.26));
      continue;
    }

    // Small, separated leaf clusters read as foliage overhead instead of a blob.
    const cluster =
      leafClusters[Math.floor(Math.random() * leafClusters.length)];
    const point = leafPoint(cluster);

    setPoint(i, point.x + jitter(0.08), point.y + jitter(0.08), jitter(0.48));
  }

  return pos;
}

function shapeMilkyWay(count: number) {
  const pos = new Float32Array(count * 3);
  const coreRadius = 0.72;
  const galaxyRadius = 4.95;
  const armCount = 4;
  const tilt = 0.34;
  const depth = 0.22;
  const jitter = (amount: number) => (Math.random() - 0.5) * amount;
  const projectGalaxy = (
    index: number,
    angle: number,
    radius: number,
    thickness: number,
  ) => {
    const warp = Math.sin(angle * 2.3 + radius * 1.7) * 0.12;

    pos[index * 3] = Math.cos(angle) * radius + jitter(thickness);
    pos[index * 3 + 1] =
      Math.sin(angle) * radius * tilt + warp + jitter(thickness * 0.72);
    pos[index * 3 + 2] =
      Math.sin(angle) * radius * depth + jitter(thickness * 0.9);
  };

  for (let i = 0; i < count; i++) {
    const region = i % 18;

    // Dense galactic core.
    if (region < 4) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.42) * coreRadius;

      projectGalaxy(i, angle, radius, 0.2);
      continue;
    }

    // Main Milky Way spiral arms.
    if (region < 14) {
      const arm = Math.floor(Math.random() * armCount);
      const radiusT = Math.pow(Math.random(), 0.58);
      const radius = coreRadius + radiusT * (galaxyRadius - coreRadius);
      const baseAngle = arm * ((Math.PI * 2) / armCount);
      const winding = radius * 1.1 + Math.pow(radiusT, 1.8) * 2.2;
      const angle = baseAngle + winding + jitter(0.42 + radiusT * 0.35);
      const thickness = 0.1 + radiusT * 0.24;

      projectGalaxy(i, angle, radius, thickness);
      continue;
    }

    // Dust-lane-like cross streams through the disk.
    if (region < 16) {
      const radiusT = Math.random();
      const radius = 1 + radiusT * 3.6;
      const angle =
        Math.PI * 0.18 +
        radius * 0.8 +
        (Math.random() < 0.5 ? 0 : Math.PI) +
        jitter(0.18);

      projectGalaxy(i, angle, radius, 0.08 + radiusT * 0.12);
      continue;
    }

    // Sparse outer star halo.
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 0.48) * (galaxyRadius + 0.35);
    const haloLift = jitter(0.9) * (0.3 + radius / galaxyRadius);

    projectGalaxy(i, angle, radius, 0.22 + Math.abs(haloLift) * 0.2);
    pos[i * 3 + 1] += haloLift;
  }

  return pos;
}

function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  return new THREE.CanvasTexture(canvas);
}

function lerpShapes(
  a: Float32Array,
  b: Float32Array,
  t: number,
  out: Float32Array,
) {
  for (let i = 0; i < out.length; i++) {
    out[i] = a[i] + (b[i] - a[i]) * t;
  }
}

function offsetShape(source: Float32Array, xOffset: number) {
  const positioned = new Float32Array(source);

  for (let i = 0; i < positioned.length; i += 3) {
    positioned[i] += xOffset;
  }

  return positioned;
}

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

function getIntroMorph(elapsed: number) {
  const morphDuration = FIELD.introMorphDuration;
  const holdDuration = FIELD.introHoldDuration;
  const cycleDuration = holdDuration * 2 + morphDuration * 2;
  const cycleTime = elapsed % cycleDuration;

  if (cycleTime < holdDuration) {
    return 0;
  }

  if (cycleTime < holdDuration + morphDuration) {
    return easeInOut((cycleTime - holdDuration) / morphDuration);
  }

  if (cycleTime < holdDuration * 2 + morphDuration) {
    return 1;
  }

  return (
    1 -
    easeInOut((cycleTime - holdDuration * 2 - morphDuration) / morphDuration)
  );
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function lerpHex(a: string, b: string, t: number) {
  const start = hexToRgb(a);
  const end = hexToRgb(b);
  const red = Math.round(start[0] + (end[0] - start[0]) * t);
  const green = Math.round(start[1] + (end[1] - start[1]) * t);
  const blue = Math.round(start[2] + (end[2] - start[2]) * t);

  return `rgb(${red}, ${green}, ${blue})`;
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const meshBlobRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.z = FIELD.cameraZ;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, FIELD.maxPixelRatio),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(FIELD.backgroundColor, 0);

    const shapes = [
      shapeDatabaseCylinder(FIELD.particleCount),
      shapeBeehive(FIELD.particleCount),
      shapeSpiderWeb(FIELD.particleCount),
      shapeTreeRings(FIELD.particleCount),
      shapeAntColony(FIELD.particleCount),
      shapeTree(FIELD.particleCount),
      shapeMilkyWay(FIELD.particleCount),
    ].map((shape, index) => offsetShape(shape, SHAPE_X_OFFSETS[index]));
    const introDataSphere = offsetShape(
      shapeNeuralCore(FIELD.particleCount),
      SHAPE_X_OFFSETS[0],
    );

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(shapes[0]);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const dotTexture = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: FIELD.particleSize,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(FIELD.particleColor),
      opacity: FIELD.particleOpacity,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const farGeometry = new THREE.BufferGeometry();
    const farPosition = new Float32Array(FIELD.farParticleCount * 3);

    for (let i = 0; i < FIELD.farParticleCount; i++) {
      farPosition[i * 3] = (Math.random() - 0.5) * 30;
      farPosition[i * 3 + 1] = (Math.random() - 0.5) * 30;
      farPosition[i * 3 + 2] = (Math.random() - 0.5) * 30 - 8;
    }

    farGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(farPosition, 3),
    );

    const farTexture = makeDotTexture();
    const farMaterial = new THREE.PointsMaterial({
      size: FIELD.farParticleSize,
      map: farTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(FIELD.farParticleColor),
      opacity: FIELD.farParticleOpacity,
    });
    const farPoints = new THREE.Points(farGeometry, farMaterial);
    scene.add(farPoints);

    const segmentCount = shapes.length - 1;
    const scratch = new Float32Array(FIELD.particleCount * 3);
    const introScratch = new Float32Array(FIELD.particleCount * 3);
    const idleScratch = new Float32Array(FIELD.particleCount * 3);
    const particlePhases = new Float32Array(FIELD.particleCount);

    for (let i = 0; i < particlePhases.length; i++) {
      particlePhases[i] = Math.random() * Math.PI * 2;
    }

    const clock = new THREE.Timer();
    let animationFrame = 0;
    let scrollProgress = 0;
    let targetProgress = 0;
    let shapeProgress = 0;
    let targetShapeProgress = 0;
    let introExitProgress = 0;
    let targetIntroExit = 0;
    let cueHidden = false;
    let mouseX = 0;
    let mouseY = 0;
    const stageElements = Array.from(
      document.querySelectorAll<HTMLElement>(".particle-stage"),
    );

    const updateScrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? window.scrollY / max : 0;

      const firstStage = stageElements[0];
      const lastStage = stageElements[stageElements.length - 1];

      if (firstStage && lastStage) {
        const viewportHeight = window.innerHeight;

        // Calculate absolute document Y of the center of the first and last stages
        const firstCenter =
          firstStage.getBoundingClientRect().top +
          window.scrollY +
          firstStage.offsetHeight / 2;
        const lastCenter =
          lastStage.getBoundingClientRect().top +
          window.scrollY +
          lastStage.offsetHeight / 2;

        // Progress should be 0 when the first stage is in the middle of the viewport
        // and 1 when the last stage is in the middle of the viewport.
        const startScroll = firstCenter - viewportHeight / 2;
        const endScroll = lastCenter - viewportHeight / 2;
        const scrollDistance = endScroll - startScroll;

        targetShapeProgress =
          scrollDistance > 0
            ? Math.min(
                Math.max((window.scrollY - startScroll) / scrollDistance, 0),
                1,
              )
            : 0;

        targetIntroExit = Math.min(
          Math.max(
            window.scrollY /
              Math.max(firstStage.offsetHeight * FIELD.introScrollExit, 1),
            0,
          ),
          1,
        );
      } else {
        targetShapeProgress = targetProgress;
        targetIntroExit = Math.min(
          Math.max(
            window.scrollY /
              Math.max(window.innerHeight * FIELD.introScrollExit, 1),
            0,
          ),
          1,
        );
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScrollProgress();
    };

    const handleScroll = () => {
      updateScrollProgress();

      if (!cueHidden && window.scrollY > 40 && scrollCueRef.current) {
        scrollCueRef.current.style.opacity = "0";
        cueHidden = true;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      clock.update();
      const elapsed = clock.getElapsed();

      scrollProgress +=
        (targetProgress - scrollProgress) *
        (reduceMotion ? 1 : FIELD.scrollEase);
      shapeProgress +=
        (targetShapeProgress - shapeProgress) *
        (reduceMotion ? 1 : FIELD.scrollEase);
      introExitProgress +=
        (targetIntroExit - introExitProgress) *
        (reduceMotion ? 1 : FIELD.scrollEase * 1.6);

      const railPct = Math.min(Math.max(scrollProgress, 0), 1);

      if (railFillRef.current) {
        railFillRef.current.style.height = `${railPct * 100}%`;
      }

      const meshScaled = scrollProgress * (MESH_SCENES.length - 1);
      const meshIndex = Math.min(
        Math.max(Math.floor(meshScaled), 0),
        MESH_SCENES.length - 2,
      );
      const meshT = Math.min(Math.max(meshScaled - meshIndex, 0), 1);
      const meshEased = easeInOut(meshT);
      const meshStart = MESH_SCENES[meshIndex];
      const meshEnd = MESH_SCENES[meshIndex + 1];

      meshBlobRefs.current.forEach((blob, index) => {
        if (!blob) {
          return;
        }

        const size =
          meshStart.sizes[index] +
          (meshEnd.sizes[index] - meshStart.sizes[index]) * meshEased;
        const x =
          meshStart.positions[index][0] +
          (meshEnd.positions[index][0] - meshStart.positions[index][0]) *
            meshEased +
          Math.sin(elapsed * 0.15 + index) * 2;
        const y =
          meshStart.positions[index][1] +
          (meshEnd.positions[index][1] - meshStart.positions[index][1]) *
            meshEased +
          Math.cos(elapsed * 0.12 + index) * 2;

        blob.style.left = `${x}vw`;
        blob.style.top = `${y}vh`;
        blob.style.width = `${size}vw`;
        blob.style.height = `${size}vw`;
        blob.style.marginLeft = `${-size / 2}vw`;
        blob.style.marginTop = `${-size / 2}vw`;
        blob.style.background = lerpHex(
          meshStart.colors[index],
          meshEnd.colors[index],
          meshEased,
        );
      });

      const scaled = shapeProgress * segmentCount;
      const segmentIndex = Math.min(
        Math.max(Math.floor(scaled), 0),
        segmentCount - 1,
      );
      const localT = Math.min(Math.max(scaled - segmentIndex, 0), 1);
      const eased = localT * localT * (3 - 2 * localT);

      lerpShapes(
        shapes[segmentIndex],
        shapes[segmentIndex + 1],
        eased,
        scratch,
      );

      const introMorph = reduceMotion ? 1 : getIntroMorph(elapsed);
      const introExit = Math.min(introExitProgress, 1);

      if (introExit < 1) {
        lerpShapes(introDataSphere, shapes[0], introMorph, introScratch);
        lerpShapes(introScratch, scratch, introExit, scratch);
      }

      const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const array = attr.array as Float32Array;

      if (reduceMotion) {
        array.set(scratch);
      } else {
        for (let i = 0; i < FIELD.particleCount; i++) {
          const offset = i * 3;
          const phase = particlePhases[i];

          const baseX = scratch[offset];
          const baseY = scratch[offset + 1];
          const baseZ = scratch[offset + 2];

          const drift = FIELD.idleMotion;

          idleScratch[offset] =
            baseX + Math.sin(elapsed * 0.85 + phase + baseY * 0.4) * drift;
          idleScratch[offset + 1] =
            baseY +
            Math.cos(elapsed * 0.72 + phase * 1.3 + baseZ * 0.3) * drift * 0.8;
          idleScratch[offset + 2] =
            baseZ +
            Math.sin(elapsed * 0.64 + phase * 0.8 + baseX * 0.25) * drift;
        }

        array.set(idleScratch);
      }

      attr.needsUpdate = true;

      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.03;
      camera.position.z = FIELD.cameraZ - scrollProgress * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    updateScrollProgress();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);

      scene.remove(points);
      scene.remove(farPoints);
      geometry.dispose();
      farGeometry.dispose();
      material.dispose();
      farMaterial.dispose();
      dotTexture.dispose();
      farTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="particle-page">
      <div className="landing-mesh" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            ref={(element) => {
              meshBlobRefs.current[index] = element;
            }}
            className="landing-mesh__blob"
          />
        ))}
        <div className="landing-mesh__grain" />
        <div className="landing-mesh__veil" />
      </div>

      <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
      <div className="particle-vignette" aria-hidden="true" />
    </div>
  );
}
