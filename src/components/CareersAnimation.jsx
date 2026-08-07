import React, { useEffect, useRef } from "react";

const CareersAnimation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let centerX, centerY;
    let animationFrame;

    // Network parameters
    const MAX_NODES = 55;
    const CONNECT_DISTANCE = 115;
    const SPAWN_INTERVAL = 300; // ms between new nodes
    let lastSpawn = 0;

    const GOLD = { r: 198, g: 169, b: 107 };
    const GOLD_DIM = { r: 140, g: 116, b: 66 };

    let nodes = [];

    function resize() {
      if (!container || !canvas) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      canvas.width = width;
      canvas.height = height;
      centerX = width / 2;
      centerY = height / 2;
    }

    resize();
    window.addEventListener("resize", resize);

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 2;
        this.alpha = 0; // Fade in
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.driftAngle = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.004 + 0.002;
        this.driftRadius = Math.random() * 12 + 6;
        this.baseX = x;
        this.baseY = y;
      }

      update() {
        // Fade in
        if (this.alpha < 1) this.alpha += 0.05;

        // Gentle orbital drift
        this.driftAngle += this.driftSpeed;
        this.x = this.baseX + Math.cos(this.driftAngle) * this.driftRadius;
        this.y = this.baseY + Math.sin(this.driftAngle) * this.driftRadius * 0.6;

        // Keep in bounds
        if (this.baseX < 40) this.baseX += 0.5;
        if (this.baseX > width - 40) this.baseX -= 0.5;
        if (this.baseY < 40) this.baseY += 0.5;
        if (this.baseY > height - 40) this.baseY -= 0.5;

        this.pulsePhase += 0.03;
      }

      draw() {
        const pulse = 0.7 + 0.3 * Math.sin(this.pulsePhase);

        // Outer glow
        const glowSize = this.size * 4;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, glowSize
        );
        gradient.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${0.2 * this.alpha * pulse})`);
        gradient.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.globalAlpha = this.alpha * pulse;
        ctx.fillStyle = `rgb(${GOLD.r}, ${GOLD.g}, ${GOLD.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.globalAlpha = this.alpha * pulse * 0.8;
        ctx.fillStyle = `rgb(255, 245, 220)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }
    }

    // Seed initial nodes
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const r = 40 + Math.random() * 70;
      nodes.push(new Node(
        (width || 500) / 2 + Math.cos(angle) * r,
        (height || 500) / 2 + Math.sin(angle) * r
      ));
    }

    function spawnNode() {
      if (nodes.length >= MAX_NODES) {
        // Remove oldest node and add a new one to keep it alive
        nodes.shift();
      }

      // Spawn near an existing node to grow the network organically
      const parent = nodes[Math.floor(Math.random() * nodes.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 50;
      let nx = parent.baseX + Math.cos(angle) * dist;
      let ny = parent.baseY + Math.sin(angle) * dist;

      // Clamp to canvas
      nx = Math.max(60, Math.min(width - 60, nx));
      ny = Math.max(60, Math.min(height - 60, ny));

      nodes.push(new Node(nx, ny));
    }

    // Pulse ripple state
    let pulseRipples = [];

    function triggerPulse(node) {
      pulseRipples.push({
        x: node.x,
        y: node.y,
        radius: 0,
        maxRadius: CONNECT_DISTANCE * 1.2,
        alpha: 0.4,
      });
    }

    // Trigger a pulse every few seconds
    let pulseTimer = 0;

    function animate(timestamp) {
      animationFrame = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, width, height);

      // Spawn new nodes periodically
      if (timestamp - lastSpawn > SPAWN_INTERVAL) {
        spawnNode();
        lastSpawn = timestamp;
      }

      // Trigger pulse ripples
      pulseTimer++;
      if (pulseTimer % 180 === 0 && nodes.length > 0) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        triggerPulse(randomNode);
      }

      // Update and draw pulse ripples
      for (let i = pulseRipples.length - 1; i >= 0; i--) {
        const ripple = pulseRipples[i];
        ripple.radius += 1.5;
        ripple.alpha *= 0.98;

        if (ripple.alpha < 0.01 || ripple.radius > ripple.maxRadius) {
          pulseRipples.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = ripple.alpha;
        ctx.strokeStyle = `rgb(${GOLD.r}, ${GOLD.g}, ${GOLD.b})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const strength = 1 - dist / CONNECT_DISTANCE;
            const alpha = strength * 0.25 * Math.min(a.alpha, b.alpha);

            ctx.globalAlpha = alpha;
            ctx.strokeStyle = `rgb(${GOLD.r}, ${GOLD.g}, ${GOLD.b})`;
            ctx.lineWidth = strength * 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (let node of nodes) {
        node.update();
        node.draw();
      }

      ctx.globalAlpha = 1;
    }

    animate(0);

    const handleResize = () => {
      resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default CareersAnimation;
