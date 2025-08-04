import { ChevronDown } from 'react-feather';
import { useState, useEffect } from 'react';

export default function DesktopDateScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const venuePhotos = [
    '/mobile-invitation.webp',
    '/venue-1.webp',
    '/venue-1.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % venuePhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative h-full w-full flex items-center justify-center p-20"
      style={{ backgroundImage: "url('/desktop-marble.webp')", backgroundSize: 'cover' }}
    >
      {/* Left Section: Photos Slideshow */}
      <div className="relative w-1/2 h-full rounded-3xl overflow-hidden shadow-lg mr-8">
        {/* Blurred background */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url('${venuePhotos[currentSlide]}')` }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-transparent"></div>
        
        {/* Current slide */}
        <div className="relative z-10 h-full w-full flex items-center justify-center p-18 transition-opacity duration-1000">
          <div 
            className="h-full w-full max-w-2xl bg-cover bg-center rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.02]"
            style={{ backgroundImage: `url('${venuePhotos[currentSlide]}')` }}
          ></div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-9 left-0 right-0 z-20 flex justify-center gap-2">
          {venuePhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Right Section: Date and Couple Names */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center px-12">
        {/* Date */}
        <h1 
          className="text-6xl mb-6 font-ophelia animate-fadeIn opacity-0 text-[#0a0a09]/80" 
          style={{ 
            animationDelay: '0.55s', 
            animationFillMode: 'forwards',
          }}
        >
          01.01.2026
        </h1>

        {/* Decorative elements */}
        <div 
          className="animate-fadeIn opacity-0 flex items-center space-x-6 mb-12"
          style={{ 
            animationDelay: '0.9s', 
            animationFillMode: 'forwards' 
          }}
        >
          <div className="w-24 h-px bg-[#0a0a09]/80"></div>
          <span className="text-[#0a0a09]/80 text-2xl">♥</span>
          <div className="w-24 h-px bg-[#0a0a09]/80"></div>
        </div>

        {/* Couple names */}
        <div 
          className="animate-fadeIn opacity-0" 
          style={{ 
            animationDelay: '0.7s', 
            animationFillMode: 'forwards' 
          }}
        >
          <p className="text-6xl font-brittany text-[#e0b553]">
            Kimberly & Anesu
          </p>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceReverse {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-bounceReverse {
          animation: bounceReverse 2s infinite;
        }
      `}</style>
    </div>
  );
}