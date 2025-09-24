'use client';
import { useState, useRef, useEffect, useCallback } from "react";
import DesktopRSVPModal from "./rsvp/DesktopRSVPModal";
import { Lock } from "lucide-react";

export default function DesktopRSVPScreen() {
  const [showNameScreen, setShowNameScreen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    specialRequests: "",
    wellWishes: ""
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch name suggestions from Supabase
  const fetchSuggestions = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch('/api/rsvp/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: searchTerm }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      
      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(Boolean(data.suggestions && data.suggestions.length > 0));
      setSelectedSuggestionIndex(-1);
    } catch (err) {
      console.error('Failed to fetch name suggestions:', err);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  // Handle name input changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (name.trim().length >= 2) {
        fetchSuggestions(name.trim());
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [name, fetchSuggestions]);

  // Keyboard navigation for suggestions and form
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!showNameScreen) return;

    if (e.key === 'ArrowDown' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && selectedSuggestionIndex >= 0) {
        // Select from suggestions
        setName(suggestions[selectedSuggestionIndex]);
        setShowSuggestions(false);
      } else {
        // Submit the form
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      if (showSuggestions) {
        setShowSuggestions(false);
      } else {
        setShowNameScreen(false);
        setName("");
        setError(false);
      }
    }
  }, [showNameScreen, showSuggestions, suggestions, selectedSuggestionIndex]);

  useEffect(() => {
    if (showNameScreen) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus input when screen opens
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        clearTimeout(t);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNameScreen, handleKeyDown]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Video autoplay failed:", err);
      });
    }
  }, []);

  // Name validation
  const validateName = async (nameToValidate: string) => {
    if (!nameToValidate.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/rsvp/validate-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameToValidate }),
      });
      
      if (!response.ok) {
        throw new Error('Validation failed');
      }
      
      const data = await response.json();
      
      if (data.isValid) {
        setAuthenticated(true);
        setShowNameScreen(false);
        setName("");
        setFormData(prev => ({ ...prev, name: data.validatedName || nameToValidate.trim() }));
        setError(false);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          inputRef.current?.focus();
        }, 1500);
      }
    } catch (err) {
      console.error('Name validation failed:', err);
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        inputRef.current?.focus();
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (name.trim() && !isLoading) {
      validateName(name);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(false);
  };

  if (showNameScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center backdrop-blur-sm z-50"
        style={{ backgroundImage: "url('/desktop-marble.webp')" }}>
        
        <div className="w-full max-w-xl px-8 py-10">
          <div className="bg-white/20 backdrop-blur-xs rounded-4xl border border-black/10 shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col items-center">

              {/* Enter Name */}
              <div className="flex flex-col items-center">
                <Lock className={`w-10 h-10 text-[#e0b553] mb-3 ${shake ? "animate-shake" : ""}`} />
                <h2 className="text-2xl font-bold text-[#0a0a09]/90 font-ophelia tracking-wider">
                  Enter Your Name
                </h2>
                <p className="text-sm text-[#0a0a09]/70 font-ophelia font-bold tracking-wider my-4">
                  Please enter your full name as it appears on the invitation list.
                </p>
              </div>

              {/* Name Input */}
              <div className="relative w-full max-w-sm mb-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-lg text-[#0a0a09]/60 font-light rounded-lg border-2 transition-all duration-200 font-classyvogue bg-white/80 placeholder-[#0a0a09]/30 placeholder:font-light placeholder:text-md focus:outline-none focus:ring-2 focus:ring-[#e0b553] ${
                    error
                      ? 'border-red-500 bg-red-50/50'
                      : 'border-[#e0b553]/50 focus:border-0 focus:border-[#e0b553]'
                  } ${shake ? 'animate-shake' : ''}`}
                  style={{
                    caretColor: '#e0b553'
                  }}
                  placeholder="Enter your name..."
                  autoComplete="off"
                  disabled={isLoading}
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border border-[#e0b553]/30 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-4 py-3 cursor-pointer transition-colors ${
                          index === selectedSuggestionIndex
                            ? 'bg-[#e0b553]/20'
                            : 'hover:bg-[#e0b553]/10'
                        } ${
                          index < suggestions.length - 1
                            ? 'border-b border-[#e0b553]/10'
                            : ''
                        }`}
                      >
                        <span className="text-[#0a0a09]/90 font-classyvogue">
                          {suggestion}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm my-2 font-bold font-ophelia tracking-wider text-center">
                  Name not found. Please check your invitation or try a different spelling.
                </p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || isLoading}
                className="w-full max-w-sm px-6 py-3 bg-[#e0b553] text-white rounded-lg font-classyvogue font-bold tracking-wider text-lg transition-all duration-200 hover:bg-[#d4a73c] disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
              >
                {isLoading ? 'Verifying...' : 'VERIFY NAME'}
              </button>

              {/* Cancel */}
              <div className="mt-6 flex justify-center w-full">
                <button
                  onClick={() => {
                    setShowNameScreen(false);
                    setName("");
                    setError(false);
                    setShowSuggestions(false);
                  }}
                  className="text-md font-ophelia tracking-wider font-bold text-[#0a0a09]/80 hover:text-red-500 transition-colors px-4 py-2 cursor-pointer"
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
          {/* fallback image omitted inside <video> */}
        </video>
        <img src="/DesktopRSVP.webp" alt="RSVP Background" className="hidden" />
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
            
            {/* RSVP Button */}
            <div className="w-full flex justify-center mt-8 mb-[5%]">
              <button
                onClick={() => {
                  setShowNameScreen(true);
                  setName("");
                  setError(false);
                  setSuggestions([]);
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
                setName("");
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