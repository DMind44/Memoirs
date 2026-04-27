import { useMemo } from 'react';
import type { ImageEntry } from '@/types';
import './ImageViewer.css';

interface ImageViewerProps {
  images: ImageEntry[];
  currentTime: number;
}

export function ImageViewer({ images, currentTime }: ImageViewerProps) {
  const currentImage = useMemo(() => {
    if (images.length === 0) return null;
    // Find the last image whose timestamp is <= currentTime
    let active = images[0];
    for (const img of images) {
      if (img.timestamp <= currentTime) {
        active = img;
      } else {
        break;
      }
    }
    return active;
  }, [images, currentTime]);

  if (!currentImage) {
    return (
      <div className="image-viewer image-viewer--empty">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="image-viewer">
      <img
        key={currentImage.src}
        src={currentImage.src}
        alt={currentImage.alt}
        className="image-viewer__img"
      />
      <p className="image-viewer__caption">{currentImage.alt}</p>
    </div>
  );
}