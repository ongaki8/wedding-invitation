import { useState, useEffect, useRef } from "react";

interface RSVPModalProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: {
    name: string;
    email: string;
    attending: string;
    specialRequests: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    attending: string;
    specialRequests: string;
  }>>;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RSVPModal({ 
  showForm, 
  setShowForm, 
  formData, 
  setFormData, 
  handleSubmit 
}: RSVPModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
  }, [showForm, setShowForm]);

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        ref={modalRef}
        className="relative bg-white/95 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scaleIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Marble Background */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-50 z-0"
          style={{
            backgroundImage: "url('/marble.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        
        {/* Content container with relative z-index */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h3 className="font-roze font-bold text-3xl text-[#0a0a09] tracking-wider mb-3">
              RSVP
            </h3>
            <div className="w-16 h-px bg-[#0a0a09]/30 mx-auto"></div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {/* Attendance Selection with Gold Radio Buttons */}
              <div className="flex flex-col space-y-3 mb-4">
                <p className="text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-3 text-left">
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
                    <span className="font-classyvogue text-sm text-[#0a0a09]/80">Yes, with joy!</span>
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
                    <span className="font-classyvogue text-sm text-[#0a0a09]/80">Regretfully, No.</span>
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-1 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-2 rounded-lg border border-[#0a0a0999] focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09] text-sm placeholder-[#0a0a09]/50"
                  placeholder="Your Name"
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-1 text-left">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-2 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09] text-sm placeholder-[#0a0a09]/50"
                  placeholder="your@email.com"
                />
              </div>

              {/* Dietary/Special Requests */}
              {formData.attending === "yes" && (
                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-1 text-left">
                    Dietary Restrictions or Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-2 py-2 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09] text-sm placeholder-[#0a0a09]/50"
                    placeholder="Vegetarian, allergies, accessibility needs, etc."
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-[#0a0a09]/60 rounded-lg text-sm font-classyvogue font-bold tracking-wider text-[#0a0a09] hover:bg-[#0a0a09]/10 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#d0a548] rounded-lg text-sm font-classyvogue font-bold tracking-wider text-white hover:bg-[#d0a548] transition-colors"
              >
                {formData.attending === "yes" ? "RSVP" : "SEND REGRETS"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}