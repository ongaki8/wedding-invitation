import { useState, useRef, useEffect } from "react";
import DesktopRSVPModal from "./rsvp/DesktopRSVPModal";

export default function DesktopRSVPScreen() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    specialRequests: "",
    wellWishes: ""
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          poster="/DesktopRSVP.webp"
        >
          <source src="/rings-desktop.mp4" type="video/mp4" />
          <img src="/DesktopRSVP.webp" alt="RSVP Background" className="h-full w-full object-cover" />
        </video>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-white/70"></div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-12">
        <div className="flex flex-col items-center justify-center transform -translate-y-12">
          <p className="text-4xl font-brittany text-[#0a0a09]/80 tracking-widest mb-16 mt-[10%]">
            Please
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-[16rem] leading-[0.8] tracking-[0.1em] font-bold font-ophelia text-[#e0b553] text-center">
              <span className="block">RSVP</span>
            </div>
            <p className="text-3xl font-ophelia text-[#0a0a09]/80 tracking-wider mt-8">
              By 10th October
            </p>
          </div>
          
          {/* RSVP button */}
          <button
            onClick={() => setShowForm(true)}
            className="px-12 py-4 rounded-full bg-transparent border-2 border-[#0a0a09]/80 text-[#0a0a09]/80 hover:bg-[#e0b553]/60 hover:border-[#e0b553]/80 hover:text-white/90 transition-all duration-300 font-classyvogue font-bold tracking-wider text-xl mt-8 mb-[5%] cursor-pointer"
          >
            RSVP NOW
          </button>
        </div>
      </div>
      
      {/* RSVP Form Modal */}
      <DesktopRSVPModal 
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        setFormData={setFormData}
      />
      
      <style jsx global>{`
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