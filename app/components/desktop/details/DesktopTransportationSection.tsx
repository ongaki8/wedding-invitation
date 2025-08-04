import { Compass, MapPin, Navigation, Flag, CornerUpLeft } from 'react-feather';

interface TransportationSectionProps {
  setShowMapModal: (show: boolean) => void;
}

export default function DesktopTransportationSection({ setShowMapModal }: TransportationSectionProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 w-4 h-4 bg-[#0a0a09] rounded-full"></div>
      
      <div className="text-center max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-[#0a0a09]/10">
        <h3 className="font-roze text-xl uppercase tracking-wider text-[#0a0a09] mb-4">
          Venue Umwinzii
        </h3>
        <div className="w-24 h-px bg-[#0a0a09]/30 mx-auto mb-6"></div>

        <div className="text-left space-y-4">
          <div className="flex items-start gap-4">
            <Compass className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0b553]" />
            <p className="text-[#0a0a09]/80 text-base font-ophelia">
              <span className="font-medium text-[#0a0a09]"></span> From town, take Enterprise Road past Chisipite Shops.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <Navigation className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0b553] transform -rotate-45 animate-pulse" />
            <p className="text-[#0a0a09]/80 text-base font-ophelia">
              Continue straight to Redan Service Station at Chishawasha Hills turn-off.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <CornerUpLeft className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0b553] animate-pulse" />
            <p className="text-[#0a0a09]/80 text-base font-ophelia">
              Turn left immediately after the station onto Umwinsidale Road.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <CornerUpLeft className="flex-shrink-0 w-6 h-6 mt-1 text-[#e0a553] animate-pulse" />
            <p className="text-[#0a0a09]/80 text-base font-ophelia font-medium">
              Turn left into Venue Umwinzii just before the bridge.
            </p>
          </div>
        </div>
        
        {/* Map Button */}
        <button
          onClick={() => setShowMapModal(true)}
          className="flex items-center font-roze justify-center mx-auto space-x-3 px-5 py-2 bg-[#0a0a09] hover:bg-black/90 transition-colors rounded-lg border border-[#0a0a09] text-[#ffffff] font-ophelia text-base mt-10 mb-4 cursor-pointer"
        >
          <MapPin className="w-5 h-5" />
          <span>VIEW MAP</span>
        </button>
      </div>
    </div>
  );
}