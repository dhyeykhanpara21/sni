/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Heart, Star, Volume2, VolumeX, Sparkles, Gift, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section } from './types';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { Badge } from '@/components/ui/badge';
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from '@/components/ui/animated-slideshow';
import { Player } from "@remotion/player";
import { DataFlowPipes } from "@/components/ui/data-flow-pipes";

// --- Global Constants ---
const FRIEND_NAME = "SALONI";

// --- Sub-Components ---

const KineticText = ({ text, scrollProgress, range }: { text: string, scrollProgress: any, range: [number, number] }) => {
  const x = useTransform(scrollProgress, range, [100, -100]);
  const springX = useSpring(x, { damping: 20, stiffness: 100 });

  return (
    <motion.div style={{ x: springX }} className="kinetic-text whitespace-nowrap select-none">
      {text}
    </motion.div>
  );
};

const KineticTextReverse = ({ text, scrollProgress, range }: { text: string, scrollProgress: any, range: [number, number] }) => {
  const x = useTransform(scrollProgress, range, [-100, 100]);
  const springX = useSpring(x, { damping: 20, stiffness: 100 });

  return (
    <motion.div style={{ x: springX }} className="kinetic-text whitespace-nowrap select-none text-pink-200">
      {text}
    </motion.div>
  );
};

