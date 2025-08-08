// InvitationScreen.tsx
import { ChevronUp } from 'react-feather';
import { useEffect, useState } from 'react';

export default function MobileInvitationScreen() {
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
      
      // Zoom Animation
      const zoomWave = Math.sin(progress * Math.PI * 2) / 2 + 0.5;
      const easedZoom = Math.pow(zoomWave, 0.7);
      
      // Pan Animation
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
    <div className="relative h-full w-full flex items-end justify-center pb-16">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: "url('/venue-2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: `scale(${transform.scale}) translateX(${transform.translateX}%)`,
          transition: 'transform 1.2s cubic-bezier(0.5, 0.05, 0.3, 1.1)',
          willChange: 'transform',
        }}
      ></div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 pb-10">
        <p className="text-sm tracking-widest mb-6 font-ophelia animate-fadeIn opacity-0" 
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          TOGETHER WITH THEIR FAMILIES
        </p>

        <h1 className="text-4xl md:text-xl mb-6 font-ophelia font-bold animate-fadeIn opacity-0" 
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          KIMBERLY{" "}
          <span className="font-brittany text-4xl md:text-4xl text-[#e0b553] animate-fadeIn opacity-0" 
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            and
          </span>{" "}
          ANESU
        </h1>

        <p className="text-sm tracking-widest font-ophelia animate-fadeIn opacity-0" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
          INVITE YOU
        </p>
        <p className="text-sm tracking-widest mb-6 font-ophelia animate-fadeIn opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          TO THEIR WEDDING CELEBRATION
        </p>

        <div className="grid grid-cols-3 gap-6 items-center max-w-sm mx-auto mb-[25%]">
          <div className="flex flex-col justify-center items-center border-t border-b border-white/60 py-2 animate-fadeIn opacity-0" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            <span className="uppercase text-sm tracking-widest font-ophelia font-bold">
              Thursday
            </span>
          </div>

          <div className="flex flex-col items-center animate-fadeIn opacity-0" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            <span className="uppercase text-md tracking-widest font-ophelia font-bold">
              January
            </span>
            <span className="text-4xl font-ophelia font-bold leading-none mt-1">01</span>
            <span className="uppercase text-xl tracking-widest font-ophelia font-bold">
              2026
            </span>
          </div>

          <div className="flex flex-col justify-center items-center border-t border-b border-white/60 py-2 animate-fadeIn opacity-0" style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            <span className="uppercase text-md tracking-widest font-ophelia font-bold">
              At 1:00 PM
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