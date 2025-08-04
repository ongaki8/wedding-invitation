import { useState, useEffect } from "react";

interface DressCodeSectionProps {
  selectedColor: {code: string, name: string} | null;
  setSelectedColor: (color: {code: string, name: string} | null) => void;
}

export default function DressCodeSection({ selectedColor, setSelectedColor }: DressCodeSectionProps) {
  const colors = [
    { code: "#eae3d9", name: "Ivory Lace" },
    { code: "#d8b59a", name: "Blushing Sand" },
    { code: "#d6c1ad", name: "Champagne Mist" },
    { code: "#cbbfb8", name: "Muted Taupe" },
    { code: "#9c8e85", name: "Vintage Taupe" },
    { code: "#c4b3a2", name: "Toasted Almond" },
    { code: "#c97c56", name: "Terracotta Kiss" },
    { code: "#7c8269", name: "Sage Whisper" },
    { code: "#7d8370", name: "Olive Haze" },
  ];

  const rotationColors = [
    { code: "#9c8e85", name: "Vintage Taupe" },
    { code: "#c97c56", name: "Terracotta Kiss" },
    { code: "#7c8269", name: "Sage Whisper" },
    { code: "#7d8370", name: "Olive Haze" },
  ];

  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentRotationColor, setCurrentRotationColor] = useState(rotationColors[0]);

  const firstRow = colors.slice(0, 5);
  const secondRow = colors.slice(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % rotationColors.length;
        setCurrentRotationColor(rotationColors[newIndex]);
        return newIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 w-4 h-4 bg-[#0a0a09] rounded-full z-[-1]"></div>
    <div className="text-center max-w-xs mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-[#0a0a09]/10 relative">
        <h3 className="font-roze text-lg font-bold uppercase tracking-wider text-[#0a0a09] mb-2">
          Guest Dress Code
        </h3>
        <div className="w-20 h-px bg-[#0a0a09]/30 mx-auto mb-4"></div>

        <p className="text-[#0a0a09]/80 text-sm font-ophelia leading-relaxed mb-4">
          We kindly encourage our guests to wear the following colors for
          our special day.
        </p>

        {/* Palette */}
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {firstRow.map((color, i) => (
            <div
              key={i}
              onClick={() => setSelectedColor(color)}
              className="relative w-8 h-8 rounded-full border border-[#0a0a09]/10 cursor-pointer hover:scale-110 transition-transform group"
              style={{ backgroundColor: color.code }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-3 h-0.5 bg-white/80"></div>
                <div className="w-0.5 h-3 bg-white/80 absolute"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {secondRow.map((color, i) => (
            <div
              key={i}
              onClick={() => setSelectedColor(color)}
              className="relative w-8 h-8 rounded-full border border-[#0a0a09]/10 cursor-pointer hover:scale-110 transition-transform group"
              style={{ backgroundColor: color.code }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-3 h-0.5 bg-white/80"></div>
                <div className="w-0.5 h-3 bg-white/80 absolute"></div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="font-roze text-sm mb-4 flex items-center justify-center gap-1 transition-colors duration-500"
          style={{ 
            color: currentRotationColor.code,
            borderColor: currentRotationColor.code 
          }}
        >
          <span className="px-2 py-1 rounded-lg border font-roze">Tap on any color to view details</span>
        </div>
      </div>
    </div>
  );
}