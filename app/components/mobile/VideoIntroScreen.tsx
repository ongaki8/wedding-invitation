// components/mobile/VideoIntroScreen.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronDown } from 'react-feather';
import { useAudio } from '@/contexts/AudioContext';

export default function VideoIntroScreen({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { playAudio } = useAudio();

  const handlePlayVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setShowVideo(true);
      setShowSkipButton(true);
      playAudio(); // Start playing the audio when video starts
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
    style={{ backgroundImage: "url('/floral.webp')", backgroundSize: 'cover'}}
      >

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
          >
            
            <div className="absolute inset-0 backdrop-blur-[1px]"></div>

            <div className="w-full max-w-4xl bg-white/20 p-6 shadow-2xl rounded-4xl flex flex-col items-center justify-center">

            <div className="w-full bg-white/70 backdrop-blur-xs rounded-3xl shadow-sm flex flex-col items-center justify-center">

            <div className="text-[#0a0a09]/90 font-ophelia font-bold tracking-widest mt-6 mb-4">Preparing your Invitation...</div>
            <div className="w-3/4 h-2 bg-[#0a0a09]/90 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#e0b553]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-[#0a0a09]/90 font-ophelia font-bold tracking-widest mt-4 mb-4">{Math.round(progress)}%</div>
            </div>
            </div>

            <div className="absolute bottom-4 text-[#0a0a09]/90 text-md font-poppins-light mb-[20%] z-50">
              <a 
                href="https://ongaki.website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Developed by ONG
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
          <source src="/mobile-intro-screen.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Invitation Card */}
      {!isLoading && !showVideo && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pt-6 pb-10"
          style={{ backgroundImage: "url('/floral.webp')", backgroundSize: 'cover' }}
        >
          <div className="relative text-center w-full max-w-md mx-6 p-6 rounded-3xl shadow-sm border border-[#0a0a09]/10 overflow-hidden">

            {/* Blurred background container */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-all duration-1000 z-0"
              style={{ backgroundImage: "url('/mobile-intro-screen.webp')" }}
            ></div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent z-0"></div>
            
            {/* Content container */}
            <div className="relative z-10 backdrop-blur-sm rounded-2xl">

              {/* Photo Background */}
              <div 
                className="relative h-64 w-full rounded-tl-2xl rounded-tr-2xl"
                style={{
                  backgroundImage: "url('/mobile-intro-screen.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-transparent"></div>
              </div>

              {/* Content Area */}
              <div className="text-center px-6 pt-2 pb-6 bg-white rounded-bl-2xl rounded-br-2xl">
                <div className="flex justify-center mb-2">
                  <img 
                    src="/ceremony.svg" 
                    alt="Ceremony" 
                    className="w-24 h-24"
                  />
                </div>

                <h3 className="font-roze text-2xl font-bold text-[#0a0a09] tracking-wider mb-2">
                  YOU'RE INVITED
                </h3>
                
                <p className="text-[#0a0a09]/80 font-ophelia tracking-wide text-base mb-6">
                  Surrounded by the people we love most, we look forward to sharing this unforgettable day.
                </p>

                {/* Action button */}
                <button
                  onClick={handlePlayVideo}
                  className="w-full flex items-center justify-center space-x-2 bg-[#e0b553] hover:bg-[#d0a548] text-white text-md font-classyvogue font-bold tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  <Mail size={20} />
                  <span>OPEN INVITATION</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Down */}
              <div 
                className="animate-fadeIn opacity-0" 
                style={{ 
                  animationDelay: '1.5s', 
                  animationFillMode: 'forwards',
                }}
              >
                <div className="flex flex-col items-center justify-center mb-2">
                  <ChevronDown className="text-gray-400/0 h-8 w-8 animate-bounceReverse mb-2" />
                </div>
              </div>
        </div>
      )}

      {/* Skip button */}
      {showSkipButton && (
        <button
          onClick={onComplete}
          className="absolute bottom-[12%] left-1/2 transform -translate-x-1/2 font-classyvogue tracking-wider text-sm font-bold bg-black/50 text-white border-1 border-white/20 px-4 py-2 rounded-full z-10 cursor-pointer"
        >
          SKIP VIDEO
        </button>
      )}
    </div>
  );
}