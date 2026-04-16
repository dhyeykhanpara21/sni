import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface ParagraphProps {
  title?: string;
  content?: string;
  highlightedText?: string;
  quote?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  companyLogo?: string;
  imageUrl?: string;
  className?: string;
}

const ParagraphShowcase: React.FC<ParagraphProps> = ({
  title = "The heart of our family",
  content = "Family is where life begins and love never ends. Saloni, you are the bridge that connects our past memories with our future dreams. Your presence turns ordinary moments into extraordinary milestones that we cherish forever.",
  highlightedText = "ordinary moments into extraordinary milestones",
  quote = "Seeing Saloni grow into the incredible person she is today has been the greatest joy of our lives. Her kindness and spirit are the true foundation of our family.",
  quoteAuthor = "The Khanpara Family",
  quoteAuthorTitle = "The Pillars",
  companyLogo,
  imageUrl = "/images/saloniphotos/21.jpeg",
  className,
}) => {
  const renderContentWithHighlight = () => {
    if (!highlightedText || !content.includes(highlightedText)) {
      return <p className="text-pink-400 leading-relaxed text-lg">{content}</p>;
    }

    const parts = content.split(highlightedText);
    return (
      <p className="text-pink-400 leading-relaxed text-lg">
        {parts[0]}
        <span className="text-pink-600 font-black decoration-pink-200 underline decoration-4 underline-offset-4">{highlightedText}</span>
        {parts[1]}
      </p>
    );
  };

  return (
    <section className={cn("py-16 md:py-32 bg-white", className)}>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-xl text-4xl sm:text-5xl lg:text-7xl font-black text-pink-500 uppercase tracking-tighter"
        >
          {title}
        </motion.h2>
        
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-6 sm:mb-0"
          >
            <div className="aspect-[4/5] relative rounded-none bg-gradient-to-b from-pink-100 to-transparent p-px shadow-2xl">
              <img
                src={imageUrl}
                className="h-full w-full rounded-none object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Family Foundation"
              />
            </div>
          </motion.div>

          <div className="relative space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {renderContentWithHighlight()}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-2 sm:pt-6"
            >
              <blockquote className="border-l-4 border-pink-200 pl-4 sm:pl-8 space-y-4 sm:space-y-6">
                <p className="text-pink-300 italic text-lg sm:text-xl leading-relaxed font-medium">"{quote}"</p>

                <div className="mt-6 flex flex-col items-start gap-4">
                  <cite className="block font-black not-italic text-pink-500 tracking-widest uppercase text-sm">
                    {quoteAuthor}
                    {quoteAuthorTitle && (
                      <span className="text-pink-200 font-bold lowercase ml-2 tabular-nums">
                        / {quoteAuthorTitle}
                      </span>
                    )}
                  </cite>
                  {companyLogo && (
                    <img
                      className="h-8 w-auto opacity-50 grayscale hover:grayscale-0 transition-all"
                      src={companyLogo}
                      alt="Logo"
                    />
                  )}
                </div>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParagraphShowcase;
