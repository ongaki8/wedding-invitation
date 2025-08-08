import { useState, useEffect, useRef } from 'react';

export default function DesktopDateScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const venuePhotos = [
    '/desktop-kim-anesu-1.webp',
    '/desktop-kim-anesu-2.webp',
    '/desktop-kim-anesu-3.webp',
    '/desktop-kim-anesu-4.webp',
    '/desktop-kim-anesu-5.webp',
    '/desktop-kim-anesu-6.webp',
    '/desktop-kim-anesu-7.webp',
    '/desktop-kim-anesu-8.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % venuePhotos.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setTranslateX(0);
    if (slideRef.current) {
      slideRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (translateX > threshold) {
      setCurrentSlide((prev) => (prev - 1 + venuePhotos.length) % venuePhotos.length);
    } else if (translateX < -threshold) {
      setCurrentSlide((prev) => (prev + 1) % venuePhotos.length);
    }
    
    setTranslateX(0);
    if (slideRef.current) {
      slideRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
      if (slideRef.current) {
        slideRef.current.style.cursor = 'grab';
      }
    }
  };

  return (
    <div 
      className="relative h-full w-full flex items-center justify-center p-20"
      style={{ backgroundImage: "url('/desktop-marble.webp')", backgroundSize: 'cover' }}
    >
      {/* Photo Slideshow */}
      <div 
        className="relative w-1/2 h-full rounded-3xl overflow-hidden shadow-lg mr-12"
        ref={slideRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
      >
        {/* Blurred Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url('${venuePhotos[currentSlide]}')` }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-transparent"></div>
        
        {/* Current Slide */}
        <div 
          className="relative z-10 h-full w-full flex items-center justify-center p-12 transition-opacity duration-1000"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
          }}
        >
          <div 
            className="h-full w-full max-w-2xl bg-cover bg-center rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.02]"
            style={{ backgroundImage: `url('${venuePhotos[currentSlide]}')` }}
          ></div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
          {venuePhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Date and Names */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center px-12">
        {/* Date */}
        <h1 
          className="text-7xl mb-8 font-ophelia animate-fadeIn opacity-0 text-[#0a0a09]/80" 
          style={{ 
            animationDelay: '0.55s', 
            animationFillMode: 'forwards',
          }}
        >
          01.01.2026
        </h1>

        {/* Divider */}
        <div 
          className="animate-fadeIn opacity-0 flex items-center space-x-8 mb-12"
          style={{ 
            animationDelay: '0.9s', 
            animationFillMode: 'forwards' 
          }}
        >
          <div className="w-32 h-px bg-[#0a0a09]/80"></div>
          <span className="text-[#0a0a09]/80 text-3xl">♥</span>
          <div className="w-32 h-px bg-[#0a0a09]/80"></div>
        </div>

        {/* Kim & Anesu */}
        <div 
          className="animate-fadeIn opacity-0" 
          style={{ 
            animationDelay: '0.7s', 
            animationFillMode: 'forwards' 
          }}
        >
          <p className="text-7xl font-brittany text-[#e0b553]">
            Kimberly & Anesu
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}