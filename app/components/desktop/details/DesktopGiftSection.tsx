import { Gift } from 'react-feather';

export default function DesktopGiftSection() {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-4/5 top-0 w-4 h-2 bg-transparent border-t-2 border-l-2 border-r-2 border-white/80 rounded-t-full z-[-1]"></div>
      
      <div className="relative text-center max-w-4xl mx-auto bg-white/60 p-6 rounded-3xl shadow-sm border border-[#0a0a09]/10 overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="absolute inset-0 opacity-50 z-0"
            style={{
              backgroundImage: "url('/desktop-marble.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          <div className="relative z-10 backdrop-blur-sm p-8 rounded-3xl">
            <div className="flex justify-center mb-4">
              <Gift 
                size={28} 
                color="#0a0a09" 
                strokeWidth={1.5}
                className="feather-gift-icon"
              />
            </div>

            <h3 className="font-roze text-2xl font-bold uppercase tracking-wider text-[#0a0a09] mb-3">
              Gifts & Blessings
            </h3>

            <div className="w-24 h-px bg-[#0a0a09]/40 mx-auto mb-6"></div>

            <p className="text-[#0a0a09]/80 text-base font-ophelia tracking-wide leading-relaxed mb-2">
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