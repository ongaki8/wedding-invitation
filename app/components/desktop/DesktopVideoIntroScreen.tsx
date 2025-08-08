'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'react-feather';

export default function DesktopVideoIntroScreen({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handlePlayVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setShowVideo(true);
      setShowSkipButton(true);
    } catch (error) {
      console.error("Error playing video:", error);
      onComplete();
    }
  };

  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const simulateProgress = () => {
      let simulatedProgress = 0;
      progressInterval.current = setInterval(() => {
        simulatedProgress += 3;
        if (simulatedProgress >= 100) {
          clearInterval(progressInterval.current as NodeJS.Timeout);
          progressInterval.current = null;
          setIsLoading(false);
        }
        setProgress(simulatedProgress);
      }, 100);
    };

    const handleLoadedData = () => {
      if (video.buffered.length > 0) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        const loaded = video.buffered.end(0);
        const duration = video.duration || 1;
        const newProgress = (loaded / duration) * 100;
        setProgress(Math.min(100, newProgress));
        
        if (newProgress >= 100) {
          setIsLoading(false);
        }
      } else {
        simulateProgress();
      }
    };

    const handleEnded = () => {
      onComplete();
    };

    simulateProgress();
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-black z-50 flex items-center justify-center"
      style={{ backgroundImage: "url('/desktop-floral.webp')", backgroundSize: 'cover'}}
      >
         <div className="absolute inset-0 backdrop-blur-xs"></div>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-4xl bg-white/10 p-6 backdrop-blur-xs shadow-2xl rounded-4xl flex flex-col items-center justify-center">
            <div className="w-full bg-white/70 backdrop-blur-xs rounded-3xl shadow-lg flex flex-col items-center justify-center">
            <div className="text-[#0a0a09]/90 mt-10 text-xl font-ophelia tracking-widest mb-4">Preparing your invitation...</div>
            <div className="w-1/2 h-2 bg-[#0a0a09]/90 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#e0b553]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-[#0a0a09]/90 mt-4 text-xl font-ophelia tracking-widest mb-10">{Math.round(progress)}%</div>
            </div>
            </div>
            
            <div className="absolute bottom-4 text-[#0a0a09]/90 text-md font-poppins-light tracking-wide mb-10 z-50">
              <a 
                href="https://digi.reb.ac" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Developed by digiREB
              </a>
            </div>
            

          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x-webkit-airplay="allow"
        >
          <source src="/desktop-intro-screen.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Invitation Card */}
      {!isLoading && !showVideo && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{ backgroundImage: "url('/desktop-floral.webp')", backgroundSize: 'cover' }}
        >
          <div className="relative text-center max-w-4xl mx-auto p-8 rounded-3xl shadow-md border border-[#0a0a09]/10 overflow-hidden">

            {/* Blurred background */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-all duration-1000 z-0"
              style={{ backgroundImage: "url('/desktop-intro-screen.webp')" }}
            ></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent z-0"></div>
            
            {/* Content Container */}
            <div className="relative z-10 backdrop-blur-sm rounded-3xl">

              {/* Photo Background */}
              <div 
                className="relative h-96 w-full rounded-tl-2xl rounded-tr-2xl"
                style={{
                  backgroundImage: "url('/desktop-intro-screen.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-transparent"></div>
              </div>

              {/* Invitation */}
              <div className="text-center px-10 pt-4 pb-8 bg-white rounded-bl-2xl rounded-br-2xl">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/ceremony.svg" 
                    alt="Ceremony" 
                    className="w-32 h-32"
                  />
                </div>

                <h3 className="font-roze text-3xl font-bold text-[#0a0a09] tracking-wider mb-6">
                  YOU'RE INVITED
                </h3>
                
                <p className="text-[#0a0a09]/80 font-ophelia text-lg mb-8">
                  We are excited to share this special day with the people we love most. 
                  Your presence would mean the world to us as we begin this beautiful chapter together.
                </p>

                {/* Open Button */}
                <button
                  onClick={handlePlayVideo}
                  className="w-full max-w-xs mx-auto flex items-center justify-center space-x-3 bg-[#e0b553] hover:bg-[#d0a548] text-white text-lg font-classyvogue font-bold tracking-widest py-4 px-8 rounded-xl transition-colors mb-4 cursor-pointer"
                >
                  <Mail size={24} />
                  <span>OPEN INVITATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {showSkipButton && (
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 font-classyvogue tracking-wider text-base font-bold bg-black/50 text-white border-1 border-white/20 px-6 py-3 rounded-full z-10 cursor-pointer"
        >
          SKIP VIDEO
        </button>
      )}
    </div>
  );
}