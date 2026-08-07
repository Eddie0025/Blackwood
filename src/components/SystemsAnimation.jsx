import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SystemsAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    // Dark background blending with #000000
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Parent group for auto-revolution
    const systemsGroup = new THREE.Group();
    scene.add(systemsGroup);

    // ==========================================
    // 1. FLOATING SPHERE (Outer Glass & Gold Shell)
    // ==========================================
    const SPHERE_RADIUS = 7;

    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.03,
      depthWrite: false,
    });
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(SPHERE_RADIUS, 64, 64),
      sphereMat
    );
    systemsGroup.add(sphere);

    const shellGeo = new THREE.SphereGeometry(SPHERE_RADIUS + 0.05, 32, 32);
    const shellMat = new THREE.LineBasicMaterial({
      color: 0xc6a96b,
      transparent: true,
      opacity: 0.15,
    });
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(shellGeo),
      shellMat
    );
    systemsGroup.add(shell);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xc6a96b, 2.0);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // ==========================================
    // 2. COMPUTATIONAL AI TARGET GENERATION
    // ==========================================
    const NUM_PARTICLES = 1600;
    const INNER_RADIUS = 6.8;
    const MAX_CONNECT_DIST = 1.3;

    const targetShapes = {
      torusKnot: [], // Shape 1: Cool twisted torus knot
      nestedCubes: [], // Shape 2: Nested hyper-cubes
      denseCrystal: [], // Shape 3: Highly dense faceted crystal
    };

    // A. Shape 1: TORUS KNOT (Trefoil Knot - complex weaving loop)
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const p = (i / NUM_PARTICLES) * 2 * Math.PI * 3; // Spiral wraps
      const q = 2; // Knot parameters
      const r = 1.8; // Scale

      const x = r * (2 + Math.cos(q * p)) * Math.cos(3 * p);
      const y = r * (2 + Math.cos(q * p)) * Math.sin(3 * p);
      const z = r * Math.sin(q * p) * 1.5;

      const d = 0.15;
      targetShapes.torusKnot.push(
        new THREE.Vector3(
          x + (Math.random() - 0.5) * d,
          y + (Math.random() - 0.5) * d,
          z + (Math.random() - 0.5) * d
        )
      );
    }

    // B. Shape 2: NESTED HYPER-CUBES
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const isOuter = i < NUM_PARTICLES * 0.6;
      const size = isOuter ? 4.5 : 2.25;
      const face = i % 6;

      const u = (Math.random() - 0.5) * size;
      const v = (Math.random() - 0.5) * size;
      const limit = size / 2;

      let x, y, z;
      if (face === 0) {
        x = limit;
        y = u;
        z = v;
      } else if (face === 1) {
        x = -limit;
        y = u;
        z = v;
      } else if (face === 2) {
        x = u;
        y = limit;
        z = v;
      } else if (face === 3) {
        x = u;
        y = -limit;
        z = v;
      } else if (face === 4) {
        x = u;
        y = v;
        z = limit;
      } else {
        x = u;
        y = v;
        z = -limit;
      }

      targetShapes.nestedCubes.push(new THREE.Vector3(x, y, z));
    }

    // C. Shape 3: DENSE FACETED CRYSTAL (Icosahedron with internal depth density)
    const tempIcosa = new THREE.IcosahedronGeometry(4.0, 1); // 80 triangular facets
    const icosaPositions = tempIcosa.attributes.position;
    const faces = [];
    for (let i = 0; i < icosaPositions.count; i += 3) {
      faces.push([
        new THREE.Vector3().fromBufferAttribute(icosaPositions, i),
        new THREE.Vector3().fromBufferAttribute(icosaPositions, i + 1),
        new THREE.Vector3().fromBufferAttribute(icosaPositions, i + 2),
      ]);
    }
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const face = faces[i % faces.length];
      const r1 = Math.random();
      const r2 = Math.random();
      const sqrtR1 = Math.sqrt(r1);
      const a = 1 - sqrtR1;
      const b = sqrtR1 * (1 - r2);
      const c = r2 * sqrtR1;

      const pos = face[0]
        .clone()
        .multiplyScalar(a)
        .add(face[1].clone().multiplyScalar(b))
        .add(face[2].clone().multiplyScalar(c));

      const depth = 0.5 + Math.random() * 0.5;
      pos.multiplyScalar(depth);

      targetShapes.denseCrystal.push(pos);
    }

    const SHAPE_NAMES = ["torusKnot", "nestedCubes", "denseCrystal"];
    let currentShapeIdx = 0;

    const particles = [];
    const positions = new Float32Array(NUM_PARTICLES * 3);

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const r = INNER_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        vz: (Math.random() - 0.5) * 0.05,
        wanderVx: (Math.random() - 0.5) * 0.02,
        wanderVy: (Math.random() - 0.5) * 0.02,
        wanderVz: (Math.random() - 0.5) * 0.02,
      });
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xe3ca92,
      size: 0.065,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    systemsGroup.add(particleSystem);

    // ==========================================
    // 3. SYNAPSES (Connections)
    // ==========================================
    const MAX_LINES = 10000;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    systemsGroup.add(lines);

    const gold = new THREE.Color(0xc6a96b);
    const clock = new THREE.Clock();
    let lastPhase = "wander";
    let animationFrame;

    function animate() {
      animationFrame = requestAnimationFrame(animate);

      // Coordinated rigid revolution
      systemsGroup.rotation.y += 0.002;
      systemsGroup.rotation.x += 0.0005;

      const t = clock.getElapsedTime();
      const cycle = t % 12.0;
      let phase = "wander";

      if (cycle >= 4.0 && cycle < 7.0) {
        phase = "organize";
      } else if (cycle >= 7.0 && cycle < 9.5) {
        phase = "network";
      } else if (cycle >= 9.5) {
        phase = "collapse";
      }

      if (phase === "wander" && lastPhase === "collapse") {
        currentShapeIdx = (currentShapeIdx + 1) % SHAPE_NAMES.length;
      }

      let lineIndex = 0;
      const posAttr = particleGeo.attributes.position;
      const linePosAttr = lineGeo.attributes.position;
      const lineColAttr = lineGeo.attributes.color;

      const isFirstFrameOfCollapse =
        phase === "collapse" && lastPhase !== "collapse";
      lastPhase = phase;

      const shapeName = SHAPE_NAMES[currentShapeIdx];
      const activeTargets = targetShapes[shapeName];

      for (let i = 0; i < NUM_PARTICLES; i++) {
        let p = particles[i];
        const target = activeTargets[i];

        if (phase === "wander") {
          p.wanderVx += (Math.random() - 0.5) * 0.002;
          p.wanderVy += (Math.random() - 0.5) * 0.002;
          p.wanderVz += (Math.random() - 0.5) * 0.002;

          const speed = Math.hypot(p.wanderVx, p.wanderVy, p.wanderVz);
          if (speed > 0.015) {
            p.wanderVx = (p.wanderVx / speed) * 0.015;
            p.wanderVy = (p.wanderVy / speed) * 0.015;
            p.wanderVz = (p.wanderVz / speed) * 0.015;
          }

          p.x += p.wanderVx;
          p.y += p.wanderVy;
          p.z += p.wanderVz;
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.vz *= 0.9;
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
        } else if (phase === "organize") {
          const lerpFactor = 0.045;
          p.x += (target.x - p.x) * lerpFactor;
          p.y += (target.y - p.y) * lerpFactor;
          p.z += (target.z - p.z) * lerpFactor;
        } else if (phase === "network") {
          p.x = target.x + (Math.random() - 0.5) * 0.02;
          p.y = target.y + (Math.random() - 0.5) * 0.02;
          p.z = target.z + (Math.random() - 0.5) * 0.02;
        } else if (phase === "collapse") {
          if (isFirstFrameOfCollapse) {
            const dist = Math.hypot(p.x, p.y, p.z) || 1;
            const force = 0.35 + Math.random() * 0.2;
            p.vx = (p.x / dist) * force;
            p.vy = (p.y / dist) * force;
            p.vz = (p.z / dist) * force;
          }
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.vz *= 0.95;
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
        }

        const distFromCenter = Math.hypot(p.x, p.y, p.z);
        if (distFromCenter > INNER_RADIUS) {
          p.vx *= -0.5;
          p.vy *= -0.5;
          p.vz *= -0.5;
          p.wanderVx *= -1;
          p.wanderVy *= -1;
          p.wanderVz *= -1;
          const scale = INNER_RADIUS / distFromCenter;
          p.x *= scale;
          p.y *= scale;
          p.z *= scale;
        }

        posAttr.setXYZ(i, p.x, p.y, p.z);

        // Draw connections
        if (phase === "organize" || phase === "network") {
          for (let j = i + 1; j < NUM_PARTICLES; j++) {
            if (lineIndex >= MAX_LINES) break;
            let p2 = particles[j];

            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dz = p.z - p2.z;
            const distSq = dx * dx + dy * dy + dz * dz;

            let limit = MAX_CONNECT_DIST;
            if (shapeName === "torusKnot") limit = 1.0;
            else if (shapeName === "nestedCubes") limit = 1.4;
            else if (shapeName === "denseCrystal") limit = 1.1;

            if (distSq < limit * limit) {
              const dist = Math.sqrt(distSq);
              const opacity = (1.0 - dist / limit) * 0.45;

              linePosAttr.setXYZ(lineIndex * 2, p.x, p.y, p.z);
              linePosAttr.setXYZ(lineIndex * 2 + 1, p2.x, p2.y, p2.z);

              lineColAttr.setXYZ(
                lineIndex * 2,
                gold.r * opacity,
                gold.g * opacity,
                gold.b * opacity
              );
              lineColAttr.setXYZ(
                lineIndex * 2 + 1,
                gold.r * opacity,
                gold.g * opacity,
                gold.b * opacity
              );

              lineIndex++;
            }
          }
        }
      }

      posAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      lineGeo.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[450px] lg:h-[500px] flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    />
  );
};

export default SystemsAnimation;
