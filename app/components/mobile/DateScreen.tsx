import { ChevronDown } from 'react-feather';
import { useState, useEffect } from 'react';

export default function MobileDateScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const venuePhotos = [
    '/kim-anesu-1.webp',
    '/kim-anesu-2.webp',
    '/kim-anesu-3.webp',
    '/kim-anesu-4.webp',
    '/kim-anesu-5.webp',
    '/kim-anesu-6.webp',
    '/kim-anesu-7.webp',
    '/kim-anesu-8.webp',
  ];

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % venuePhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const section1Height = windowHeight * 0.85;

  return (
    <div 
      className="relative h-full w-full flex flex-col p-6 "
      style={{ backgroundImage: "url('/marble.webp')", backgroundSize: 'cover' }}
    >
      {/* Photos Slideshow */}
      <div 
        className="relative w-full rounded-3xl overflow-hidden shadow-lg"
        style={{ height: `${section1Height}px` }}
      >
        {/* Blurred background */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url('${venuePhotos[currentSlide]}')` }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-transparent"></div>
        
        {/* Current slide */}
        <div className="relative z-10 h-full w-full flex items-center justify-center p-6 transition-opacity duration-1000">
          <div 
            className="h-full w-full max-w-md bg-cover bg-center rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.02]"
            style={{ backgroundImage: `url('${venuePhotos[currentSlide]}')` }}
          ></div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {venuePhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Date and Couple Names */}
      <div className="flex-1 w-full flex flex-col items-center justify-start px-6 pt-8 pb-12">
        {/* Date */}
        <h1 
          className="text-4xl md:text-5xl mb-1 font-ophelia animate-fadeIn opacity-0 text-[#0a0a09]/80" 
          style={{ 
            animationDelay: '0.55s', 
            animationFillMode: 'forwards',
          }}
        >
          01.01.2026
        </h1>

        {/* Elements */}
        <div 
          className="animate-fadeIn opacity-0 flex items-center space-x-4 mb-4"
          style={{ 
            animationDelay: '0.9s', 
            animationFillMode: 'forwards' 
          }}
        >
          <div className="w-16 h-px bg-[#0a0a09]/80"></div>
          <span className="text-[#0a0a09]/80 text-3xl">♥</span>
          <div className="w-16 h-px bg-[#0a0a09]/80"></div>
        </div>

        {/* Couple Names */}
        <div 
          className="animate-fadeIn opacity-0 mb-2" 
          style={{ 
            animationDelay: '0.7s', 
            animationFillMode: 'forwards' 
          }}
        >
          <p className="text-4xl md:text-5xl font-brittany text-[#e0b553] mb-[20%]">
          {/* <p className="text-4xl md:text-5xl font-brittany text-[#0a0a09]/80 mb-2"> */}
            Kimberly & Anesu
          </p>
        </div>

        

        {/* Indicator */}
        <div 
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