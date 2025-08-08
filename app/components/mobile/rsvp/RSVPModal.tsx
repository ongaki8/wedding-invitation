import { useState, useEffect, useRef } from "react";
import { rsvpClient, initializeRsvpClient } from "../../../lib/supabase";
import { CalendarX, MailCheck, MailX, MessageCircleHeart, MessageSquareHeart } from "lucide-react";

interface RSVPModalProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: {
    name: string;
    email: string;
    attending: string;
    specialRequests: string;
    wellWishes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    attending: string;
    specialRequests: string;
    wellWishes: string;
  }>>;
}

interface SuccessModalProps {
  onClose: () => void;
  attending: string;
  email: string;
  emailSent: boolean;
}

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  attending: '',
  specialRequests: '',
  wellWishes: ''
};

const SuccessModal = ({ onClose, attending, email, emailSent }: SuccessModalProps) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-10 animate-fadeIn">
    <div className="relative bg-white/95 rounded-2xl shadow-xl max-w-md w-full p-8 animate-scaleIn">

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
      
      <div className="relative z-10 text-center">
        <h3 className="font-roze font-bold text-2xl text-[#0a0a09] tracking-wider mb-3">
          {attending === "yes" ? "THANK YOU" : "WE'LL MISS YOU"}
        </h3>
        <div className="w-16 h-px bg-[#0a0a09]/30 mx-auto mb-4"></div>
        
        {attending === "yes" ? (
          <>
            <p className="font-ophelia text-md tracking-wider text-[#0a0a09]/80 mb-4">
              We're thrilled you'll be joining us! Your presence means the world.
            </p>
            
            {emailSent ? (
              <div className="bg-green-50/56 p-3 rounded-lg mb-6 border border-green-300">
                <div className="flex justify-center mb-2">
                  <MailCheck className="w-5 h-5 text-green-500/70" strokeWidth={2} />
                </div>
                <p className="text-xs font-poppins-light text-[#0a0a09]/70 mb-2 text-center">
                  A confirmation email has been sent to <span className="font-bold text-[#d0a548]">{email}</span>
                </p>
                <div className="w-[30%] h-px bg-[#0a0a09]/30 mx-auto my-2"></div>
                <p className="text-xs font-poppins-light text-[#0a0a09]/70 text-center">
                  Didn't get the email? It might be hiding in your spam or junk folder.
                </p>
              </div>
            ) : (
              <div className="bg-red-50/56 p-3 rounded-lg mb-6 border border-red-300">
                <div className="flex justify-center mb-2">
                  <MailX className="w-5 h-5 text-red-500/70" strokeWidth={2} />
                </div>
                <p className="text-xs font-poppins-light text-[#0a0a09]/70 text-center">
                  We tried sending your confirmation email, but it didn't quite make it down the aisle.
                </p>
                <div className="w-[30%] h-px bg-[#0a0a09]/30 mx-auto my-2"></div>
                <p className="text-xs font-poppins-light text-[#0a0a09]/70 text-center">
                  Please try again, or contact us if the issue continues.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="font-ophelia text-md tracking-wider text-[#0a0a09]/80 mb-4">
              Your response is appreciated, and your presence will be missed.
            </p>
            
            <div className="bg-[#d0a548]/10 p-3 rounded-lg mb-6 border border-[#d0a548]/50">
              <div className="flex justify-center mb-2">
                <MessageSquareHeart className="w-5 h-5 text-[#d0a548]" strokeWidth={2} />
              </div>
              <p className="text-xs font-poppins-light text-[#0a0a09]/70 mb-2 text-center">
                We've noted your regrets, and we'll be thinking of you on our special day.
              </p>
              {emailSent && (
                <>
                  <div className="w-[30%] h-px bg-[#0a0a09]/30 mx-auto my-2"></div>
                  <p className="text-xs font-poppins-light text-[#0a0a09]/70 text-center">
                    A note of appreciation has been sent to <span className="font-bold text-[#d0a548]">{email}</span>
                  </p>
                </>
              )}
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#d0a548] rounded-lg text-sm font-classyvogue font-bold tracking-wider text-white hover:bg-[#d0a548]/90 transition-colors"
        >
          CLOSE
        </button>
      </div>
    </div>
  </div>
);

export default function RSVPModal({ 
  showForm, 
  setShowForm, 
  formData, 
  setFormData 
}: RSVPModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.attending) errors.attending = "Please select an option";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Save to database
      const isInitialized = await initializeRsvpClient();
      if (!isInitialized) {
        throw new Error("Service unavailable. Please try again later.");
      }

      const { error } = await rsvpClient
        .from('rsvp')
        .insert([{
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          special_requests: formData.attending === "yes" ? formData.specialRequests : null,
          well_wishes: formData.attending === "no" ? formData.wellWishes : null
        }]);

      if (error) throw error;

      // Confirmation email via API route
      const emailResponse = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          attending: formData.attending,
          message: formData.wellWishes
        }),
      });

      const emailResult = await emailResponse.json();
      setEmailSent(emailResponse.ok && emailResult.success);

      setShowSuccess(true);
      
    } catch (error: any) {
      console.error("RSVP submission error:", error);
      setSubmitError(
        error.message || "Failed to submit RSVP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!showForm) {
      setShowSuccess(false);
    }
  }, [showForm]);

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setShowForm(false);
    setFormData(INITIAL_FORM_DATA);
    setFormErrors({});
    setSubmitError(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(INITIAL_FORM_DATA);
    setFormErrors({});
    setSubmitError(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  if (!showForm) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
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
          
          {/* Content container */}
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="font-roze font-bold text-3xl text-[#0a0a09] tracking-wider mb-3">
                RSVP
              </h3>
              <div className="w-16 h-px bg-[#0a0a09]/30 mx-auto"></div>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4 mb-6">

                {/* Attendance Selection */}
                <div className="flex flex-col space-y-3 mb-4">
                  <p className="text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-3 text-left">
                    Will you be attending? *
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
                  {formErrors.attending && (
                    <p className="text-red-500 text-xs font-ophelia font-bold tracking-wide">{formErrors.attending}</p>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-1 text-left">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    inputMode="text"
                    enterKeyHint="done"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-2 py-2 rounded-lg border ${
                      formErrors.name ? "border-red-500" : "border-[#0a0a0999]"
                    } focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09]/80 text-sm placeholder-[#0a0a09]/50 placeholder:text-sm`}
                    placeholder="Your Name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-2 font-ophelia font-bold tracking-wide">{formErrors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-1 text-left">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-2 py-2 rounded-lg border ${
                      formErrors.email ? "border-red-500" : "border-[#0a0a09]/20"
                    } focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09]/80 text-sm placeholder-[#0a0a09]/50 placeholder:text-sm`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-2 font-ophelia font-bold tracking-wide">{formErrors.email}</p>
                  )}
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
                      className="w-full px-2 py-2 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09]/80 text-sm placeholder-[#0a0a09]/50 placeholder:text-sm"
                      placeholder="Vegetarian, allergies, accessibility needs, etc."
                    />
                  </div>
                )}

                {/* Well Wishes */}
                {formData.attending === "no" && (
                  <div className="mt-4 transition-all duration-300 ease-in-out">
                    <label htmlFor="wellWishes" className="block text-sm font-ophelia font-bold text-[#0a0a09]/80 mb-1 text-left">
                      Message for the Couple
                    </label>
                    <textarea
                      id="wellWishes"
                      name="wellWishes"
                      value={formData.wellWishes}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={400}
                      className="w-full px-2 py-2 rounded-lg border border-[#0a0a09]/20 focus:outline-none focus:ring-1 focus:ring-[#e0b553] font-classyvogue text-[#0a0a09]/80 text-sm placeholder-[#0a0a09]/50 placeholder:text-sm"
                      placeholder="Your well wishes to Kimberly & Anesu"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-[#0a0a09]/60 font-ophelia">
                        {formData.wellWishes.length}/400 characters
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Submission Error */}
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg font-ophelia">
                  {submitError}
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-[#0a0a09]/60 rounded-lg text-sm font-classyvogue font-bold tracking-wider text-[#0a0a09] hover:bg-[#0a0a09]/10 transition-colors disabled:opacity-50"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#d0a548] rounded-lg text-sm font-classyvogue font-bold tracking-wider text-white hover:bg-[#d0a548]/90 transition-colors disabled:opacity-50 flex items-center justify-center min-w-24"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    formData.attending === "yes" ? "RSVP" : "SEND REGRETS"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal 
          onClose={handleSuccessClose} 
          attending={formData.attending}
          email={formData.email}
          emailSent={emailSent}
        />
      )}
    </>
  );
}