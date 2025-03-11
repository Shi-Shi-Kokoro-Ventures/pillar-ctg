
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full viewport size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Track mouse position for interactive effect
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap particles around edges
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
        
        // Calculate distance to mouse for interactive effect
        const dx = mousePosition.current.x - p.x;
        const dy = mousePosition.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Interactive effect - particles move away from mouse
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 1500;
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(51, 195, 240, ${p.opacity})`;
        ctx.fill();
      }
      
      // Draw connections between close particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(51, 195, 240, ${0.1 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    // Initialize
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticlesBackground;