const Intro = ({ onNext }: { onNext: () => void; key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="section-container relative overflow-hidden bg-white"
    >
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.05, 0.15, 0.05], 
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            className="absolute bg-pink-200 rounded-full blur-[120px]"
            style={{
              width: `${400 + Math.random() * 400}px`,
              height: `${400 + Math.random() * 400}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-start w-full max-w-7xl relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="kinetic-text mb-[-2vw]"
        >
          HAPPY
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="kinetic-text text-pink-200 mb-[-2vw]"
        >
          BIRTHDAY
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="kinetic-text"
        >
          {FRIEND_NAME}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-start"
        >
          <div className="flex items-center gap-6 mb-4">
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-pink-400"
            >
              <Sparkles size={48} strokeWidth={1.5} />
            </motion.div>
            <span className="text-pink-500 font-black text-4xl md:text-5xl tracking-widest uppercase">APRIL 17</span>
          </div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-pink-200 font-bold text-lg tracking-[0.6em] uppercase pl-20"
          >
            The world got a little brighter
          </motion.span>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-20 right-20 z-10"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="group relative flex items-center gap-8 text-pink-500 font-black uppercase tracking-[0.4em] text-sm"
        >
          <span className="relative z-10 transition-colors group-hover:text-pink-600">START JOURNEY</span>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-pink-500"
            />
            <div className="w-12 h-12 rounded-full border border-pink-500 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="w-1 h-1 bg-pink-300 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

const MemorySpace = ({ onNext }: { onNext: () => void; key?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const memories = [
    { id: 1, img: "https://images.unsplash.com/photo-1511688858344-18558b2d395a?auto=format&fit=crop&w=600&q=80", title: "THE FIRST LAUGH", sub: "A moment frozen in time", range: [0, 0.15] },
    { id: 2, img: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=600&q=80", title: "SUMMER NIGHTS", sub: "Under the golden glow", range: [0.15, 0.3] },
    { id: 3, img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80", title: "UNFORGETTABLE", sub: "Every second counts", range: [0.3, 0.45] },
    { id: 4, img: "/images/memories/moment_04.png", title: "GOLDEN TIMES", sub: "Nostalgic sunset dreams", range: [0.45, 0.6] },
    { id: 5, img: "/images/memories/moment_05.png", title: "ENDLESS SMILES", sub: "Joy found in every laugh", range: [0.6, 0.75] },
    { id: 6, img: "/images/memories/moment_06.png", title: "TRUE FRIENDSHIP", sub: "Walking through life together", range: [0.75, 0.9] },
  ];

  return (
    <div ref={containerRef} className="h-[700vh] relative bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-10 left-10 text-pink-200 font-black text-xl tracking-tighter z-20">APRIL 17</div>
        
        <div className="relative z-10">
          <KineticText text="MEMORIES" scrollProgress={scrollYProgress} range={[0, 1]} />
          <KineticTextReverse text="COLLECTED" scrollProgress={scrollYProgress} range={[0, 1]} />
          <KineticText text="FOREVER" scrollProgress={scrollYProgress} range={[0, 1]} />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {memories.map((mem, i) => {
            const opacity = useTransform(scrollYProgress, 
              [mem.range[0], mem.range[0] + 0.05, mem.range[1] - 0.05, mem.range[1]], 
              [0, 1, 1, 0]
            );
            const scale = useTransform(scrollYProgress, mem.range, [0.8, 1.1]);
            const y = useTransform(scrollYProgress, mem.range, [50, -50]);

            return (
              <motion.div 
                key={mem.id}
                style={{ opacity, scale, y }}
                className="absolute flex flex-col items-center"
              >
                <div className="w-64 h-96 bg-pink-100 rounded-none overflow-hidden shadow-2xl mb-6">
                  <img 
                    src={mem.img} 
                    alt={mem.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-pink-500 font-black text-2xl tracking-tighter uppercase mb-1">{mem.title}</h3>
                  <p className="text-pink-200 font-bold text-xs tracking-widest uppercase">{mem.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]) }}
          className="absolute bottom-20 right-20 pointer-events-auto z-20"
        >
          <button onClick={onNext} className="text-pink-500 font-bold uppercase tracking-widest group flex items-center gap-4">
            NEXT CHAPTER <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const QualitiesSection = ({ onNext }: { onNext: () => void; key?: string }) => {
  const SLIDES = [
    { id: "s", title: "S → Sweetness", img: "https://images.unsplash.com/photo-1511688858344-18558b2d395a?auto=format&fit=crop&w=800&q=80" },
    { id: "a", title: "A → Adorable", img: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80" },
    { id: "l", title: "L → Lovely", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
    { id: "o", title: "O → Outstanding", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" },
    { id: "n", title: "N → Nice-hearted", img: "https://images.unsplash.com/photo-1529139513477-323b63bc2d53?auto=format&fit=crop&w=800&q=80" },
    { id: "i", title: "I → Incredible", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-container bg-white"
    >
      <HoverSlider 
        autoSlideInterval={3000} 
        slidesCount={SLIDES.length}
        className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 p-12"
      >
        <div className="flex flex-col space-y-4 text-left">
          <span className="text-xs font-bold tracking-widest text-pink-300 uppercase mb-4">/ her essence • April 17</span>
          {SLIDES.map((slide, index) => (
            <TextStaggerHover
              key={slide.id}
              index={index}
              className="cursor-pointer text-4xl md:text-6xl font-black uppercase tracking-tighter text-pink-500"
              text={slide.title}
            />
          ))}
          
          <motion.button
            whileHover={{ x: 10 }}
            onClick={onNext}
            className="mt-12 flex items-center gap-4 text-pink-300 font-bold uppercase tracking-widest text-sm"
          >
            SEE MORE <ArrowRight size={16} />
          </motion.button>
        </div>

        <HoverSliderImageWrap className="w-full max-w-md aspect-[3/4] rounded-none shadow-2xl border-8 border-pink-50">
          {SLIDES.map((slide, index) => (
            <HoverSliderImage
              key={slide.id}
              index={index}
              imageUrl={slide.img}
              alt={slide.title}
              className="object-cover"
            />
          ))}
        </HoverSliderImageWrap>
      </HoverSlider>
    </motion.div>
  );
};

const FamilyTree = ({ onNext }: { onNext: () => void; key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-container bg-white flex flex-col items-center justify-center"
    >
      <div className="text-center mb-8">
        <span className="text-xs font-bold tracking-widest text-pink-300 uppercase mb-2 block">/ roots & connections • Celebrating April 17</span>
        <h2 className="text-5xl font-black text-pink-500 uppercase tracking-tighter">Family Flow</h2>
        <p className="text-pink-300 text-sm mt-4 max-w-lg mx-auto font-medium">
          The love that started it all. Celebrating the beautiful soul born on this special day, surrounded by the family that cherishes her most.
        </p>
      </div>

      <div className="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden border-4 border-pink-50 shadow-2xl bg-pink-50/30">
        <Player
          component={DataFlowPipes}
          durationInFrames={120}
          fps={30}
          compositionWidth={1280}
          compositionHeight={720}
          style={{ width: "100%", height: "100%" }}
          controls={false}
          autoPlay
          loop
          clickToPlay={false}
          acknowledgeRemotionLicense
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-12 px-10 py-4 bg-pink-500 text-white font-bold uppercase tracking-widest text-sm shadow-lg"
      >
        CONTINUE JOURNEY
      </motion.button>
    </motion.div>
  );
};

const LivingCard = ({ onNext }: { onNext: () => void; key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-container bg-pink-50"
    >
      <div className="max-w-4xl text-center">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-8xl md:text-[12rem] font-black uppercase leading-none tracking-tighter mb-12"
        >
          THE <br /> MESSAGE
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-4xl font-medium leading-tight text-pink-400"
        >
          Every year is a new page in the beautiful book of our friendship. You are the highlight of every chapter, the melody in every song, and the light in every room you enter.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl font-light leading-relaxed text-pink-300 mt-8 max-w-2xl mx-auto"
        >
          To the one who brings so much sweetness and joy to everyone around her. May your April 17th be as incredible and outstanding as you are. Here's to another year of making beautiful memories together.
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="mt-20 px-12 py-6 bg-pink-500 text-white font-bold uppercase tracking-[0.3em] text-sm"
        >
          CONTINUE
        </motion.button>
      </div>
    </motion.div>
  );
};

const PhotoStory = ({ onNext }: { onNext: () => void; key?: string }) => {
    const memories = [
    { id: 1, title: "MOMENT 01", cat: "Travel", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "MOMENT 02", cat: "Life", img: "https://images.unsplash.com/photo-1529139513477-323b63bc2d53?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "MOMENT 03", cat: "Joy", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "MOMENT 04", cat: "Peace", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "MOMENT 05", cat: "Love", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "MOMENT 06", cat: "Joy", img: "/images/moments/moment_06.png" },
    { id: 7, title: "MOMENT 07", cat: "Adventure", img: "/images/moments/moment_07.png" },
    { id: 8, title: "MOMENT 08", cat: "Serenity", img: "/images/moments/moment_08.png" },
    { id: 9, title: "MOMENT 09", cat: "Celebration", img: "/images/moments/moment_09.png" },
    { id: 10, title: "MOMENT 10", cat: "Smile", img: "/images/moments/moment_10.png" },
  ];

  return (
    <div className="bg-white min-h-screen text-pink-500 overflow-hidden w-full relative">
      <div className="h-[300px] flex flex-col items-center justify-center space-y-4 pt-8">
        <div className="space-y-1 text-center">
          <span className="text-[10px] font-bold tracking-widest text-pink-300 uppercase">
            Gallery • April 17
          </span>
          <h1 className="text-6xl font-black tracking-tighter uppercase">
            MEMORIES
          </h1>
        </div>
        <div className="animate-bounce text-pink-300 text-xs">↓ Scroll</div>
      </div>

      <RadialScrollGallery
        className="!min-h-[600px]"
        baseRadius={400}
        mobileRadius={250}
        visiblePercentage={50}
        scrollDuration={2000}
      >
        {(hoveredIndex) =>
          memories.map((mem, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div 
                key={mem.id} 
                className="group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-none bg-white border border-pink-100 shadow-2xl"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={mem.img}
                    alt={mem.title}
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                      isActive ? 'scale-110 blur-0 grayscale-0' : 'scale-100 blur-[1px] grayscale'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-60" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-white/80 backdrop-blur text-pink-500 border-pink-100">
                      {mem.cat}
                    </Badge>
                    <div className={`w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>

                  <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                    <h3 className="text-xl font-black leading-tight text-pink-600 uppercase tracking-tighter">{mem.title}</h3>
                    <div className={`h-0.5 bg-pink-500 mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                  </div>
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>

      <div className="h-[300px] flex items-center justify-center">
        <button onClick={onNext} className="kinetic-text hover:text-pink-400 transition-colors">END</button>
      </div>
    </div>
  );
};

const FinalMoment = ({ onNext }: { onNext: () => void; key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-container bg-pink-500 text-white"
    >
      <h2 className="kinetic-text">Small happiness from Dk</h2>
    </motion.div>
  );
};

const Celebration = () => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#fbcfe8', '#ffffff']
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-container"
    >
      <div className="text-center">
        <h1 className="kinetic-text mb-4">HAPPY</h1>
        <h1 className="kinetic-text text-pink-200 mb-4">BIRTHDAY</h1>
        <h1 className="kinetic-text mb-4">{FRIEND_NAME}</h1>
        <h2 className="text-pink-400 font-black text-3xl mb-12 tracking-widest">APRIL 17</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 text-pink-300 font-medium max-w-md mx-auto"
        >
          Wishing you a day filled with love, laughter, and all the things that make you smile. You deserve the best!
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="px-12 py-6 border-4 border-pink-500 text-pink-500 font-black uppercase tracking-[0.5em] text-sm hover:bg-pink-500 hover:text-white transition-all"
        >
          REPLAY
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [section, setSection] = useState<Section>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="relative min-h-screen bg-white selection:bg-pink-100">
      <div className="pink-gradient-bg" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed top-10 right-10 z-[100] p-4 bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
      >
        {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      <AnimatePresence mode="wait">
        {section === 'intro' && (
          <Intro key="intro" onNext={() => setSection('memory-space')} />
        )}
        {section === 'memory-space' && (
          <MemorySpace key="memory-space" onNext={() => setSection('qualities')} />
        )}
        {section === 'qualities' && (
          <QualitiesSection key="qualities" onNext={() => setSection('family-tree')} />
        )}
        {section === 'family-tree' && (
          <FamilyTree key="family-tree" onNext={() => setSection('living-card')} />
        )}
        {section === 'living-card' && (
          <LivingCard key="living-card" onNext={() => setSection('photo-story')} />
        )}
        {section === 'photo-story' && (
          <PhotoStory key="photo-story" onNext={() => setSection('final-moment')} />
        )}
        {section === 'final-moment' && (
          <FinalMoment key="final-moment" onNext={() => setSection('grand-finale')} />
        )}
        {section === 'grand-finale' && (
          <Celebration key="grand-finale" />
        )}
      </AnimatePresence>
    </div>
  );
}
