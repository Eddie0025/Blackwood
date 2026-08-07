import React, { useEffect, useRef } from "react";

const AthenaAnimation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let targets = [];
    const IMAGE_SRC = "/img3.png";
    const MAX_PARTICLES = 25000;

    let phase = "assemble"; // 'assemble' -> 'solid'
    let imageAlpha = 0;
    let imgW, imgH, offsetX, offsetY;
    let animationFrame;
    let phaseTimeout;

    function resize() {
      if (!container || !canvas) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor(targetX, targetY, r, g, b) {
        // Particles start scattered in a tight local box to prevent overlapping website text
        this.x = targetX + (Math.random() - 0.5) * 120;
        this.y = targetY + (Math.random() - 0.5) * 120;
        this.baseX = targetX;
        this.baseY = targetY;

        this.r = r;
        this.g = g;
        this.b = b;

        this.size = Math.random() * 1.5 + 0.3;
        this.ease = 0.02 + Math.random() * 0.035;
        this.alpha = 0;
      }

      update() {
        this.x += (this.baseX - this.x) * this.ease;
        this.y += (this.baseY - this.y) * this.ease;

        if (this.alpha < 1) {
          this.alpha += 0.015;
        }
      }

      draw() {
        const finalAlpha = this.alpha * (1 - imageAlpha);
        if (finalAlpha <= 0) return;

        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const image = new Image();
    image.src = IMAGE_SRC;
    image.onload = () => {
      initParticles();
      animate();

      phaseTimeout = setTimeout(() => {
        phase = "solid";
      }, 3500);
    };

    function initParticles() {
      particles = [];
      targets = [];

      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");

      // Scale to fit nicely inside the container (1.05 to match visual size of CerebX and NEXUS)
      const targetHeight = height * 1.05;
      const scale = targetHeight / image.height;
      imgW = Math.floor(image.width * scale);
      imgH = Math.floor(image.height * scale);

      offCanvas.width = imgW;
      offCanvas.height = imgH;

      offCtx.drawImage(image, 0, 0, imgW, imgH);
      const imgData = offCtx.getImageData(0, 0, imgW, imgH).data;

      offsetX = Math.floor((width - imgW) / 2);
      offsetY = Math.floor((height - imgH) / 2);

      const step = 1;

      for (let y = 0; y < imgH; y += step) {
        for (let x = 0; x < imgW; x += step) {
          const idx = (y * imgW + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          if (a > 128 && r + g + b > 35) {
            targets.push({
              x: offsetX + x,
              y: offsetY + y,
              r,
              g,
              b,
            });
          }
        }
      }

      let finalTargets = targets;
      if (targets.length > MAX_PARTICLES) {
        const ratio = targets.length / MAX_PARTICLES;
        finalTargets = [];
        for (let i = 0; i < targets.length; i += Math.ceil(ratio)) {
          finalTargets.push(targets[i]);
        }
      }

      for (let i = 0; i < finalTargets.length; i++) {
        const t = finalTargets[i];
        particles.push(new Particle(t.x, t.y, t.r, t.g, t.b));
      }
    }

    function animate() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      if (phase === "solid") {
        if (imageAlpha < 1) imageAlpha += 0.025;
        ctx.globalAlpha = Math.max(0, Math.min(1, imageAlpha));
        ctx.globalCompositeOperation = "screen";

        ctx.drawImage(image, offsetX, offsetY, imgW, imgH);
      }

      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
      clearTimeout(phaseTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[350px] sm:h-[480px] lg:h-[550px] flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ backgroundColor: "#000000" }}
      />
    </div>
  );
};

export default AthenaAnimation;
