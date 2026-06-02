import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectUploadedMediaFiles } from '../../../features/file-upload/model/fileUploadSelectors';
import { MediaFileForm } from '../../../features/upsert-media-file/ui/MediaFileForm';
import { ModalForm } from '../../../shared/widgets/modal';
import styles from './uploadedMediaCarousel.module.css';
const SCROLL_STEP = 240;
export const UploadedMediaCarousel = () => {
    const uploadedMediaFiles = useAppSelector(selectUploadedMediaFiles);
    const videoFiles = useMemo(() => uploadedMediaFiles.filter((file) => file.mimeType.startsWith('video/')), [uploadedMediaFiles]);
    const [editingFile, setEditingFile] = useState(null);
    const scrollRef = useRef(null);
    const handleScroll = (direction) => {
        const node = scrollRef.current;
        if (!node) {
            return;
        }
        const delta = direction === 'left' ? -SCROLL_STEP : SCROLL_STEP;
        node.scrollBy({ left: delta, behavior: 'smooth' });
    };
    if (videoFiles.length === 0) {
        return (_jsx("div", { className: styles.empty, children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0435 \u0432\u0438\u0434\u0435\u043E \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438." }));
    }
    return (_jsxs("section", { className: styles.section, children: [_jsx("div", { className: styles.headerRow, children: _jsx("h3", { className: styles.title, children: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0432\u0438\u0434\u0435\u043E" }) }), _jsx("div", { className: styles.carousel, ref: scrollRef, children: videoFiles.map((file) => (_jsxs("button", { type: "button", className: `${styles.card} ${(editingFile === null || editingFile === void 0 ? void 0 : editingFile.id) === file.id ? styles.cardActive : ''}`, onClick: () => setEditingFile(file), children: [_jsx("video", { className: styles.thumb, src: file.filePath, muted: true, preload: "metadata" }), _jsx("span", { className: styles.name, children: file.name })] }, file.id))) }), editingFile && (_jsx(ModalForm, { modalContainerId: "media-file-edit-modal", onClose: () => setEditingFile(null), children: _jsx(MediaFileForm, { initialData: editingFile, onSuccess: () => setEditingFile(null) }) }))] }));
};
