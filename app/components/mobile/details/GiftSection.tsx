import { Gift } from 'react-feather';

export default function GiftSection() {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-4/5 top-0 w-4 h-2 bg-transparent border-t-2 border-l-2 border-r-2 border-white/80 rounded-t-full z-[-1]"></div>
      
      {/* Outer white container */}
      <div className="relative text-center max-w-xs mx-auto bg-white/60 p-4 rounded-3xl shadow-sm border border-[#0a0a09]/10 overflow-hidden">
        {/* Inner marble container */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Marble background with 60% opacity */}
          <div 
            className="absolute inset-0 opacity-50 z-0"
            style={{
              backgroundImage: "url('/marble.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          {/* Content container with blur effect */}
          <div className="relative z-10 backdrop-blur-sm p-6">
            {/* Gift icon */}
            <div className="flex justify-center mb-3">
              <Gift 
                size={24} 
                color="#0a0a09" 
                strokeWidth={1.5}
                className="feather-gift-icon"
              />
            </div>

            <h3 className="font-roze text-lg font-bold uppercase tracking-wider text-[#0a0a09] mb-3">
              Gifts & Blessings
            </h3>

            <div className="w-20 h-px bg-[#0a0a09]/40 mx-auto mb-4"></div>

            <p className="text-[#0a0a09]/80 text-sm font-ophelia tracking-wide leading-relaxed mb-2">
              Your presence is the greatest gift to us. As we are starting our life
              together abroad and cannot easily carry physical gifts, cash gift
              would be deeply appreciated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}