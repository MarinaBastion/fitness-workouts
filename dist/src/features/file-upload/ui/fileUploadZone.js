import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// features/file-upload/ui/FileUploadZone.tsx
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addUploadedMediaFile } from '../model/fileUploadSlice';
import { selectUploadedMediaFiles } from '../model/fileUploadSelectors';
export const FileUploadZone = () => {
    const dispatch = useAppDispatch();
    const uploadedMediaFiles = useAppSelector(selectUploadedMediaFiles);
    const makeLocalMediaFile = useCallback((file, description, category) => {
        const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2);
        const now = new Date().toISOString();
        return {
            id,
            name: file.name,
            originalName: file.name,
            filePath: URL.createObjectURL(file),
            duration: 0,
            size: file.size,
            mimeType: file.type || 'application/octet-stream',
            thumbnailUrl: undefined,
            createdAt: now,
            updatedAt: now,
            description: description,
            categories: category
        };
    }, []);
    const onDrop = useCallback((acceptedFiles) => {
        for (const file of acceptedFiles) {
            const mediaFile = makeLocalMediaFile(file, "", []);
            console.log(`Файл ${file.name} сохранён локально`);
            dispatch(addUploadedMediaFile(mediaFile));
        }
    }, [dispatch, makeLocalMediaFile]);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
            'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
        },
        multiple: true,
    });
    const pendingFiles = acceptedFiles.map((file) => (_jsxs("li", { children: [file.path, " - ", file.size, " bytes"] }, file.path)));
    const savedFiles = uploadedMediaFiles.map((file) => (_jsxs("li", { children: [file.name, " \u2014 ", file.size, " bytes"] }, file.id)));
    return (_jsxs("div", Object.assign({}, getRootProps(), { className: `upload-zone ${isDragActive ? 'drag-active' : ''}`, children: [_jsx("input", Object.assign({}, getInputProps())), isDragActive ? (_jsx("p", { children: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438..." })) : (_jsxs("div", { children: [_jsx("p", { children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E/\u0430\u0443\u0434\u0438\u043E \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }), _jsx("p", { children: "\u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0444\u0430\u0439\u043B\u043E\u0432" }), _jsx("button", { type: "button", children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" })] }))] })));
};
