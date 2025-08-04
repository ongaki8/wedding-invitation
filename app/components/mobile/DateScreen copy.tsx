import { ChevronDown } from 'react-feather';

export default function MobileDateScreen() {
  return (
    <div className="relative h-full w-full flex items-end justify-center pb-10">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/mobile-invitation.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 pb-10">

        {/* Couple names */}
        <h1 className="text-4xl md:text-4xl my-8 font-ophelia animate-fadeIn opacity-0" 
            style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
          01.01.2026
        </h1>

        <div className="animate-fadeIn opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <p className="text-4xl font-brittany text-[#e0b553]">
            Kimberly & Anesu
          </p>
        </div>

        {/* Scroll Down - Matching InvitationScreen style but reversed */}
        <div className="mt-12 animate-fadeIn opacity-0 relative z-20" 
             style={{ 
               animationDelay: '1.5s', 
               animationFillMode: 'forwards',
             }}>
          <div className="flex flex-col items-center justify-center">
            <ChevronDown className="text-white/80 h-6 w-6 animate-bounceReverse mb-2" />
            <span className="text-xs tracking-widest font-ophelia">Swipe Down</span>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceReverse {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.65s ease-in forwards;
        }
        .animate-bounceReverse {
          animation: bounceReverse 2s infinite;
        }
      `}</style>
    </div>
  );
}