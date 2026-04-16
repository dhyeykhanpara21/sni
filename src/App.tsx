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
import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import ParagraphShowcase from "@/components/ui/paragraph-showcase";
import { LinkPreview } from "@/components/ui/link-preview";

// --- Global Constants ---
const FRIEND_NAME = "SALONI";

const FAMILY_MOMENTS = [
    {
      title: "Her Smile",
      desc: "A guiding light of wisdom and strength. The foundation of every beautiful dream we share.Your smile has a quiet magic… it doesn’t just brighten moments, it makes everything feel lighter and more beautiful 💖",
      img: "/images/saloniphotos/9.jpeg"
    },
    {
      title: "Pure Soul",
      desc: "There’s a rare kind of goodness in you — the kind that makes people feel safe, valued, and truly cared for ✨",
      img: "/images/saloniphotos/12.jpeg"
    },
    {
      title: "Simply Special",
      desc: "Someone who stands out not by trying, but just by being genuinely kind, graceful, and beautifully unique 💕",
      img: "/images/saloniphotos/27.jpeg"
    }
];

const THREE_D_GALLERY_IMAGES = [
  { src: '/images/saloniphotos/16.jpeg', alt: 'Moment 1' },
  { src: '/images/saloniphotos/17.jpeg', alt: 'Moment 2' },
  { src: '/images/saloniphotos/18.jpeg', alt: 'Moment 3' },
  { src: '/images/saloniphotos/19.jpeg', alt: 'Moment 4' },
  { src: '/images/saloniphotos/20.jpeg', alt: 'Moment 5' },
  { src: '/images/saloniphotos/22.jpeg', alt: 'Moment 6' },
  { src: '/images/saloniphotos/23.jpeg', alt: 'Moment 7' },
  { src: '/images/saloniphotos/26.jpeg', alt: 'Moment 8' },
];

