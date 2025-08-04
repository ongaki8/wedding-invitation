import { useState, useRef, useEffect } from "react";

export default function MobileRSVPScreen() {
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

  // Close modal when clicking outside
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

  // Auto-play video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Video background with fallback */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          poster="/rsvp.webp"
        >
          <source src="/rings.mp4" type="video/mp4" />
          <img src="/rsvp.webp" alt="Wedding background" className="h-full w-full object-cover" />
        </video>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/5 to-black/5"></div>
      
      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <p className="text-4xl mb-8 font-brittany text-[#0a0a09]/80 tracking-widest">
          Please
        </p>
        
        <div className="my-12">
          <div className="text-[14rem] leading-[0.8] tracking-[0.1em] font-bold font-ophelia text-amber-50">
            <span className="block">RS</span>
            <span className="block">VP</span>
          </div>
          <p className="text-2xl mt-8 font-ophelia text-[#0a0a09]/80 text-center tracking-wider">
            By 10 October
          </p>
        </div>
        
        {/* Centered RSVP button */}
        <div className="w-full flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full bg-transparent border-2 border-[#0a0a09]/80 text-[#0a0a09]/80 hover:bg-[#e0b553]/20 transition-all duration-300 font-ophelia tracking-wider text-lg flex items-center justify-center"
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
            className="bg-white/95 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h3 className="font-roze text-2xl text-[#0a0a09] tracking-wider mb-2">
                RSVP
              </h3>
              <div className="w-16 h-px bg-[#0a0a09]/30 mx-auto"></div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                {/* Attendance Selection with Gold Radio Buttons */}
                <div className="flex flex-col space-y-3 mb-4">
                  <p className="text-sm font-ophelia text-[#0a0a09]/80 mb-3 text-left">
                    Will you be attending?
                  </p>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.attending === "yes"}
                        onChange={handleInputChange}
                        className="h-4 w-4 border border-[#0a0a09]/80 focus:ring-0 focus:ring-offset-0 text-[#e0b553]"
                      />
                      <span className="font-ophelia text-[#0a0a09]">Yes, with joy!</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formData.attending === "no"}
                        onChange={handleInputChange}
                        className="h-4 w-4 border border-[#0a0a0999] focus:ring-0 focus:ring-offset-0 text-[#e0b553]"
                      />
                      <span className="font-ophelia text-[#0a0a09]">Regretfully, No.</span>
                    </label>
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-ophelia text-[#0a0a09]/80 mb-1 text-left">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-[#0a0a0999] focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-ophelia text-[#0a0a09] placeholder-[#0a0a09]/50"
                    placeholder="Your Name"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-ophelia text-[#0a0a09]/80 mb-1 text-left">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-ophelia text-[#0a0a09] placeholder-[#0a0a09]/50"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Dietary/Special Requests */}
                {formData.attending === "yes" && (
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-ophelia text-[#0a0a09]/80 mb-1 text-left">
                      Dietary Restrictions or Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-ophelia text-[#0a0a09] placeholder-[#0a0a09]/50"
                      placeholder="Vegetarian, allergies, accessibility needs, etc."
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-[#0a0a09]/60 rounded-lg text-sm font-roze tracking-wider text-[#0a0a09] hover:bg-[#0a0a09]/10 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d0a548] rounded-lg text-sm font-roze tracking-wider text-white hover:bg-[#d0a548] transition-colors"
                >
                  {formData.attending === "yes" ? "RSVP" : "SEND REGRETS"}
                </button>
              </div>
            </form>
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