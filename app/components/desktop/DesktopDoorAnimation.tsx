// DesktopDoorAnimation.tsx
import { useState, useEffect } from "react";
import DesktopInvitationScreen from "./DesktopInvitationScreen";

export default function DesktopDoorAnimation() {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <DesktopInvitationScreen />

      {!animationDone && (
        <div className="absolute inset-0 z-20 overflow-hidden">
          {/* Left photo container - ensures full height without cropping */}
          <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
            <img 
              src="/left.webp" 
              alt="Left side" 
              className="h-full w-auto max-w-none animate-slideLeft"
              style={{ objectPosition: 'right center' }}
            />
          </div>

          {/* Right photo container - adjusted to show more of the right image */}
          <div className="absolute top-0 right-0 h-full w-1/2 overflow-hidden">
            <img 
              src="/right.webp" 
              alt="Right side" 
              className="h-full w-auto max-w-none animate-slideRight"
              style={{ objectPosition: '20% center' }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes slideRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-slideLeft {
          animation: slideLeft 3s ease-in-out forwards;
        }
        .animate-slideRight {
          animation: slideRight 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}