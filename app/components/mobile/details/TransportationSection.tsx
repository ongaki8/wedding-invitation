import { Compass, MapPin, Navigation, Flag, CornerUpLeft } from 'react-feather';

interface TransportationSectionProps {
  setShowMapModal: (show: boolean) => void;
}

export default function TransportationSection({ setShowMapModal }: TransportationSectionProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-4/5 top-0 w-4 h-2 bg-transparent border-t-2 border-l-2 border-r-2 border-white/80 rounded-t-full z-[-1]"></div>
      
      {/* Outer white container */}
      <div className="relative text-center max-w-xs mx-auto bg-white/60 p-4 rounded-3xl shadow-sm border border-[#0a0a09]/10 overflow-hidden">

        {/* Inner marble container */}
        <div className="relative overflow-hidden rounded-2xl">

          {/* Marble background */}
          <div 
            className="absolute inset-0 opacity-50 z-0"
            style={{
              backgroundImage: "url('/marble.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          {/* Content container */}
          <div className="relative z-10 backdrop-blur-sm p-6">
            
            {/* Location icon */}
            <div className="flex justify-center mb-3">
              <MapPin
                size={24} 
                color="#0a0a09" 
                strokeWidth={1.5}
                className="feather-gift-icon"
              />
            </div>

            <h3 className="font-roze text-lg font-bold uppercase tracking-wider text-[#0a0a09] mb-2">
              Venue Umwinzii
            </h3>
            <div className="w-20 h-px bg-[#0a0a09]/40 mx-auto mb-4"></div>

            <div className="text-left space-y-3">
              <div className="flex items-start gap-3">
                <Compass className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#e0b553]" />
                <p className="text-[#0a0a09]/80 text-sm font-ophelia tracking-wide">
                  <span className="font-medium text-[#0a0a09]"></span> From town, take Enterprise Road past Chisipite Shops.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <Navigation className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#e0b553] transform -rotate-45 animate-pulse" />
                <p className="text-[#0a0a09]/80 text-sm font-ophelia tracking-wide">
                  Continue straight to Redan Service Station at Chishawasha Hills turn-off.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <CornerUpLeft className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#e0b553] animate-pulse" />
                <p className="text-[#0a0a09]/80 text-sm font-ophelia tracking-wide">
                  Turn left immediately after the station onto Umwinsidale Road.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <CornerUpLeft className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#e0a553] animate-pulse" />
                <p className="text-[#0a0a09]/80 text-sm font-ophelia tracking-wide">
                  Turn left into Venue Umwinzii just before the bridge.
                </p>
              </div>
            </div>
            
            {/* Map Button */}
            <button
              onClick={() => setShowMapModal(true)}
              className="flex items-center font-bold tracking-wider justify-center mx-auto space-x-2 px-3 py-2 bg-[#0a0a09] hover:bg-[#0a0a09]/10 transition-colors rounded-xl border border-[#0a0a09] text-[#ffffff] font-classyvogue text-sm mt-8 mb-2"
            >
              <span>VIEW MAP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}