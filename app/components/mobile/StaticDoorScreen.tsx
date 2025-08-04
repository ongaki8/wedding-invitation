// StaticDoorScreen.tsx
import { useState, useEffect } from "react";
import AnimatedDoorScreen from "./AnimatedDoorScreen";

export default function StaticDoorScreen() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image that will show behind the doors */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/mobile-invitation.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {!showAnimation && (
        <div className="absolute inset-0 z-20 overflow-hidden">
          {/* Left photo container */}
          <div className="absolute top-0 left-0 h-full w-0.99 overflow-hidden">
            <img 
              src="/left.webp" 
              alt="Left side" 
              className="h-full w-auto max-w-none"
              style={{ objectPosition: 'right center' }}
            />
          </div>

          {/* Right photo container */}
          <div className="absolute top-0 right-0 h-full w-0.99 overflow-hidden">
            <img 
              src="/right.webp" 
              alt="Right side" 
              className="h-full w-auto max-w-none"
              style={{ objectPosition: '20% center' }}
            />
          </div>
        </div>
      )}

      {showAnimation && <AnimatedDoorScreen />}
    </div>
  );
}