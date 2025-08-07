import { useState, useRef, useEffect, useCallback } from "react";
import DesktopRSVPModal from "./rsvp/DesktopRSVPModal";
import { Lock } from "lucide-react";

export default function DesktopRSVPScreen() {
  const [showPinScreen, setShowPinScreen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    specialRequests: "",
    wellWishes: ""
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (/^[0-9]$/.test(e.key)) {
      const num = e.key;
      const index = num === '0' ? 9 : parseInt(num) - 1;
      handleNumberPress(num, index);
    } else if (e.key === 'Backspace') {
      handleDelete();
    } else if (e.key === 'Escape') {
      setShowPinScreen(false);
    }
  }, [pin]);

  useEffect(() => {
    if (showPinScreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPinScreen, handleKeyDown]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  // PIN validation
  useEffect(() => {
    if (pin.length === 4) {
      const enteredPin = pin.join('');
      if (enteredPin === process.env.NEXT_PUBLIC_WEDDING_PIN) {
        setAuthenticated(true);
        setShowPinScreen(false);
        setPin([]);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setPin([]);
          setShake(false);
          setError(false);
        }, 1500);
      }
    }
  }, [pin]);

  const handleNumberPress = (num: string, index: number) => {
    if (pin.length < 6) {
      setActiveButton(index);
      setTimeout(() => setActiveButton(null), 200);
      setPin([...pin, num]);
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError(false);
    }
  };

  const renderPinDots = () => {
    return (
      <div className="flex justify-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`mx-2 w-4 h-4 rounded-full transition-all duration-200 ${
              index < pin.length 
                ? 'bg-[#e0b553] scale-110' 
                : 'bg-[#0a0a09]/10 scale-100'
            } ${
              index === pin.length && !error 
                ? 'ring-2 ring-[#e0b553]' 
                : ''
            } ${
              error && index >= pin.length 
                ? 'bg-red-300/30' 
                : ''
            }`}
          />
        ))}
      </div>
    );
  };

  if (showPinScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center backdrop-blur-sm"
        style={{ backgroundImage: "url('/desktop-marble.webp')" }}>
        
        <div className="w-full max-w-xl px-8 py-10">
          <div className="bg-white/20 backdrop-blur-xs rounded-4xl border border-black/10 shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              {/* Header */}
              <div className="flex flex-col items-center">
                <Lock className={`w-10 h-10 text-[#e0b553] mb-3 ${shake ? "animate-shake" : ""}`} />
                <h2 className="text-2xl font-bold text-[#0a0a09]/90 font-ophelia tracking-wider">
                  Enter PIN
                </h2>
                <p className="text-sm text-[#0a0a09]/70 font-ophelia font-bold tracking-wider my-4">
                  Please enter the code
                </p>
              </div>

              {/* PIN Dots Display */}
              <div className={`w-full px-6 py-4 mb-2 rounded-lg transition-all ${
                error ? 'bg-red-50/50' : 'bg-white/50'
              } ${shake ? 'animate-shake' : ''}`}>
                {renderPinDots()}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mb-4 font-bold font-ophelia tracking-wider">
                  Incorrect PIN. Please try again.
                </p>
              )}

              {/* Keypad */}
              <div className="w-full max-w-sm grid grid-cols-3 gap-2 px-4 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
                  <button
                    key={num}
                    onClick={() => handleNumberPress(num.toString(), index)}
                    className="aspect-square flex items-center justify-center relative rounded-lg transition-all"
                  >
                    <div className={`absolute inset-0 rounded-full border-1 border-amber-300 bg-[#e0b553]/10 ${
                      activeButton === index ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-100`} />
                    <div className="w-22 h-22 rounded-full border border-[#0a0a09]/20 flex items-center justify-center relative z-10">
                    <span className="text-2xl font-bold text-[#0a0a09]/80 font-classyvogue">
                      {num}
                    </span>
                    </div>
                  </button>
                ))}

                {/* Empty cell */}
                <div className="aspect-square" />

                {/* 0 Button */}
                <button
                  onClick={() => handleNumberPress("0", 9)}
                  className="aspect-square flex items-center justify-center relative rounded-lg transition-all"
                >
                  <div className={`absolute inset-0 rounded-full border-1 border-amber-300 bg-[#e0b553]/10 ${
                    activeButton === 9 ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-100`} />
                  <div className="w-22 h-22 rounded-full border border-[#0a0a09]/20 flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-[#0a0a09]/80 font-classyvogue">
                    0
                  </span>
                  </div>
                </button>

                {/* Backspace Button */}
                <button
                  onClick={handleDelete}
                  className="aspect-square flex items-center justify-center text-[#0a0a09]/70 hover:text-[#0a0a09]/90 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-center w-full">
                <button
                  onClick={() => setShowPinScreen(false)}
                  className="text-md font-ophelia tracking-wider font-bold text-[#0a0a09]/80 hover:text-[#0a0a09] transition-colors px-4 py-2 cursor-pointer"
                >
                  Cancel (ESC)
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-4px); }
            40%, 80% { transform: translateX(4px); }
          }
          .animate-shake {
            animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }
          .backdrop-blur-xs {
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          }
        `}</style>
      </div>
    );
  }

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
    
    {/* Main Content Container */}
    <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-12">
      <div className="w-full max-w-4xl bg-white/10 p-6 shadow-2xl rounded-4xl flex flex-col items-center justify-center">
      <div className="w-full bg-white/70 backdrop-blur-[0px] rounded-3xl flex flex-col items-center justify-center">

        {/* Please */}
        <p className="text-4xl font-brittany text-[#0a0a09]/80 tracking-widest mb-16 mt-[7%]">
          Please
        </p>
        
        {/* RSVP */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-[16rem] mt-6 leading-[0.8] tracking-[0.1em] font-bold font-ophelia text-[#e0b553] text-center">
            <span className="block">RSVP</span>
          </div>
          <p className="text-3xl font-ophelia text-[#0a0a09]/80 tracking-wider mt-4">
            By 10th October
          </p>
        </div>
        
        {/* RSVP Button Container */}
        <div className="w-full flex justify-center mt-8 mb-[5%]">
          <button
            onClick={() => {
              setShowPinScreen(true);
              setPin([]);
            }}
            className="px-12 py-4 rounded-full bg-transparent border-2 border-[#0a0a09]/80 text-[#0a0a09]/80 hover:bg-[#e0b553] hover:border-[#e0b553] hover:text-white transition-all duration-300 font-classyvogue font-bold tracking-wider text-xl cursor-pointer"
          >
            RSVP NOW
          </button>
        </div>
      </div>
    </div>
    
    {/* RSVP Form Modal */}
    {authenticated && (
      <DesktopRSVPModal 
        showForm={authenticated}
        setShowForm={(value) => {
          setAuthenticated(value);
          if (!value) {
            setPin([]);
          }
        }}
        formData={formData}
        setFormData={setFormData}
      />
    )}
    
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
  </div>
);
}