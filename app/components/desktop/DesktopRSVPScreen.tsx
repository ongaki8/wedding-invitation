import { useState, useRef, useEffect } from "react";

export default function DesktopRSVPScreen() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    specialRequests: ""
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP Submitted:", formData);
    setShowForm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
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
      
      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-12">
        <div className="flex flex-col items-center justify-center transform -translate-y-12">
          {/* "Please" text */}
          <p className="text-4xl font-brittany text-[#0a0a09]/80 tracking-widest mb-16 mt-[10%]">
            Please
          </p>
          
          {/* Centered RSVP text */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-[16rem] leading-[0.8] tracking-[0.1em] font-bold font-ophelia text-amber-50 text-center">
              <span className="block">RSVP</span>
            </div>
            <p className="text-3xl font-ophelia text-[#0a0a09]/80 tracking-wider mt-8">
              By 10 October
            </p>
          </div>
          
          {/* RSVP button */}
          <button
            onClick={() => setShowForm(true)}
            className="px-12 py-4 rounded-full bg-transparent border-2 border-[#0a0a09]/80 text-[#0a0a09]/80 hover:bg-[#e0b553]/60 hover:border-[#e0b553]/80 hover:text-white transition-all duration-300 font-classyvogue font-bold tracking-wider text-xl mt-8 mb-[5%] cursor-pointer"
          >
            RSVP NOW
          </button>
        </div>
      </div>
      
      {/* RSVP Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div 
            ref={modalRef}
            className="relative bg-white/95 rounded-2xl shadow-xl max-w-2xl w-full p-8 animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Marble Background */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-50 z-0"
              style={{
                backgroundImage: "url('/desktop-marble.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            
            {/* Content container */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="font-roze font-bold text-4xl text-[#0a0a09] tracking-wider mb-4">
                  RSVP
                </h3>
                <div className="w-20 h-px bg-[#0a0a09]/30 mx-auto"></div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6 mb-8">
                  {/* Attendance Selection */}
                  <div className="flex flex-col space-y-4 mb-6">
                    <p className="text-base font-ophelia font-bold text-[#0a0a09]/90 mb-4 text-left">
                      Will you be attending?
                    </p>
                    <div className="flex items-center space-x-8">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={formData.attending === "yes"}
                          onChange={handleInputChange}
                          className="h-5 w-5 border border-[#0a0a09]/80 focus:ring-0 focus:ring-offset-0 text-[#e0b553] cursor-pointer"
                        />
                        <span className="font-classyvogue text-lg text-[#0a0a09]/70">Yes, with joy!</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={formData.attending === "no"}
                          onChange={handleInputChange}
                          className="h-5 w-5 border border-[#0a0a0999] focus:ring-0 focus:ring-offset-0 text-[#e0b553] cursor-pointer"
                        />
                        <span className="font-classyvogue text-lg text-[#0a0a09]/70">Regretfully, No.</span>
                      </label>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-base font-ophelia font-bold text-[#0a0a09]/90 mb-2 text-left">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 rounded-lg border border-[#0a0a0999] focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09] text-base placeholder-[#0a0a09]/50"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-base font-ophelia font-bold text-[#0a0a09]/90 mb-2 text-left">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09] text-base placeholder-[#0a0a09]/50"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Dietary/Special Requests */}
                  {formData.attending === "yes" && (
                    <div>
                      <label htmlFor="specialRequests" className="block text-base font-ophelia font-bold text-[#0a0a09]/90 mb-2 text-left">
                        Dietary Restrictions or Special Requests
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-3 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09] text-base placeholder-[#0a0a09]/50"
                        placeholder="Vegetarian, allergies, accessibility needs, etc."
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center space-x-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 border border-[#0a0a09]/60 rounded-lg text-base font-classyvogue font-bold tracking-wider text-[#0a0a09] hover:bg-[#0a0a09]/5 transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#d0a548] rounded-lg text-base font-classyvogue font-bold tracking-wider text-white hover:bg-[#d0a548]/90 transition-colors cursor-pointer"
                  >
                    {formData.attending === "yes" ? "RSVP" : "SEND REGRETS"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  );
}