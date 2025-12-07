import React, { useEffect, useRef, useMemo, useState } from 'react';

export default function AnimatedBackground({ interactive = false, forceFull = false, variant = 'network' }) {
  const canvasRef = useRef(null);
  const [perfFriendly, setPerfFriendly] = useState(false);
  const [pointer, setPointer] = useState({ x: null, y: null, active: false });
  const [impulse, setImpulse] = useState(0);
  const rippleRef = useRef({ active: false, x: 0, y: 0, r: 0, alpha: 0 });

  // Static decorative particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 60,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 20 + 30
    }));
  }, []);

  useEffect(() => {
    try {
      const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      setPerfFriendly(!!(reduce || (mobile && !forceFull)));
    } catch {}
  }, [forceFull]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particlesArray = [];
    const isOrbit = variant === 'orbit';
    const particleCount = perfFriendly ? (interactive ? (isOrbit ? 40 : 30) : 0) : (isOrbit ? 100 : 80);
    const maxDistance = perfFriendly ? 80 : 120;
    const centers = isOrbit ? Array.from({ length: perfFriendly ? 3 : 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    })) : null;

    class Particle {
      constructor() {
        this.size = Math.random() * 3 + 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        if (isOrbit) {
          const c = centers[Math.floor(Math.random() * centers.length)];
          this.cx = c.x; this.cy = c.y;
          this.r = Math.random() * (perfFriendly ? 90 : 140) + 40;
          this.a = Math.random() * Math.PI * 2;
          this.speed = (perfFriendly ? 0.004 : 0.008) * (0.6 + Math.random() * 0.8);
          this.x = this.cx + Math.cos(this.a) * this.r;
          this.y = this.cy + Math.sin(this.a) * this.r;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speedX = (Math.random() - 0.5) * (perfFriendly ? 0.3 : 0.6);
          this.speedY = (Math.random() - 0.5) * (perfFriendly ? 0.3 : 0.6);
        }
      }

      update() {
        if (isOrbit) {
          this.a += this.speed;
          const tx = this.cx + Math.cos(this.a) * this.r;
          const ty = this.cy + Math.sin(this.a) * this.r;
          this.x += (tx - this.x) * 0.1;
          this.y += (ty - this.y) * 0.1;
          if (interactive && pointer.active && pointer.x != null && pointer.y != null) {
            const dcx = pointer.x - this.cx;
            const dcy = pointer.y - this.cy;
            const d = Math.hypot(dcx, dcy) || 1;
            const influence = Math.min(1, 200 / d);
            this.speed += (perfFriendly ? 0.0004 : 0.0008) * influence;
            if (impulse > 0) this.r += (perfFriendly ? 0.4 : 0.8) * influence;
          }
        } else {
          this.x += this.speedX;
          this.y += this.speedY;
          this.speedX *= perfFriendly ? 0.985 : 0.98;
          this.speedY *= perfFriendly ? 0.985 : 0.98;
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
          if (interactive && pointer.active && pointer.x != null && pointer.y != null) {
            const dx = pointer.x - this.x;
            const dy = pointer.y - this.y;
            const dist = Math.hypot(dx, dy) || 1;
            const tx = -dy / dist;
            const ty = dx / dist;
            const swirl = perfFriendly ? 0.02 : 0.04;
            const attract = perfFriendly ? 0.01 : 0.02;
            this.speedX += tx * swirl + (dx / dist) * attract;
            this.speedY += ty * swirl + (dy / dist) * attract;
            if (impulse > 0) {
              const ex = -(dx / dist) * impulse * (perfFriendly ? 0.2 : 0.4);
              const ey = -(dy / dist) * impulse * (perfFriendly ? 0.2 : 0.4);
              this.speedX += ex;
              this.speedY += ey;
            }
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Connect particles with lines
    function connectParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });

      if (!isOrbit && particleCount > 0) connectParticles();
      if (rippleRef.current.active) {
        const rp = rippleRef.current;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rp.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        rp.r += perfFriendly ? 2 : 4;
        rp.alpha -= perfFriendly ? 0.02 : 0.03;
        if (rp.alpha <= 0) rp.active = false;
      }
      if (impulse > 0) setImpulse(prev => Math.max(prev - 0.02, 0));
      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    function onMove(e) {
      let x, y;
      if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      setPointer({ x, y, active: true });
    }

    function onLeave() {
      setPointer({ x: null, y: null, active: false });
    }

    function onPulse(e) {
      let x, y;
      if (e && e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if (e) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = canvas.width / 2; y = canvas.height / 2;
      }
      rippleRef.current = { active: true, x, y, r: 0, alpha: 0.6 };
      setImpulse(1);
    }

    if (interactive) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave, { passive: true });
      window.addEventListener('touchend', onLeave, { passive: true });
      window.addEventListener('click', onPulse, { passive: true });
      window.addEventListener('touchstart', onPulse, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('touchend', onLeave);
        window.removeEventListener('click', onPulse);
        window.removeEventListener('touchstart', onPulse);
      }
    };
  }, [perfFriendly, interactive, pointer.active, impulse, variant]);

  return (
    <div className="animated-bg enhanced">
      {perfFriendly && !interactive ? (
        <div className="gradient-overlay"></div>
      ) : (
        <>
          <canvas ref={canvasRef} className="particle-canvas"></canvas>
          <div className="gradient-overlay animated"></div>
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
          <div className="blob blob-5"></div>
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
          <div className="waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
          <div className="particles-container">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.left}%`,
                  animationDelay: `${particle.delay}s`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </div>
          <div className="grid-pattern"></div>
        </>
      )}
    </div>
  );
}
