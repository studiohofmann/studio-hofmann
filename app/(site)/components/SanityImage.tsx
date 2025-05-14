import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Create a type for Sanity images based on your existing schema
type SanityImageType = {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    // Replace with a valid key name or remove if unnecessary
    // [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: {
    _type?: "sanity.imageHotspot";
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  crop?: {
    _type?: "sanity.imageCrop";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  alt?: string;
  _type: "image";
};

interface SanityImageProps {
  image: SanityImageType;
  altFallback?: string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
}

export default function SanityImage({
  image,
  altFallback = "Image",
  aspectRatio = "aspect-4/3",
  priority = false,
  className = "object-cover",
}: SanityImageProps) {
  if (!image || !image.asset) {
    return null;
  }

  return (
    <div className={`relative w-full h-full border ${aspectRatio}`}>
      <Image
        src={urlFor(image).url()}
        alt={image.alt || altFallback}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={80}
        priority={priority}
        placeholder="blur"
        blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
        className={className}
      />
    </div>
  );
}
