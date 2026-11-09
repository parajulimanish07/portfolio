"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Hero 3D scene: a stylised cartoon avatar working at a desk.
 * Built entirely from primitives in code (no photo, no external model file).
 * - Head follows the cursor, the whole scene has gentle parallax
 * - Drag horizontally to turn the scene; it springs back on release
 * - Pauses when off screen or when the tab is hidden; static under reduced motion
 */

const COLORS = {
  skin: "#e9b796",
  skinShade: "#dba283",
  hair: "#1b1716",
  brow: "#231c1a",
  moustache: "#4a3630",
  eye: "#2b1b14",
  mouth: "#b3564f",
  sweater: "#1f5d4c",
  sweaterDark: "#184a3d",
  pants: "#2a3350",
  shoe: "#f5f1ea",
  desk: "#e2c69c",
  deskLeg: "#44403c",
  chair: "#44403c",
  laptop: "#d6d3d1",
  laptopDark: "#57534e",
  screen: "#c7d2fe",
  indigo: "#4f46e5",
  amber: "#f59e0b",
  emerald: "#10b981",
  mug: "#4f46e5",
  pot: "#f4efe6",
  leaf: "#3f9d6b",
  halo: "#e6e2fb",
};

const LABELS: { text: string; pos: [number, number, number]; dot: string }[] = [
  { text: "React", pos: [-1.0, 1.62, -0.25], dot: "#2563eb" },
  { text: "LangGraph", pos: [0.9, 1.76, -0.35], dot: "#4f46e5" },
  { text: "NestJS", pos: [-1.08, 1.12, 0.05], dot: "#e11d48" },
  { text: "RAG", pos: [1.0, 1.2, 0.0], dot: "#10b981" },
  { text: "Next.js", pos: [0.42, 2.06, -0.5], dot: "#1c1917" },
  { text: "TypeScript", pos: [-0.5, 2.0, -0.55], dot: "#f59e0b" },
];

function makeLabelTexture(text: string, dot: string) {
  const padX = 34;
  const h = 84;
  const font = '600 38px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const probe = document.createElement("canvas").getContext("2d");
  let textW = text.length * 23;
  if (probe) {
    probe.font = font;
    textW = probe.measureText(text).width;
  }
  const w = Math.ceil(textW + padX * 2 + 30);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const r = h / 2 - 3;
    ctx.beginPath();
    ctx.roundRect(3, 3, w - 6, h - 6, r);
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#e5dfd3";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(padX, h / 2, 8, 0, Math.PI * 2);
    ctx.fillStyle = dot;
    ctx.fill();
    ctx.font = font;
    ctx.fillStyle = "#292524";
    ctx.textBaseline = "middle";
    ctx.fillText(text, padX + 22, h / 2 + 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: w / h };
}

