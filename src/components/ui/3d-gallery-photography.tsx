import type React from 'react';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image as DreiImage, Text } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type ImageItem = string | { src: string; alt?: string };

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  visibleCount?: number;
  className?: string;
}

const ImageMesh = ({ 
  url, 
  alt,
  index, 
  total, 
  speed,
  scrollPos
}: { 
  url: string, 
  alt?: string,
  index: number, 
  total: number, 
  speed: number,
  scrollPos: React.MutableRefObject<number>
}) => {
  const meshRef = useRef<THREE.Group>(null!);
  const spacing = 5; 
  const range = total * spacing;
  
  useFrame((state) => {
    // Using built-in state.clock.elapsedTime instead of manual THREE.Clock for stability
    const time = state.clock.elapsedTime;
    const xBase = (index * spacing) + scrollPos.current;
    
    // Smooth infinite wrapping
    let x = ((xBase % range) + range) % range;
    x -= range / 2; 
    
    meshRef.current.position.x = x;
    
    // More predictable cinematic movement
    meshRef.current.position.y = Math.sin(time * 0.4 + index) * 0.15;
    meshRef.current.rotation.y = Math.sin(time * 0.2 + index) * 0.08;
    
    const distFromCenter = Math.abs(x);
    const fade = Math.max(0, 1 - (distFromCenter / (range / 2.5)));
    meshRef.current.scale.setScalar(0.9 + fade * 0.45);
  });

  return (
    <group ref={meshRef}>
      <DreiImage
        url={url}
        scale={[3.5, 5]}
        toneMapped={false}
        transparent
        onError={() => console.log(`Failed to load image: ${url}`)}
      />
      {alt && (
        <Text
          position={[0, -2.8, 0]}
          fontSize={0.25}
          color="#f472b6" // pink-400
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.5}
        >
          {alt.toUpperCase()}
        </Text>
      )}
    </group>
  );
};

const GalleryContent = ({ images, speed = 1.2 }: { images: ImageItem[], speed?: number }) => {
  const scrollPos = useRef(0);
  
  useFrame((state, delta) => {
    // Ensure smooth constant speed
    scrollPos.current -= delta * speed * 2;
  });

  const formattedImages = useMemo(() => 
    images.map(img => typeof img === 'string' ? { src: img } : img)
  , [images]);

  return (
    <group>
      {formattedImages.map((img, i) => (
        <ImageMesh 
          key={`${img.src}-${i}`} 
          url={img.src} 
          alt={img.alt}
          index={i} 
          total={images.length}
          speed={speed}
          scrollPos={scrollPos}
        />
      ))}
    </group>
  );
};

const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({ 
  images, 
  speed = 1.2,
  className 
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-white", className)}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0xffffff), 0);
        }}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <GalleryContent images={images} speed={speed} />
      </Canvas>
    </div>
  );
};

export default InfiniteGallery;
