import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './videoEditorMediaListWidget.module.css';
import { useVideoPreview } from '../lib/useVideoPreview';
//TODO: get out const to separate file
const HOVER_DELAY = 300;
export const VideoListItem = ({ file, index }) => {
    var _a;
    //TODO: move to guard
    const videoSrc = file.filePath.startsWith("http") ? file.filePath : `${window.location.origin}${file.filePath}`;
    const previewVideoSrc = file.previewFilePath ? file.previewFilePath.startsWith("http") ? file.previewFilePath : `${window.location.origin}${file.previewFilePath}` : undefined;
    const { videoRef, startPreview, stopPreview } = useVideoPreview({
        previewUrl: previewVideoSrc,
        src: videoSrc,
        delay: 300,
    });
    const categoryNames = ((_a = file.categories) !== null && _a !== void 0 ? _a : [])
        .map((category) => category.name)
        .join(' • ');
    return (_jsxs("article", { className: styles.videoRow, children: [_jsx("video", { ref: videoRef, className: styles.preview, poster: file.thumbnailUrl, muted: true, preload: "none", loop: true, playsInline: true, onPointerEnter: startPreview, onPointerLeave: stopPreview, onFocus: startPreview, onBlur: stopPreview }), _jsxs("div", { className: styles.meta, children: [_jsx("h3", { className: styles.name, children: file.name }), _jsx("p", { className: styles.subtext, children: categoryNames || "Без категории" })] })] }));
};
