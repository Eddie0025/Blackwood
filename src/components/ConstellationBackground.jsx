import React, { useEffect, useRef } from "react";

const ConstellationBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationFrame;

    // Matches the screenshot style: fewer nodes, longer lines, high contrast
    const particleCount = 18;
    const connectionDistance = 350; // Long lines forming large triangles
    const goldColor = "198, 169, 107"; // #c6a96b

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Very slow majestic drift
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        // Draw the glowing lens flare exactly like the screenshot highlights
        const glowRadius = 35;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0.5,
          this.x,
          this.y,
          glowRadius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)"); // Bright white core
        gradient.addColorStop(0.12, "rgba(227, 202, 146, 0.45)"); // Gold halo
        gradient.addColorStop(0.4, `rgba(${goldColor}, 0.12)`); // Soft outer glow
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fade to black

        ctx.beginPath();
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting lines first (so they render behind the glowing cores)
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.28; // Highly visible clean lines
            ctx.strokeStyle = `rgba(${goldColor}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw the glowing intersections over the lines
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
      style={{ mixBlendMode: "screen", opacity: 0.8 }}
    />
  );
};

export default ConstellationBackground;
