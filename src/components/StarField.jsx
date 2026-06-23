import { useEffect, useRef } from 'react';

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 280;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      delta: (Math.random() * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
      color: pickColor(),
    }));

    function pickColor() {
      const palette = ['255,255,255', '180,210,255', '255,230,180', '150,200,255'];
      return palette[Math.floor(Math.random() * palette.length)];
    }

    const shootingStars = [];

    function spawnShootingStar() {
      const startX = Math.random() * canvas.width * 1.2;
      const startY = Math.random() * canvas.height * 0.5;
      const angle = Math.PI / 5 + (Math.random() * Math.PI) / 8;
      const speed = 12 + Math.random() * 10;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 120 + Math.random() * 100,
        alpha: 1,
        width: 1.5 + Math.random(),
      });
    }

    let lastShoot = 0;
    let nextShootDelay = 3000 + Math.random() * 4000;

    function drawShootingStars(timestamp) {
      if (timestamp - lastShoot > nextShootDelay) {
        spawnShootingStar();
        lastShoot = timestamp;
        nextShootDelay = 3000 + Math.random() * 4000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.018;

        if (s.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - s.vx * (s.length / s.speed || 8);
        const tailY = s.y - s.vy * (s.length / s.speed || 8);

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(200,230,255,${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.9})`;
        ctx.fill();
      }
    }

    function draw(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
        star.alpha = Math.max(0, Math.min(1, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        ctx.fill();
      });

      drawShootingStars(timestamp);
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000000',
      }}
    />
  );
}

export default StarField;