const MemoryItem = ({ mem, scrollYProgress }: { mem: any, scrollYProgress: any }) => {
  const start = mem.range[0];
  const end = mem.range[1];
  const duration = end - start;
  const padding = duration * 0.2; // Use 20% of duration for padding instead of fixed 0.05

  const opacity = useTransform(scrollYProgress, 
    [start, start + padding, end - padding, end], 
    [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, mem.range, [0.8, 1.2]);
  const y = useTransform(scrollYProgress, mem.range, [100, -100]);
  const xOffset = useTransform(scrollYProgress, mem.range, [mem.x * 1.2, mem.x * 0.5]); // Reduced for mobile
  const rotate = useTransform(scrollYProgress, mem.range, [mem.rotate * 1.5, mem.rotate]);

  return (
    <motion.div 
      style={{ opacity, scale, y, x: xOffset, rotate }}
      className="absolute flex flex-col items-center w-full px-4"
    >
      <div className="w-full max-w-[280px] h-[400px] sm:max-w-sm sm:h-[500px] md:max-w-[450px] md:h-[600px] bg-white border-4 sm:border-8 border-white shadow-[0_30px_60px_rgba(0,0,0,0.2)] sm:shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden">
        <img 
          src={mem.img} 
          alt={mem.title} 
          className="w-full h-full object-cover transition-all duration-1000 scale-110 hover:scale-100"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="text-center bg-white/10 backdrop-blur-md p-4 sm:p-8 border border-white/20 w-full max-w-[280px] sm:max-w-sm md:max-w-md mt-4 sm:mt-6">
         <h3 className="text-pink-600 font-black text-2xl sm:text-4xl md:text-6xl tracking-tighter uppercase mb-1 sm:mb-2 drop-shadow-lg">{mem.title}</h3>
         <p className="text-pink-400 font-black text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2 sm:mb-4 opacity-80">{mem.sub}</p>
         {mem.detail && (
           <motion.p 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="text-pink-300 font-medium text-sm md:text-base leading-relaxed italic border-t border-pink-100/30 pt-4"
           >
             "{mem.detail}"
           </motion.p>
         )}
      </div>
    </motion.div>
  );
};

const FamilyMomentItem = ({ moment, i, scrollYProgress }: { moment: any, i: number, scrollYProgress: any }) => {
  const start = 0.82 + i * 0.06; // Increased from 0.03
  const end = start + 0.05;      // Increased from 0.02
  const duration = end - start;
  const padding = duration * 0.2;
  
  const opacity = useTransform(scrollYProgress, 
    [start, start + padding, end - padding, end], 
    [0, 1, 1, 0]
  );
  const x = useTransform(scrollYProgress, [start, end], [i % 2 === 0 ? -100 : 100, 0]);
  const pointerEvents = useTransform(scrollYProgress, p => (p > start && p < end) ? "auto" : "none");

  return (
    <motion.div
      style={{ opacity, x, pointerEvents }}
      className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-32 px-8`}
    >
      <div className="w-full md:w-1/2 relative aspect-[4/5] bg-pink-50 overflow-hidden shadow-3xl border-8 border-white group">
        <img 
          src={moment.img} 
          alt={moment.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
      </div>
      
      <div className={`w-full md:w-1/2 space-y-3 sm:space-y-6 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
        <h3 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter text-pink-500 leading-none">
          {moment.title}
        </h3>
        <p className="text-sm sm:text-xl md:text-3xl font-bold text-pink-400 leading-relaxed italic border-l-4 sm:border-l-8 border-pink-100 pl-4 sm:pl-8 ml-2 sm:ml-4">
          {moment.desc}
        </p>
      </div>
    </motion.div>
  );
};

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
          className="kinetic-text mb-[-1.5vw] sm:mb-[-2vw]"
        >
          HAPPY
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="kinetic-text text-pink-200 mb-[-1.5vw] sm:mb-[-2vw]"
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
        <div className="flex items-center gap-3 sm:gap-6 mb-4">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="text-pink-400"
          >
            <Sparkles className="size-8 sm:size-12" strokeWidth={1.5} />
          </motion.div>
          <span className="text-pink-500 font-black text-2xl sm:text-4xl md:text-5xl tracking-widest uppercase">APRIL 17</span>
        </div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-pink-200 font-bold text-sm sm:text-lg tracking-[0.4em] sm:tracking-[0.6em] uppercase sm:pl-20"
          >
            The world got a little brighter
          </motion.span>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 z-10"
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
    { 
      id: 1, 
      img: "/images/saloniphotos/1.jpeg", 
      title: "THE FIRST LAUGH", 
      sub: "A moment frozen in time", 
      detail: "The second it all began. A single shared smile that sparked a friendship destined to last a lifetime.",
      range: [0, 0.08], x: -100, rotate: -5 
    },
    { 
      id: 2, 
      img: "/images/saloniphotos/2.jpeg", 
      title: "SUMMER NIGHTS", 
      sub: "Under the golden glow", 
      detail: "Deep conversations under the neon lights, where every secret felt safe and every dream felt possible.",
      range: [0.08, 0.16], x: 100, rotate: 5 
    },
    { 
      id: 3, 
      img: "/images/saloniphotos/3.jpeg", 
      title: "UNFORGETTABLE", 
      sub: "Every second counts", 
      detail: "Some snapshots just stay with you. This was the peak of the season, pure energy and light.",
      range: [0.16, 0.24], x: -80, rotate: -2 
    },
    { 
      id: 4, 
      img: "/images/saloniphotos/4.jpeg", 
      title: "GOLDEN TIMES", 
      sub: "Nostalgic sunset dreams", 
      detail: "Chasing the sun until it dipped below the horizon. A reminder that life is beautiful exactly as it is.",
      range: [0.24, 0.32], x: 80, rotate: 3 
    },
    { id: 5, img: "/images/saloniphotos/5.jpeg", title: "CHASING DREAMS", sub: "Reach for the stars", detail: "Looking toward the future with a fire in the heart.", range: [0.32, 0.40], x: -50, rotate: -4 },
    { id: 6, img: "/images/saloniphotos/6.jpeg", title: "LAUGHTER RAIN", sub: "Dancing through life", detail: "Your laugh was the soundtrack to our best days.", range: [0.40, 0.48], x: 50, rotate: 2 },
    { id: 7, img: "/images/saloniphotos/7.jpeg", title: "MIDNIGHT SNACKS", sub: "Secrets at 2 AM", range: [0.48, 0.56], x: -30, rotate: -1 },
    { id: 8, img: "/images/saloniphotos/8.jpeg", title: "TRUE FRIENDSHIP", sub: "Walking together", range: [0.56, 0.64], x: 30, rotate: 4 },
  ];

  return (
    <div ref={containerRef} className="h-[900vh] relative bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-10 left-10 text-pink-200 font-black text-xl tracking-tighter z-20 font-sans">APRIL 17</div>
        
        <div className="relative z-30 pointer-events-none">
          <KineticText text="MEMORIES" scrollProgress={scrollYProgress} range={[0, 1]} />
          <KineticTextReverse text="COLLECTED" scrollProgress={scrollYProgress} range={[0, 1]} />
          <KineticText text="FOREVER" scrollProgress={scrollYProgress} range={[0, 1]} />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {memories.map((mem) => (
            <MemoryItem key={mem.id} mem={mem} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]) }}
          className="absolute bottom-20 right-20 pointer-events-auto z-40"
        >
          <button onClick={onNext} className="text-pink-500 font-black uppercase tracking-[0.4em] group flex items-center gap-4 text-sm bg-white/80 backdrop-blur px-6 py-3 border border-pink-100 shadow-xl">
            NEXT CHAPTER <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const QualitiesSection = ({ onNext }: { onNext: () => void; key?: string }) => {
  const SLIDES = [
    { id: "s", title: "S → Sweetness", img: "/images/saloniphotos/9.jpeg" },
    { id: "a", title: "A → Adorable", img: "/images/saloniphotos/10.jpeg" },
    { id: "l", title: "L → Lovely", img: "/images/saloniphotos/11.jpeg" },
    { id: "o", title: "O → Outstanding", img: "/images/saloniphotos/12.jpeg" },
    { id: "n", title: "N → Nice-hearted", img: "/images/saloniphotos/13.jpeg" },
    { id: "i", title: "I → Incredible", img: "/images/saloniphotos/14.jpeg" },
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
        className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 p-6 sm:p-12"
      >
        <div className="flex flex-col space-y-4 text-left">
          <span className="text-xs font-bold tracking-widest text-pink-300 uppercase mb-4">/ her essence • April 17</span>
          {SLIDES.map((slide, index) => (
            <TextStaggerHover
              key={slide.id}
              index={index}
              className="cursor-pointer text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-pink-500"
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

        <HoverSliderImageWrap className="w-full max-w-[280px] sm:max-w-md aspect-[3/4] rounded-none shadow-2xl border-4 sm:border-8 border-pink-50">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="h-[900vh] relative bg-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* CHAPTER 1: THE NETWORK FLOW (0% - 25%) */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.00, 0.05, 0.25, 0.29], [0, 1, 1, 0]),
            scale: useTransform(scrollYProgress, [0.00, 0.10], [0.8, 1]),
            pointerEvents: useTransform(scrollYProgress, p => p < 0.28 ? "auto" : "none")
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10"
        >
          <div className="text-center mb-8 z-30">
            <span className="text-xs font-bold tracking-widest text-pink-300 uppercase mb-2 block">/ roots & connections</span>
            <h2 className="text-5xl md:text-8xl font-black text-pink-500 uppercase tracking-tighter">Family Flow</h2>
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
        </motion.div>

        {/* CHAPTER 1.5: THE FAMILY FOUNDATION (30% - 55%) */}
        <motion.div
           style={{ 
             opacity: useTransform(scrollYProgress, [0.32, 0.36, 0.52, 0.56], [0, 1, 1, 0]),
             y: useTransform(scrollYProgress, [0.31, 0.36, 0.52, 0.56], [50, 0, 0, -50]),
             pointerEvents: useTransform(scrollYProgress, p => (p > 0.32 && p < 0.55) ? "auto" : "none")
           }}
           className="absolute inset-0 z-20 flex items-center justify-center p-8 bg-white"
        >
          <ParagraphShowcase 
            title="The Heart of our home"
            content="Family is where love grows quietly and stays forever.
Saloni, you are the warmth that holds everyone together, turning simple days into beautiful memories. Your presence brings comfort, laughter, and a sense of home that words can’t fully capture."
            highlightedText=" Your presence brings comfort, laughter, and a sense of home that words can’t fully capture."
            quote="The bond you share with your sister is something truly special — a mix of endless laughter, silent understanding, and unbreakable support. Together, you both create moments that are not just memories, but feelings that last a lifetime."
            quoteAuthor="The Khokhani Family"
            quoteAuthorTitle="Saloni's Proudest Support"
            imageUrl="/images/saloniphotos/21.jpeg"
            className="py-0"
          />
        </motion.div>

        {/* CHAPTER 2: THE 3D CINEMATIC REEL (60% - 85%) */}
        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0.60, 0.65, 0.78, 0.81], [0, 1, 1, 0]),
            pointerEvents: useTransform(scrollYProgress, p => (p > 0.6 && p < 0.8) ? "auto" : "none")
          }}
          className="absolute inset-0 z-30"
        >
          <InfiniteGallery 
             images={THREE_D_GALLERY_IMAGES}
             speed={1.5}
             visibleCount={12}
             className="h-full w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <h2 className="text-7xl md:text-9xl font-black text-white mix-blend-difference uppercase tracking-[0.2em] italic opacity-30">CINEMATIC</h2>
          </div>
        </motion.div>

        {/* CHAPTER 3: PERSONAL STORIES (90% - 100%) */}
        <div className="relative z-40 w-full">
          {FAMILY_MOMENTS.map((moment, i) => (
            <FamilyMomentItem key={i} moment={moment} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.98, 1], [0, 1]) }}
          className="absolute bottom-20 z-50 px-12 py-6"
        >
          <button 
            onClick={onNext}
            className="px-16 py-8 border-4 border-pink-500 text-pink-500 font-black uppercase tracking-[0.5em] text-sm hover:bg-pink-500 hover:text-white transition-all shadow-3xl bg-white"
          >
            CONTINUE JOURNEY
          </button>
        </motion.div>
      </div>
    </div>
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
          className="text-5xl sm:text-8xl md:text-[12rem] font-black uppercase leading-[0.9] tracking-tighter mb-8 sm:mb-12"
        >
          THE <br /> MESSAGE
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-4xl font-medium leading-[1.3] text-pink-400"
        >
          Every year adds a new chapter to a story that feels more beautiful because you are in it. You are the{" "}
