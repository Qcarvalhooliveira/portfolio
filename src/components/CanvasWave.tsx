// CanvasWave.tsx
import React, { useEffect, useRef } from 'react';

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  rate: number;
}

const CanvasWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 150; // Ajuste conforme necessário

    const waves: Wave[] = [];

    const addWave = (x: number, y: number) => {
      waves.push({ x, y, radius: 1, maxRadius: 50, rate: 3 });
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        if (wave.radius < wave.maxRadius) {
          wave.radius += wave.rate;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      addWave(e.clientX, canvas.height - 20); // Ajuste a posição Y conforme necessário
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', bottom: 0, left: 0 }} />;
};

export default CanvasWave;
