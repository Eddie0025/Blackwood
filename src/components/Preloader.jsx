import React, { useEffect, useRef } from 'react';

const Preloader = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let particlesArray = [];
        let width, height;
        let animationFrame;

        // --- CONFIGURATION ---
        const IMAGE_SRC = '/logo.png'; 
        const PARTICLE_STEP = 5; // Reduced density for fewer particles
        const BRIGHTNESS_THRESHOLD = 30; // Ignore deep blacks

        // Original cinematic zoom start
        let globalZoom = 2.5; 
        let cx, cy; 
        let phase = 'assembling'; 
        let imageAlpha = 0;

        let imgW, imgH, offsetX, offsetY;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            cx = width / 2;
            cy = height / 2;
        }

        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor(x, y, color) {
                this.baseX = x; 
                this.baseY = y;
                
                // Original spread radius
                this.x = x + (Math.random() - 0.5) * width * 3;
                this.y = y + (Math.random() - 0.5) * height * 3;
                
                // Random shiny gold shades
                const goldShades = ['#c6a96b', '#ffd700', '#f3e5ab', '#d4af37'];
                this.color = goldShades[Math.floor(Math.random() * goldShades.length)];
                
                this.size = Math.random() * 1.5 + 0.5; 
                
                // Original elegant floating speed
                this.ease = Math.random() * 0.04 + 0.02; 
                this.alpha = 0; 
                
                // Twinkling properties
                this.twinkleSpeed = Math.random() * 0.1 + 0.05;
                this.twinklePhase = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += (this.baseX - this.x) * this.ease;
                this.y += (this.baseY - this.y) * this.ease;
                
                if (this.alpha < 1) {
                    this.alpha += 0.015;
                }
                this.twinklePhase += this.twinkleSpeed;
            }

            draw() {
                // Fade out particles exactly as the image fades in
                const finalAlpha = this.alpha * (1 - imageAlpha);
                if (finalAlpha <= 0) return;

                const drawX = cx + (this.x - cx) * globalZoom;
                const drawY = cy + (this.y - cy) * globalZoom;

                ctx.globalAlpha = Math.max(0, Math.min(1, finalAlpha));
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(drawX, drawY, this.size * globalZoom, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const image = new Image();
        image.src = IMAGE_SRC;

        let timelineTimeout1, timelineTimeout2, timelineTimeout3;

        image.onload = () => {
            initParticles();
            animate();
            
            // TIMELINE: Allow particles to converge and hold a solid outline longer
            timelineTimeout1 = setTimeout(() => {
                phase = 'solid';
            }, 4200); // Extended particle convergence hold phase

            timelineTimeout2 = setTimeout(() => {
                if (wrapperRef.current) {
                    wrapperRef.current.style.opacity = '0';
                }
            }, 6000); // Fade out overlay at 6s

            timelineTimeout3 = setTimeout(() => {
                cancelAnimationFrame(animationFrame);
                if (onComplete) onComplete();
            }, 8000); // Complete preloader at 8s
        };

        function initParticles() {
            particlesArray = [];
            
            const offCanvas = document.createElement('canvas');
            const offCtx = offCanvas.getContext('2d');

            const scale = (height * 0.4) / image.height;
            imgW = Math.floor(image.width * scale);
            imgH = Math.floor(image.height * scale);
            
            offCanvas.width = imgW;
            offCanvas.height = imgH;
            
            offCtx.drawImage(image, 0, 0, imgW, imgH);
            const imgData = offCtx.getImageData(0, 0, imgW, imgH).data;

            offsetX = Math.floor((width - imgW) / 2);
            offsetY = Math.floor((height - imgH) / 2);

            for (let y = 0; y < imgH; y += PARTICLE_STEP) {
                for (let x = 0; x < imgW; x += PARTICLE_STEP) {
                    const index = (y * imgW + x) * 4;
                    const r = imgData[index];
                    const g = imgData[index + 1];
                    const b = imgData[index + 2];
                    const a = imgData[index + 3];

                    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                    
                    if (brightness > BRIGHTNESS_THRESHOLD && a > 0) {
                        particlesArray.push(new Particle(x + offsetX, y + offsetY, null));
                    }
                }
            }
        }

        function animate() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'rgba(5, 5, 5, 0.4)'; 
            ctx.fillRect(0, 0, width, height);

            // Original smooth zoom speed
            globalZoom += (1.0 - globalZoom) * 0.02;

            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });

            if (phase === 'solid') {
                // Smooth and gradual fade in of the clean logo
                if (imageAlpha < 1) imageAlpha += 0.025; 
                ctx.globalAlpha = Math.max(0, Math.min(1, imageAlpha));
                
                ctx.globalCompositeOperation = 'screen';
                
                const drawImgW = imgW * globalZoom;
                const drawImgH = imgH * globalZoom;
                const drawOffsetX = cx + (offsetX - cx) * globalZoom;
                const drawOffsetY = cy + (offsetY - cy) * globalZoom;

                ctx.drawImage(image, drawOffsetX, drawOffsetY, drawImgW, drawImgH);
            }

            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
            clearTimeout(timelineTimeout1);
            clearTimeout(timelineTimeout2);
            clearTimeout(timelineTimeout3);
        };
    }, [onComplete]);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000000',
                zIndex: 99999,
                overflow: 'hidden',
                transition: 'opacity 2.0s ease-in-out',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#050505',
                    filter: 'brightness(0.65) contrast(1.45) saturate(1.25)',
                    display: 'block',
                }}
            />
        </div>
    );
};

export default Preloader;
