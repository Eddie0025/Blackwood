import React, { useEffect, useRef } from "react";

const ResearchAnimation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let centerX, centerY;
    let nodes = [];
    let animationFrame;
    let pulseInterval;
    let initialPulseTimeout;

    const NUM_NODES = 260;
    const CONNECT_DISTANCE = 90;

    let globalAngle = 0;
    const REVOLUTION_SPEED = 0.0006; // Slow coordinated rigid revolution
    let nucleusPulse = 0;

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

    class Particle {
      constructor(r, theta, size) {
        this.r = r; // Fixed orbital distance from central node
        this.theta = theta; // Fixed relative starting angle

        // Local organic drift offsets
        this.noiseX = 0;
        this.noiseY = 0;
        this.noiseVx = (Math.random() - 0.5) * 0.1;
        this.noiseVy = (Math.random() - 0.5) * 0.1;

        this.size = size;
        this.pulseIntensity = 0;
      }

      update() {
        // 1. Coordinated rigid-body revolution coordinates
        const rotatedAngle = this.theta + globalAngle;
        const baseX = centerX + this.r * Math.cos(rotatedAngle);
        const baseY = centerY + this.r * Math.sin(rotatedAngle);

        // 2. Add local Brownian wiggle/drift
        this.noiseVx += (Math.random() - 0.5) * 0.015;
        this.noiseVy += (Math.random() - 0.5) * 0.015;

        // Speed limit for local drift
        const noiseSpeed = Math.hypot(this.noiseVx, this.noiseVy);
        if (noiseSpeed > 0.18) {
          this.noiseVx = (this.noiseVx / noiseSpeed) * 0.18;
          this.noiseVy = (this.noiseVy / noiseSpeed) * 0.18;
        }

        this.noiseX += this.noiseVx;
        this.noiseY += this.noiseVy;

        // Restrict local drift to stay clustered in relative structure
        const driftDist = Math.hypot(this.noiseX, this.noiseY);
        if (driftDist > 25) {
          this.noiseX = (this.noiseX / driftDist) * 25;
          this.noiseY = (this.noiseY / driftDist) * 25;
        }

        this.x = baseX + this.noiseX;
        this.y = baseY + this.noiseY;

        // Decay pulse propagation energy (slowed down)
        if (this.pulseIntensity > 0) {
          this.pulseIntensity -= 0.007;
        } else {
          this.pulseIntensity = 0;
        }
      }

      draw() {
        if (this.pulseIntensity > 0) {
          ctx.shadowBlur = this.pulseIntensity * 12;
          ctx.shadowColor = "#E3CA92";
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + this.pulseIntensity * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.pulseIntensity > 0 ? "#fff" : "#C6A96B";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      activate() {
        if (this.pulseIntensity > 0.1) return;
        this.pulseIntensity = 1.0;

        // Propagate to nearby nodes
        nodes.forEach((other) => {
          if (other === this) return;
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECT_DISTANCE) {
            setTimeout(() => {
              other.activate();
            }, dist * 12); // Slower propagation down the pathways
          }
        });
      }
    }

    // Initialize particles
    function initNetwork() {
      nodes = [];
      for (let i = 0; i < NUM_NODES; i++) {
        // Keplerian density curve for radial layout (scaled down slightly for container fit)
        const r = 25 + Math.pow(Math.random(), 1.3) * 180;
        const theta = Math.random() * 2 * Math.PI;
        const size = Math.random() * 1.2 + 0.6;
        nodes.push(new Particle(r, theta, size));
      }
    }

    initNetwork();

    function triggerPulse() {
      nucleusPulse = 1.0;
      // Trigger radial activation paths (slower propagation)
      nodes.forEach((p) => {
        setTimeout(() => {
          p.activate();
        }, p.r * 6.5);
      });
    }

    // Fire the first pulse almost immediately
    initialPulseTimeout = setTimeout(triggerPulse, 1500);

    // Subsequent pulses fire slower
    pulseInterval = setInterval(triggerPulse, 8500);

    function animate() {
      // Faint trail for elegant coordinated arcs - changed to pitch black to match website theme
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; 
      ctx.fillRect(0, 0, width, height);

      // Coordinated revolution angle increment
      globalAngle += REVOLUTION_SPEED;

      // ==========================================
      // 1. DYNAMIC NEURAL SYNAPSE CONNECTIONS
      // ==========================================
      ctx.lineWidth = 0.45;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Also draw a line to the center nucleus if close
        const distToCenter = Math.hypot(n1.x - centerX, n1.y - centerY);
        if (distToCenter < CONNECT_DISTANCE) {
          const opacity = 1 - distToCenter / CONNECT_DISTANCE;
          const isCenterActive = nucleusPulse > 0 || n1.pulseIntensity > 0;
          ctx.strokeStyle = isCenterActive
            ? `rgba(227, 202, 146, ${opacity * 0.45})`
            : `rgba(198, 169, 107, ${opacity * 0.12})`;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(n1.x, n1.y);
          ctx.stroke();
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.hypot(dx, dy);

          // Synapses form, fade, and break dynamically
          if (dist < CONNECT_DISTANCE) {
            const opacity = 1 - dist / CONNECT_DISTANCE;
            const isSynapseActive = n1.pulseIntensity > 0 || n2.pulseIntensity > 0;

            ctx.strokeStyle = isSynapseActive
              ? `rgba(227, 202, 146, ${opacity * 0.45})`
              : `rgba(198, 169, 107, ${opacity * 0.15})`;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Draw moving electrical signal packets along active synapses
            if (n1.pulseIntensity > 0 && n1.pulseIntensity < 0.95) {
              const progress = 1 - n1.pulseIntensity;
              const pulseX = n1.x + (n2.x - n1.x) * progress;
              const pulseY = n1.y + (n2.y - n1.y) * progress;

              ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.1, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // ==========================================
      // 2. UPDATE & DRAW CENTRAL NUCLEUS NODE
      // ==========================================
      if (nucleusPulse > 0) {
        ctx.shadowBlur = nucleusPulse * 20;
        ctx.shadowColor = "#E3CA92";
        nucleusPulse -= 0.007; // Slowed down core decay
      } else {
        nucleusPulse = 0;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 5.0 + nucleusPulse * 2.0, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.shadowBlur = 0;

      // ==========================================
      // 3. UPDATE & DRAW SWARM NODES
      // ==========================================
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
      }

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
      clearTimeout(initialPulseTimeout);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[450px] lg:h-[500px] flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" style={{ backgroundColor: "#000000" }} />
    </div>
  );
};

export default ResearchAnimation;
