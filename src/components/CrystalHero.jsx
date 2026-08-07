import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CrystalHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    // Dark background blending with #0b0a09 of homepage
    scene.fog = new THREE.FogExp2(0x0b0a09, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 21.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Parent group for rotation
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // ==========================================
    // 2. BW MONOGRAM LOGO (Sprite in center)
    // ==========================================
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/logo.png");
    const logoMaterial = new THREE.SpriteMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.95,
    });
    const logoSprite = new THREE.Sprite(logoMaterial);
    // Logo is 1536x1024 (aspect ratio 1.5). Scale properly to avoid squeezing.
    logoSprite.scale.set(9, 6, 1);
    crystalGroup.add(logoSprite);

    // ==========================================
    // 3. FLOATING CRYSTAL (Irregular Polyhedron)
    // ==========================================
    const crystalGeo = new THREE.DodecahedronGeometry(6, 1);
    const positions = crystalGeo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positions, i);
      v.multiplyScalar(1.0 + (Math.random() - 0.5) * 0.15);
      positions.setXYZ(i, v.x, v.y, v.z);
    }
    crystalGeo.computeVertexNormals();

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.95, // Glass effect
      thickness: 2.5,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
    });

    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystalGroup.add(crystal);

    const wireframeGeo = new THREE.WireframeGeometry(crystalGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xe3ca92,
      transparent: true,
      opacity: 0.25,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    crystal.add(wireframe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc6a96b, 3.0);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x445588, 2.0);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // ==========================================
    // 4. GOLD NEURONS
    // ==========================================
    const NUM_NEURONS = 1200;
    const INNER_RADIUS = 5.2;
    const MAX_CONNECT_DIST = 1.4;

    const neurons = [];
    const neuronPositions = new Float32Array(NUM_NEURONS * 3);

    for (let i = 0; i < NUM_NEURONS; i++) {
      const r = INNER_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // Orbit coefficients
      neurons.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
      });

      neuronPositions[i * 3] = x;
      neuronPositions[i * 3 + 1] = y;
      neuronPositions[i * 3 + 2] = z;
    }

    const neuronGeo = new THREE.BufferGeometry();
    neuronGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(neuronPositions, 3)
    );

    const neuronMat = new THREE.PointsMaterial({
      color: 0xe3ca92,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const neuronPoints = new THREE.Points(neuronGeo, neuronMat);
    crystal.add(neuronPoints);

    // ==========================================
    // 5. SYNAPSE CONNECTIONS
    // ==========================================
    const MAX_LINES = 6000;
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
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    crystal.add(lines);

    const gold = new THREE.Color(0xc6a96b);
    let animationFrame;

    // ==========================================
    // 6. ANIMATION ENGINE
    // ==========================================
    function animate() {
      animationFrame = requestAnimationFrame(animate);

      // Constant automatic revolution (slowed down)
      crystal.rotation.y += 0.0015;
      crystal.rotation.x += 0.0005;

      let lineIndex = 0;
      const posAttr = neuronGeo.attributes.position;
      const linePosAttr = lineGeo.attributes.position;
      const lineColAttr = lineGeo.attributes.color;

      for (let i = 0; i < NUM_NEURONS; i++) {
        let n = neurons[i];

        n.vx += (Math.random() - 0.5) * 0.001;
        n.vy += (Math.random() - 0.5) * 0.001;
        n.vz += (Math.random() - 0.5) * 0.001;

        const speed = Math.hypot(n.vx, n.vy, n.vz);
        if (speed > 0.008) {
          n.vx = (n.vx / speed) * 0.008;
          n.vy = (n.vy / speed) * 0.008;
          n.vz = (n.vz / speed) * 0.008;
        }

        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        const distFromCenter = Math.hypot(n.x, n.y, n.z);
        if (distFromCenter > INNER_RADIUS) {
          n.vx *= -1;
          n.vy *= -1;
          n.vz *= -1;
          const scale = INNER_RADIUS / distFromCenter;
          n.x *= scale;
          n.y *= scale;
          n.z *= scale;
        }

        // Keep neurons out of the core logo
        if (distFromCenter < 1.5) {
          n.vx += (n.x / distFromCenter) * 0.01;
          n.vy += (n.y / distFromCenter) * 0.01;
          n.vz += (n.z / distFromCenter) * 0.01;
        }

        posAttr.setXYZ(i, n.x, n.y, n.z);

        for (let j = i + 1; j < NUM_NEURONS; j++) {
          if (lineIndex >= MAX_LINES) break;

          let n2 = neurons[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dz = n.z - n2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < MAX_CONNECT_DIST * MAX_CONNECT_DIST) {
            const dist = Math.sqrt(distSq);
            const opacity = 1.0 - dist / MAX_CONNECT_DIST;

            linePosAttr.setXYZ(lineIndex * 2, n.x, n.y, n.z);
            linePosAttr.setXYZ(lineIndex * 2 + 1, n2.x, n2.y, n2.z);

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

      posAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      lineGeo.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
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
      className="w-full h-[320px] sm:h-[450px] lg:h-[600px] xl:h-[700px] flex items-center justify-center relative overflow-hidden"
    />
  );
};

export default CrystalHero;
