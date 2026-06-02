var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// features/videoPreview/lib/useVideoPreview.ts
import { useRef } from "react";
import { setActiveVideo } from "../model/videoController";
export const useVideoPreview = ({ src, previewUrl, delay = 300 }) => {
    const videoRef = useRef(null);
    const hoverTimeout = useRef(null);
    const isHovering = useRef(false);
    const urlToPlay = previewUrl || src;
    const startPreview = () => {
        isHovering.current = true;
        hoverTimeout.current = window.setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            if (!isHovering.current)
                return;
            const video = videoRef.current;
            if (!video)
                return;
            setActiveVideo(video);
            try {
                if (!video.src) {
                    video.src = urlToPlay;
                }
                video.currentTime = 0;
                yield video.play();
            }
            catch (_a) { }
        }), delay);
    };
    const stopPreview = () => {
        isHovering.current = false;
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        const video = videoRef.current;
        if (!video)
            return;
        video.pause();
        video.removeAttribute("src");
        video.load();
    };
    return { videoRef, startPreview, stopPreview };
};
