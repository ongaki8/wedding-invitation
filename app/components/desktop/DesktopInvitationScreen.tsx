// DesktopInvitationScreen.tsx
import { ChevronUp } from 'react-feather';
import { useEffect, useState } from 'react';

export default function DesktopInvitationScreen() {
  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0
  });

  useEffect(() => {
    const duration = 15000; 
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Zoom animation
      const zoomWave = Math.sin(progress * Math.PI * 2) / 2 + 0.5;
      const easedZoom = Math.pow(zoomWave, 0.7);
      
      // Pan animation
      const panWave = Math.sin(progress * Math.PI * 4);
      const easedPan = Math.pow(Math.abs(panWave), 0.7) * Math.sign(panWave);
      
      setTransform({
        scale: 1 + (easedZoom * 0.6),
        translateX: easedPan * 8
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Background with animation */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/desktop-venue-2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: `scale(${transform.scale}) translateX(${transform.translateX}%)`,
          transition: 'transform 1.2s cubic-bezier(0.5, 0.05, 0.3, 1.1)',
          willChange: 'transform',
        }}
      ></div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Info */}
      <div className="relative z-10 text-center text-white px-6">
        <p className="text-lg tracking-widest mb-8 font-ophelia animate-fadeIn opacity-0" 
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          TOGETHER WITH THEIR FAMILIES
        </p>

        <h1 className="text-6xl mb-8 font-ophelia animate-fadeIn opacity-0" 
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          KIMBERLY{" "}
          <span className="font-brittany text-6xl text-[#e0b553] animate-fadeIn opacity-0" 
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            and
          </span>{" "}
          ANESU
        </h1>

        <p className="text-lg tracking-widest font-ophelia animate-fadeIn opacity-0" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
          INVITE YOU
        </p>
        <p className="text-lg tracking-widest mb-8 font-ophelia animate-fadeIn opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          TO THEIR WEDDING CELEBRATION
        </p>

        <div className="grid grid-cols-3 gap-8 items-center max-w-2xl mx-auto">
          <div className="flex flex-col justify-center items-center border-t border-b border-white/60 py-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            <span className="uppercase text-lg tracking-widest font-ophelia">
              Thursday
            </span>
          </div>

          <div className="flex flex-col items-center animate-fadeIn opacity-0" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            <span className="uppercase text-xl tracking-widest font-ophelia">
              January
            </span>
            <span className="text-6xl font-ophelia leading-none mt-2">01</span>
            <span className="uppercase text-2xl tracking-widest font-ophelia">
              2026
            </span>
          </div>

          <div className="flex flex-col justify-center items-center border-t border-b border-white/60 py-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            <span className="uppercase text-xl tracking-widest font-ophelia">
              At 11:00 AM
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.65s ease-in forwards;
        }
      `}</style>
    </div>
  );
}