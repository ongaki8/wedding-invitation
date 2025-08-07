import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "react-feather";
import RSVPModal from "./rsvp/RSVPModal";
import { LockIcon } from "lucide-react";

export default function MobileRSVPScreen() {
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

  // Auto-play video
  useEffect(() => {
    if (videoRef.current && authenticated) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [authenticated]);

  // PIN input
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
        }, 500);
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

  const handleCancel = () => {
    setShowPinScreen(false);
    setPin([]);
    setError(false);
  };

  const renderPinDots = () => {
    return (
      <div className="flex justify-center mb-8">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`mx-2 w-4 h-4 rounded-full border-2 ${index < pin.length ? 'bg-[#e0b553] border-[#e0b553]' : 'border-[#0a0a09]/40'} transition-colors duration-200`}
          />
        ))}
      </div>
    );
  };

  if (showPinScreen) {
    return (
      <div
        className="h-screen w-full flex items-center justify-center px-10 pb-30 pt-10"
        style={{
          backgroundImage: "url('/marble.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full h-full rounded-3xl bg-white/60 border border-black/20 backdrop-blur-md flex items-center justify-center">
          {/* PIN Entry Screen */}
          <div className="w-full max-w-sm px-6 z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Lock icon */}
              <div className="pt-6 mb-4">
                <LockIcon
                  className={`w-14 h-14 text-[#e0b553] transition-all duration-300 ${shake ? "animate-shake" : ""}`}
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-xl font-ophelia text-[#0a0a09]/80 mb-2 tracking-wider">
                Enter PIN
              </h2>
              <p className="text-sm text-[#0a0a09]/50 mb-6 font-ophelia font-bold tracking-wider">
                Please enter the code
              </p>

              {/* PIN Dots */}
              {renderPinDots()}

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm mb-6 font-ophelia tracking-wider">
                  Incorrect PIN, Please try again.
                </p>
              )}

              {/* Keypad */}
              <div className="w-full grid grid-cols-3 gap-4 px-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
                  <button
                    key={num}
                    onClick={() => handleNumberPress(num.toString(), index)}
                    className="aspect-square flex items-center justify-center relative"
                  >
                    <div
                      className={`absolute inset-0 rounded-full bg-[#e0b553] opacity-0 transition-opacity duration-100 ${
                        activeButton === index ? "opacity-30" : ""
                      }`}
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        margin: "auto",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    ></div>
                    <div className="w-18 h-18 rounded-full border border-[#0a0a09]/20 flex items-center justify-center relative z-10">
                      <span className="text-2xl font-medium text-[#0a0a09]/80 font-classyvogue">
                        {num}
                      </span>
                    </div>
                  </button>
                ))}

                {/* Cancel button */}
                <button onClick={handleCancel} className="aspect-square flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <X className="w-6 h-6 text-[#0a0a09]/70" />
                  </div>
                </button>

                {/* 0 button */}
                <button onClick={() => handleNumberPress("0", 9)} className="aspect-square flex items-center justify-center relative">
                  <div
                    className={`absolute inset-0 rounded-full bg-[#e0b553] opacity-0 transition-opacity duration-100 ${
                      activeButton === 9 ? "opacity-30" : ""
                    }`}
                    style={{
                      width: "4.5rem",
                      height: "4.5rem",
                      margin: "auto",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  ></div>
                  <div className="w-18 h-18 rounded-full border border-[#0a0a09]/20 flex items-center justify-center relative z-10">
                    <span className="text-2xl font-medium text-[#0a0a09]/80 font-classyvogue">0</span>
                  </div>
                </button>

                {/* Delete button */}
                <button onClick={handleDelete} className="aspect-square flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0a0a09]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                      />
                    </svg>
                  </div>
                </button>
              </div>

              <button onClick={handleCancel} className="flex items-center justify-center">
                <p className="text-md text-[#0a0a09]/80 pb-6 mt-4 font-ophelia font-bold tracking-wider">Cancel</p>
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            20%,
            60% {
              transform: translateX(-5px);
            }
            40%,
            80% {
              transform: translateX(5px);
            }
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }

          @keyframes buttonPress {
            0% {
              transform: scale(1);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.3;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }

          .button-press-effect {
            animation: buttonPress 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Video background with fallback */}
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
      
      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-6 pt-6 pb-[20%]">
        <div className="w-full max-w-4xl bg-white/10 p-6 shadow-2xl rounded-4xl flex flex-col items-center justify-center mb-[10%]">
          <div className="w-full bg-white/70 backdrop-blur-[0px] rounded-3xl flex flex-col items-center justify-center">
          {/* Please */}
          <p className="text-3xl font-brittany text-[#0a0a09]/80 tracking-widest mb-14 mt-[10%]">
            Please
          </p>
          
          {/* RSVP text */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-[12rem] leading-[0.8] tracking-[0.1em] font-bold font-ophelia text-[#e0b553] text-center">
              <span className="block transform translate-x-1">RS</span>
              <span className="block transform -translate-x-1">VP</span>
            </div>
            <p className="text-2xl font-ophelia text-[#0a0a09]/80 tracking-wider mt-2">
              By 10th October
            </p>
          </div>
          
          {/* RSVP button */}
          <button
            onClick={() => {
              setShowPinScreen(true);
              setPin([]);
            }}
            className="px-8 py-3 rounded-full bg-transparent border-2 border-[#0a0a09]/80 text-[#0a0a09]/60 hover:bg-[#e0b553]/30 hover:border-[#e0b553]/80 transition-all duration-300 font-classyvogue font-bold tracking-wider text-lg mt-4 mb-8"
          >
            RSVP NOW
          </button>

          {/* Scroll Down indicator */}
          {/* <div 
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
          </div> */}
        </div>
      </div>
      
      {/* RSVP Form Modal */}
      {authenticated && (
        <RSVPModal 
          showForm={authenticated}
          setShowForm={(value) => {
            setAuthenticated(value);
            if (!value) {
              setPin([]); // Reset pin when closing the RSVP modal
            }
          }}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      
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
    </div>
  );
}