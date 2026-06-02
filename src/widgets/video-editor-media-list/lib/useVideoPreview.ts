// features/videoPreview/lib/useVideoPreview.ts
import { useRef } from "react";
import { setActiveVideo } from "../model/videoController";

interface UseVideoPreviewParams {
  previewUrl?: string;
  src: string;
  delay?: number;
}

export const useVideoPreview = ({ src,previewUrl, delay = 300 }: UseVideoPreviewParams) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hoverTimeout = useRef<number | null>(null);
  const isHovering = useRef(false);
  const urlToPlay = previewUrl || src;
  const startPreview = () => {
    isHovering.current = true;
    hoverTimeout.current = window.setTimeout(async () => {
      if (!isHovering.current) return;
      const video = videoRef.current;
      if (!video) return;

      setActiveVideo(video);

      try {
        if (!video.src) {
          video.src = urlToPlay;
        }
        video.currentTime = 0;
        await video.play();
      } catch {}
    }, delay);
  };

  const stopPreview = () => {
    isHovering.current = false;

    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.removeAttribute("src");
    video.load();
  };

  return { videoRef, startPreview, stopPreview };
};