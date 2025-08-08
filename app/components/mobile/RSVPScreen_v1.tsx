import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "react-feather";
import RSVPModal from "./rsvp/RSVPModal";

export default function MobileRSVPScreen() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    specialRequests: "",
    wellWishes: ""
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">

      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          poster="/MobileRSVP.webp"
        >
          <source src="/rings.mp4" type="video/mp4" />
          <img src="/MobileRSVP.webp" alt="RSVP Background" className="h-full w-full object-cover" />
        </video>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-white/70"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-6">
        <div className="flex flex-col items-center justify-center transform -translate-y-8">

          {/* "Please" text */}
          <p className="text-3xl font-brittany text-[#0a0a09]/80 tracking-widest mb-14 mt-[20%]">
            Please
          </p>
          
          {/* RSVP text */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-[12rem] leading-[0.8] tracking-[0.1em] font-bold font-ophelia text-[#e0b553] text-center">
              <span className="block transform translate-x-1">RS</span>
              <span className="block transform -translate-x-1">VP</span>
            </div>
            <p className="text-2xl font-ophelia text-[#0a0a09]/80 tracking-wider mt-6">
              By 10th October
            </p>
          </div>
          
          {/* RSVP button */}
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full bg-transparent border-2 border-[#0a0a09]/80 text-[#0a0a09]/60 hover:bg-[#e0b553]/30 hover:border-[#e0b553]/80 transition-all duration-300 font-classyvogue font-bold tracking-wider text-lg mt-4 mb-[7.5%]"
          >
            RSVP NOW
          </button>

          {/* Scroll Down */}
          <div 
            className="animate-fadeIn opacity-0" 
            style={{ 
              animationDelay: '1.5s', 
              animationFillMode: 'forwards',
            }}
          >
            <div className="flex flex-col items-center justify-center mb-2">
              <ChevronDown className="text-gray-400/0 h-8 w-8 animate-bounceReverse mb-2" />
              <span className="text-sm tracking-widest font-ophelia text-[#0a0a09]/0">See you there</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* RSVP Form Modal */}
      <RSVPModal 
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        setFormData={setFormData}
      />
      
      <style jsx global>{`
        /* Prevent zoom on input focus in iOS */
        @media screen and (max-width: 767px) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }

        /* Improved mobile input styles */
        input, textarea {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Existing animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95); 
          }
          to { 
            opacity: 1;
            transform: scale(1); 
          }
        }

        /* Radio button styles */
        input[type="radio"] {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1em;
          height: 1em;
          border: 1px solid #0a0a0999;
          border-radius: 50%;
          display: grid;
          place-content: center;
        }

        input[type="radio"]::before {
          content: "";
          width: 0.5em;
          height: 0.5em;
          border-radius: 50%;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em #e0b553;
        }

        input[type="radio"]:checked::before {
          transform: scale(1);
        }

        /* Animation classes */
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}