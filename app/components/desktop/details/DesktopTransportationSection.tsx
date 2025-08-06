import { Compass, MapPin, Navigation, Flag, CornerUpLeft } from 'react-feather';

interface TransportationSectionProps {
  setShowMapModal: (show: boolean) => void;
}

export default function DesktopTransportationSection({ setShowMapModal }: TransportationSectionProps) {
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
              <MapPin
                size={28} 
                color="#0a0a09" 
                strokeWidth={1.5}
                className="feather-gift-icon"
              />
            </div>

            <h3 className="font-roze text-2xl font-bold uppercase tracking-wider text-[#0a0a09] mb-3">
              Venue Umwinzii
            </h3>
            <div className="w-24 h-px bg-[#0a0a09]/40 mx-auto mb-6"></div>

            <div className="text-left space-y-4">
              <div className="flex items-start gap-4">
                <Compass className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0b553]" />
                <p className="text-[#0a0a09]/80 text-base font-ophelia tracking-wide">
                  <span className="font-medium text-[#0a0a09]"></span> From town, take Enterprise Road past Chisipite Shops.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <Navigation className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0b553] transform -rotate-45 animate-pulse" />
                <p className="text-[#0a0a09]/80 text-base font-ophelia tracking-wide">
                  Continue straight to Redan Service Station at Chishawasha Hills turn-off.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <CornerUpLeft className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0b553] animate-pulse" />
                <p className="text-[#0a0a09]/80 text-base font-ophelia tracking-wide">
                  Turn left immediately after the station onto Umwinsidale Road.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <CornerUpLeft className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0a553] animate-pulse" />
                <p className="text-[#0a0a09]/80 text-base font-ophelia tracking-wide">
                  Turn left into Venue Umwinzii just before the bridge.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowMapModal(true)}
              className="flex items-center font-bold tracking-wider justify-center mx-auto space-x-3 px-5 py-3 bg-[#0a0a09] hover:bg-[#0a0a09]/90 transition-colors rounded-xl border border-[#0a0a09] text-[#ffffff] font-classyvogue text-base mt-8 mb-2 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              <span>VIEW MAP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}