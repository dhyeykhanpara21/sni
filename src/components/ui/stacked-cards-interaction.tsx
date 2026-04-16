"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const Card = ({
  className,
  image,
  children,
}: {
  className?: string;
  image?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-[280px] sm:w-[350px] cursor-pointer h-[320px] sm:h-[400px] overflow-hidden bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.02)] border border-gray-200/80",
        className
      )}
    >
      {image && (
        <div className="relative h-48 sm:h-72 rounded-xl shadow-lg overflow-hidden w-[calc(100%-1rem)] mx-2 mt-2">
          <img
            src={image}
            alt="card"
            className="object-cover mt-0 w-full h-full"
          />
        </div>
      )}
      {children && (
        <div className="px-4 p-2 flex flex-col gap-y-1 sm:gap-y-2">{children}</div>
      )}
    </div>
  );
};

interface CardData {
  image: string;
  title: string;
  description: string;
}

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 60,
  rotationAngle = 8,
  animationDelay = 0.05,
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Limit to maximum of 3 cards
  const limitedCards = cards.slice(0, 3);

  return (
    <div className="relative w-full h-full flex items-center justify-center py-10">
      <div className="relative w-[280px] sm:w-[350px] h-[320px] sm:h-[400px]">
        {limitedCards.map((card, index) => {
          const isFirst = index === 0;

          let xOffset = 0;
          let rotation = 0;

          if (limitedCards.length > 1) {
            // First card stays in place
            // Second card goes left
            // Third card goes right
            if (index === 1) {
              xOffset = -spreadDistance;
              rotation = -rotationAngle;
            } else if (index === 2) {
              xOffset = spreadDistance;
              rotation = rotationAngle;
            }
          }

          return (
            <motion.div
              key={index}
              className={cn("absolute inset-0", isFirst ? "z-10" : "z-0")}
              initial={{ x: 0, rotate: 0 }}
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                zIndex: isFirst ? 10 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
                delay: index * animationDelay,
              }}
              onHoverStart={() => isFirst && setIsHovering(true)}
              onHoverEnd={() => isFirst && setIsHovering(false)}
            >
              <Card
                className={cn(isFirst ? "z-10 shadow-2xl" : "z-0 shadow-lg")}
                image={card.image}
              >
                <h2 className="text-pink-600 font-bold text-sm sm:text-base">{card.title}</h2>
                <p className="text-pink-400 text-[10px] sm:text-xs italic">{card.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { StackedCardsInteraction, Card };