export default function AvatarScene() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      const id = requestAnimationFrame(() => setFailed(true));
      return () => cancelAnimationFrame(id);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    const target = new THREE.Vector3(0, 0.99, 0);

    // ---------- lights ----------
    scene.add(new THREE.HemisphereLight("#fffaf0", "#cfc4b2", 1.15));
    const key = new THREE.DirectionalLight("#fff3df", 1.55);
    key.position.set(-2.6, 4.6, 3.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -2.4;
    key.shadow.camera.right = 2.4;
    key.shadow.camera.top = 2.6;
    key.shadow.camera.bottom = -1.2;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 12;
    key.shadow.bias = -0.0006;
    key.shadow.radius = 5;
    scene.add(key);
    const fill = new THREE.DirectionalLight("#dfe3ff", 0.45);
    fill.position.set(3, 2, 1.5);
    scene.add(fill);

    // ---------- helpers ----------
    const world = new THREE.Group();
    scene.add(world);
    const disposables: { dispose: () => void }[] = [];
    const mat = (color: string, roughness = 0.78, extra: THREE.MeshStandardMaterialParameters = {}) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra });
      disposables.push(m);
      return m;
    };
    const mesh = (
      parent: THREE.Object3D,
      geo: THREE.BufferGeometry,
      material: THREE.Material,
      pos: [number, number, number] = [0, 0, 0],
      shadow = true,
    ) => {
      disposables.push(geo);
      const m = new THREE.Mesh(geo, material);
      m.position.set(pos[0], pos[1], pos[2]);
      m.castShadow = shadow;
      m.receiveShadow = shadow;
      parent.add(m);
      return m;
    };
    const UP = new THREE.Vector3(0, 1, 0);
    const limb = (
      parent: THREE.Object3D,
      a: [number, number, number],
      b: [number, number, number],
      radius: number,
      material: THREE.Material,
    ) => {
      const va = new THREE.Vector3(...a);
      const vb = new THREE.Vector3(...b);
      const dir = vb.clone().sub(va);
      const len = dir.length();
      const m = mesh(parent, new THREE.CapsuleGeometry(radius, len, 8, 18), material);
      m.position.copy(va).add(vb).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(UP, dir.normalize());
      return m;
    };
    const sphere = (r: number) => new THREE.SphereGeometry(r, 36, 28);

    const M = {
      skin: mat(COLORS.skin, 0.62),
      skinShade: mat(COLORS.skinShade, 0.62),
      hair: mat(COLORS.hair, 0.5),
      brow: mat(COLORS.brow, 0.6),
      moustache: mat(COLORS.moustache, 0.7),
      eye: mat(COLORS.eye, 0.25),
      white: mat("#ffffff", 0.3, { emissive: "#ffffff", emissiveIntensity: 0.6 }),
      mouth: mat(COLORS.mouth, 0.6),
      sweater: mat(COLORS.sweater, 0.9),
      sweaterDark: mat(COLORS.sweaterDark, 0.9),
      pants: mat(COLORS.pants, 0.85),
      shoe: mat(COLORS.shoe, 0.6),
      desk: mat(COLORS.desk, 0.7),
      dark: mat(COLORS.deskLeg, 0.6),
      laptop: mat(COLORS.laptop, 0.35, { metalness: 0.35 }),
      laptopDark: mat(COLORS.laptopDark, 0.5),
      screen: mat(COLORS.screen, 0.4, { emissive: "#a5b4fc", emissiveIntensity: 0.9 }),
      indigo: mat(COLORS.indigo, 0.45),
      indigoGlow: mat(COLORS.indigo, 0.4, { emissive: COLORS.indigo, emissiveIntensity: 0.7 }),
      amber: mat(COLORS.amber, 0.45),
      emerald: mat(COLORS.emerald, 0.45),
      pot: mat(COLORS.pot, 0.8),
      leaf: mat(COLORS.leaf, 0.75),
    };

    // ---------- ground + halo ----------
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const groundGeo = new THREE.CircleGeometry(3.2, 48);
    disposables.push(groundMat, groundGeo);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    world.add(ground);

    const haloMat = new THREE.MeshBasicMaterial({ color: COLORS.halo, transparent: true, opacity: 0.95, depthWrite: false });
    const haloGeo = new THREE.CircleGeometry(1.0, 64);
    disposables.push(haloMat, haloGeo);
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.renderOrder = -1;
    scene.add(halo);

    // ---------- desk ----------
    mesh(world, new RoundedBoxGeometry(1.56, 0.06, 0.72, 4, 0.025), M.desk, [0, 0.74, 0.25]);
    for (const [x, z] of [[-0.7, -0.04], [0.7, -0.04], [-0.7, 0.54], [0.7, 0.54]] as const) {
      mesh(world, new THREE.CylinderGeometry(0.025, 0.02, 0.71, 12), M.dark, [x, 0.355, z]);
    }

    // laptop (lid on the viewer's side, screen facing the avatar)
    mesh(world, new RoundedBoxGeometry(0.4, 0.018, 0.27, 3, 0.008), M.laptop, [0, 0.78, 0.2]);
    mesh(world, new RoundedBoxGeometry(0.34, 0.004, 0.13, 2, 0.002), M.laptopDark, [0, 0.79, 0.16], false);
    const lid = new THREE.Group();
    lid.position.set(0, 0.79, 0.335);
    lid.rotation.x = 0.3;
    world.add(lid);
    mesh(lid, new RoundedBoxGeometry(0.4, 0.27, 0.014, 3, 0.007), M.laptop, [0, 0.135, 0]);
    mesh(lid, new RoundedBoxGeometry(0.37, 0.235, 0.004, 2, 0.002), M.screen, [0, 0.137, -0.008], false);
    const badge = mesh(lid, new THREE.CylinderGeometry(0.03, 0.03, 0.004, 28), M.indigoGlow, [0, 0.14, 0.008], false);
    badge.rotation.x = Math.PI / 2;
    const screenGlow = new THREE.PointLight("#a5b4fc", 0.5, 1.4, 2);
    screenGlow.position.set(0, 0.98, 0.15);
    world.add(screenGlow);

    // mug
    mesh(world, new THREE.CylinderGeometry(0.045, 0.04, 0.09, 24), M.indigo, [0.47, 0.815, 0.32]);
    const handle = mesh(world, new THREE.TorusGeometry(0.028, 0.009, 10, 20), M.indigo, [0.52, 0.815, 0.32]);
    handle.rotation.y = 0;
    mesh(world, new THREE.CylinderGeometry(0.038, 0.038, 0.004, 24), mat("#5b3a29", 0.4), [0.47, 0.858, 0.32], false);

    // plant
    mesh(world, new THREE.CylinderGeometry(0.06, 0.045, 0.1, 24), M.pot, [-0.55, 0.82, 0.12]);
    const leaves: THREE.Mesh[] = [];
    for (const [x, y, z, s] of [[0, 0.1, 0, 1], [-0.05, 0.07, 0.03, 0.8], [0.05, 0.08, -0.02, 0.85], [0.01, 0.16, 0.01, 0.7]] as const) {
      const leaf = mesh(world, sphere(0.06 * s), M.leaf, [-0.55 + x, 0.87 + y, 0.12 + z]);
      leaf.scale.set(1, 1.25, 1);
      leaves.push(leaf);
    }

    // ---------- chair ----------
    mesh(world, new RoundedBoxGeometry(0.5, 0.07, 0.46, 4, 0.03), M.dark, [0, 0.45, -0.32]);
    mesh(world, new RoundedBoxGeometry(0.46, 0.56, 0.07, 4, 0.03), M.dark, [0, 0.86, -0.57]);
    mesh(world, new THREE.CylinderGeometry(0.03, 0.03, 0.4, 12), M.dark, [0, 0.22, -0.32]);
    mesh(world, new THREE.CylinderGeometry(0.24, 0.26, 0.03, 28), M.dark, [0, 0.015, -0.32]);

    // ---------- avatar ----------
    const avatar = new THREE.Group();
    world.add(avatar);

    // legs + shoes
    for (const s of [-1, 1]) {
      limb(avatar, [0.1 * s, 0.53, -0.28], [0.12 * s, 0.53, 0.1], 0.075, M.pants);
      limb(avatar, [0.12 * s, 0.5, 0.12], [0.12 * s, 0.12, 0.16], 0.062, M.pants);
      const shoe = mesh(avatar, new RoundedBoxGeometry(0.12, 0.08, 0.22, 4, 0.035), M.shoe, [0.12 * s, 0.045, 0.22]);
      shoe.rotation.y = 0.12 * s;
    }

    // torso
    const torso = new THREE.Group();
    torso.position.set(0, 0.5, -0.3);
    avatar.add(torso);
    const body = mesh(torso, new THREE.CapsuleGeometry(0.2, 0.24, 10, 28), M.sweater, [0, 0.3, 0]);
    body.scale.set(1.28, 1, 0.92);
    const shoulders = mesh(torso, new THREE.CapsuleGeometry(0.105, 0.34, 8, 20), M.sweater, [0, 0.5, 0]);
    shoulders.rotation.z = Math.PI / 2;
    const collar = mesh(torso, new THREE.TorusGeometry(0.088, 0.03, 12, 28), M.sweaterDark, [0, 0.605, 0.01]);
    collar.rotation.x = Math.PI / 2 - 0.15;

    // arms reaching to the keyboard
    const hands: THREE.Mesh[] = [];
    for (const s of [-1, 1]) {
      limb(torso, [0.275 * s, 0.5, 0], [0.33 * s, 0.33, 0.2], 0.072, M.sweater);
      limb(torso, [0.33 * s, 0.33, 0.2], [0.13 * s, 0.335, 0.43], 0.062, M.sweater);
      const cuff = mesh(torso, new THREE.TorusGeometry(0.05, 0.02, 10, 20), M.sweaterDark, [0.125 * s, 0.335, 0.435]);
      cuff.rotation.y = -0.72 * s;
      const hand = mesh(torso, sphere(0.055), M.skin, [0.09 * s, 0.325, 0.475]);
      hand.scale.set(1, 0.72, 1.15);
      hands.push(hand);
    }

    // neck + head
    mesh(torso, new THREE.CylinderGeometry(0.07, 0.078, 0.12, 20), M.skinShade, [0, 0.66, 0.005]);
    const head = new THREE.Group();
    head.position.set(0, 0.68, 0.01);
    torso.add(head);

    const skull = mesh(head, sphere(0.24), M.skin, [0, 0.238, 0]);
    skull.scale.set(1.03, 1.08, 0.98);
    for (const s of [-1, 1]) {
      const ear = mesh(head, sphere(0.048), M.skin, [0.238 * s, 0.225, -0.005]);
      ear.scale.set(0.5, 1, 0.8);
      const inner = mesh(head, sphere(0.026), M.skinShade, [0.25 * s, 0.225, 0.004], false);
      inner.scale.set(0.4, 1, 0.7);
    }

    // hair: short sides and back, tall swept-back quiff on top
    const cap = mesh(head, new THREE.SphereGeometry(0.249, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.5), M.hair, [0, 0.252, -0.006]);
    cap.rotation.x = -0.8;
    cap.scale.set(1.02, 1.02, 1.04);
    // [x, y, z, radius, scaleX, scaleY, scaleZ, rotX, rotZ]
    const quiff: [number, number, number, number, number, number, number, number, number][] = [
      [0.0, 0.435, -0.02, 0.17, 1.3, 0.55, 1.38, -0.2, 0.0], // top mass, blends into the cap
      [0.01, 0.49, 0.115, 0.12, 1.62, 0.95, 1.0, -0.7, -0.05], // front wave lifted off the forehead
      [0.07, 0.555, 0.05, 0.095, 1.5, 0.66, 1.4, -0.45, -0.2], // sweep to one side
      [-0.1, 0.52, 0.04, 0.085, 1.3, 0.66, 1.4, -0.42, 0.28],
      [0.0, 0.41, -0.16, 0.14, 1.3, 0.7, 1.0, 0.3, 0.0], // crown
      [-0.195, 0.4, -0.04, 0.07, 0.7, 1.0, 1.7, -0.15, 0.0], // temples
      [0.195, 0.4, -0.04, 0.07, 0.7, 1.0, 1.7, -0.15, 0.0],
    ];
    for (const [x, y, z, r, sx, sy, sz, rx, rz] of quiff) {
      const lock = mesh(head, sphere(r), M.hair, [x, y, z]);
      lock.scale.set(sx, sy, sz);
      lock.rotation.set(rx, 0, rz);
    }

    // face
    const eyes: THREE.Mesh[] = [];
    for (const s of [-1, 1]) {
      const brow = mesh(head, new THREE.CapsuleGeometry(0.0165, 0.078, 6, 12), M.brow, [0.088 * s, 0.322, 0.212], false);
      brow.rotation.set(0.25, -0.32 * s, Math.PI / 2 + 0.05 * s);
      const eye = mesh(head, sphere(0.028), M.eye, [0.086 * s, 0.258, 0.214], false);
      eye.scale.set(1, 1.18, 0.6);
      eyes.push(eye);
      mesh(eye, sphere(0.008), M.white, [0.009, 0.011, 0.024], false);
      const tash = mesh(head, new THREE.CapsuleGeometry(0.0105, 0.05, 6, 10), M.moustache, [0.036 * s, 0.163, 0.229], false);
      tash.rotation.set(0, -0.2 * s, Math.PI / 2 + 0.2 * s);
    }
    const nose = mesh(head, sphere(0.031), M.skinShade, [0, 0.208, 0.238], false);
    nose.scale.set(1.05, 0.95, 0.9);
    const smileArc = Math.PI * 0.62;
    const mouth = mesh(head, new THREE.TorusGeometry(0.046, 0.0075, 8, 20, smileArc), M.mouth, [0, 0.168, 0.219], false);
    mouth.rotation.z = Math.PI + (Math.PI - smileArc) / 2;
    mouth.rotation.x = -0.12;

    // ---------- floating pieces ----------
    const floaters: { obj: THREE.Object3D; base: THREE.Vector3; phase: number; amp: number; spin: number }[] = [];
    for (let i = 0; i < LABELS.length; i++) {
      const label = LABELS[i];
      const { texture, aspect } = makeLabelTexture(label.text, label.dot);
      const sm = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      disposables.push(texture, sm);
      const sprite = new THREE.Sprite(sm);
      const hgt = 0.15;
      sprite.scale.set(hgt * aspect, hgt, 1);
      sprite.position.set(...label.pos);
      world.add(sprite);
      floaters.push({ obj: sprite, base: sprite.position.clone(), phase: i * 1.7, amp: 0.035, spin: 0 });
    }
    const shapes: [THREE.BufferGeometry, THREE.Material, [number, number, number], number][] = [
      [new THREE.TorusGeometry(0.07, 0.026, 14, 32), M.indigo, [1.12, 0.82, 0.45], 0.7],
      [new THREE.IcosahedronGeometry(0.07, 0), M.amber, [-0.98, 1.9, 0.1], 0.5],
      [new THREE.OctahedronGeometry(0.06, 0), M.emerald, [1.12, 1.48, 0.3], 0.6],
      [sphere(0.04), M.indigo, [-1.25, 1.4, -0.35], 0],
    ];
    shapes.forEach(([geo, material, pos, spin], i) => {
      const s = mesh(world, geo, material, pos);
      floaters.push({ obj: s, base: s.position.clone(), phase: 3 + i * 2.1, amp: 0.05, spin });
    });

    // ---------- sizing ----------
    const AZ = 0.42;
    const EL = 0.2;
    const resize = () => {
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      const dist = 4.45 * Math.max(1, Math.pow(1.15 / aspect, 0.95));
      camera.position.set(
        target.x + Math.sin(AZ) * Math.cos(EL) * dist,
        target.y + Math.sin(EL) * dist,
        target.z + Math.cos(AZ) * Math.cos(EL) * dist,
      );
      camera.lookAt(target);
      camera.updateProjectionMatrix();
      const back = camera.position.clone().sub(target).normalize();
      halo.position.copy(target).addScaledVector(back, -1.5).add(new THREE.Vector3(0, 0.2, 0));
      halo.lookAt(camera.position);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ---------- interaction ----------
    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (drag.active) {
        drag.yaw = THREE.MathUtils.clamp(drag.startYaw + (e.clientX - drag.startX) * 0.008, -1.1, 1.1);
      }
      if (reduceMotion) requestRender();
    };
    const drag = { active: false, startX: 0, startYaw: 0, yaw: 0 };
    const onDown = (e: PointerEvent) => {
      drag.active = true;
      drag.startX = e.clientX;
      drag.startYaw = drag.yaw;
      wrap.style.cursor = "grabbing";
    };
    const onUp = () => {
      drag.active = false;
      wrap.style.cursor = "grab";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    // ---------- animation ----------
    const clock = new THREE.Clock();
    const BASE_HEAD_YAW = 0.3;
    let raf = 0;
    let headYaw = BASE_HEAD_YAW;
    let headPitch = 0;
    let worldYaw = 0;
    let intro = reduceMotion ? 1 : 0;
    let shown = false;
    let pendingStatic = false;

    const frame = (animate: boolean) => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const k = animate ? 1 - Math.pow(0.001, dt) : 1;

      if (!drag.active) drag.yaw += (0 - drag.yaw) * (animate ? 1 - Math.pow(0.02, dt) : 0);
      const scrollYaw = Math.min(window.scrollY, 900) * 0.0005;
      worldYaw += (pointer.x * 0.14 + drag.yaw - scrollYaw - worldYaw) * k;
      world.rotation.y = worldYaw;

      headYaw += (BASE_HEAD_YAW + pointer.x * 0.5 - worldYaw * 0.6 - headYaw) * k;
      headPitch += (pointer.y * 0.26 - headPitch) * k;
      head.rotation.set(headPitch, headYaw, 0);

      if (animate) {
        intro = Math.min(1, intro + dt * 1.4);
        const e = 1 - Math.pow(1 - intro, 3);
        world.scale.setScalar(0.86 + 0.14 * e);
        world.position.y = (1 - e) * -0.18;

        const breathe = Math.sin(t * 1.6);
        body.scale.y = 1 + breathe * 0.012;
        head.position.y = 0.68 + breathe * 0.004;
        hands[0].position.y = 0.325 + Math.max(0, Math.sin(t * 9)) * 0.016;
        hands[1].position.y = 0.325 + Math.max(0, Math.sin(t * 9 + 1.9)) * 0.016;
        const blink = t % 3.6 > 3.47 ? 0.12 : 1;
        eyes[0].scale.y = eyes[1].scale.y = 1.18 * blink;
        M.screen.emissiveIntensity = 0.85 + Math.sin(t * 2.3) * 0.08;
        leaves.forEach((leaf, i) => {
          leaf.rotation.z = Math.sin(t * 1.1 + i) * 0.05;
        });
        for (const f of floaters) {
          f.obj.position.y = f.base.y + Math.sin(t * 0.9 + f.phase) * f.amp;
          f.obj.position.x = f.base.x + Math.cos(t * 0.6 + f.phase) * f.amp * 0.5;
          if (f.spin) {
            f.obj.rotation.x = t * f.spin;
            f.obj.rotation.y = t * f.spin * 0.8;
          }
        }
      }

      renderer.render(scene, camera);
      if (!shown) {
        shown = true;
        setReady(true);
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        clock.getDelta();
        return;
      }
      frame(true);
    };
    const requestRender = () => {
      if (pendingStatic) return;
      pendingStatic = true;
      requestAnimationFrame(() => {
        pendingStatic = false;
        frame(false);
      });
    };

    if (reduceMotion) {
      requestRender();
      ro.disconnect();
      const ro2 = new ResizeObserver(() => {
        resize();
        requestRender();
      });
      ro2.observe(wrap);
      disposables.push({ dispose: () => ro2.disconnect() });
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="3D cartoon avatar of Manish working at a laptop, surrounded by floating labels for React, Next.js, NestJS, TypeScript, LangGraph and RAG"
      className="relative w-full h-[330px] sm:h-[400px] lg:h-[420px] select-none cursor-grab"
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-white border border-[#e5dfd3] px-5 py-4 text-center shadow-xs">
            <p className="text-2xl font-extrabold text-stone-900">MP</p>
            <p className="text-xs font-mono text-stone-500 mt-1">3D view needs WebGL, which this browser has turned off.</p>
          </div>
        </div>
      )}
      {!failed && (
        <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider text-stone-400">
          <span className="hidden [@media(hover:hover)]:inline">Move your cursor &middot; </span>Drag to turn
        </p>
      )}
    </div>
  );
}