<LinkPreview 
  url="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" 
  imageSrc="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=40" 
  isStatic 
  className="font-black text-pink-500 underline decoration-pink-200 underline-offset-8 decoration-2"
>
  calm
</LinkPreview>{" "}
in the chaos, the{" "}
<LinkPreview 
  url="https://images.unsplash.com/photo-1514525253361-b83f859b25c0" 
  imageSrc="https://images.unsplash.com/photo-1514525253361-b83f859b25c0?auto=format&fit=crop&w=400&q=40" 
  isStatic 
  className="font-black text-pink-500 underline decoration-pink-200 underline-offset-8 decoration-2"
>
  warmth
</LinkPreview>{" "}
in every moment, and the{" "}
<LinkPreview 
  url="https://images.unsplash.com/photo-1470252649358-96f3c8024219" 
  imageSrc="https://images.unsplash.com/photo-1470252649358-96f3c8024219?auto=format&fit=crop&w=400&q=40" 
  isStatic 
  className="font-black text-pink-500 underline decoration-pink-200 underline-offset-8 decoration-2"
>
  light
</LinkPreview>{" "}
that quietly makes everything feel right.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-pink-300 mt-6 sm:mt-8 max-w-2xl mx-auto"
        >
          To the one who brings so much sweetness and joy to everyone around her. May your April 17th be as incredible and outstanding as you are. Here's to another year of making beautiful memories together.
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="mt-12 sm:mt-20 px-8 py-4 sm:px-12 sm:py-6 bg-pink-500 text-white font-bold uppercase tracking-[0.3em] text-xs sm:text-sm"
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
    { id: 2, title: "MOMENT 02", cat: "Life", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
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
          className="px-8 py-4 sm:px-12 sm:py-6 border-4 border-pink-500 text-pink-500 font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-xs sm:text-sm hover:bg-pink-500 hover:text-white transition-all"
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

  const musicUrl = "/song/Selena Gomez - Look At Her Now _ Cover by Jenny Jones.mp3";

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
