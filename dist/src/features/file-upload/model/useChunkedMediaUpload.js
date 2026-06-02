var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback } from 'react';
import { useCompleteMediaUploadMutation, useInitMediaUploadMutation, useUploadMediaChunkMutation, } from '@/entities/media-file/api/mediaUploadApi';
import { clearUploadSession, getUploadKey, loadUploadSession, saveUploadSession, } from './uploadSessionStorage';
const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024;
const waitForOnline = () => {
    if (typeof window === 'undefined') {
        return Promise.resolve();
    }
    if (navigator.onLine) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const handleOnline = () => {
            window.removeEventListener('online', handleOnline);
            resolve();
        };
        window.addEventListener('online', handleOnline, { once: true });
    });
};
const resolveUploadId = (response) => {
    var _a, _b;
    return (_b = (_a = response.uploadId) !== null && _a !== void 0 ? _a : response.id) !== null && _b !== void 0 ? _b : '';
};
export const useChunkedMediaUpload = () => {
    const [initUpload] = useInitMediaUploadMutation();
    const [uploadChunk] = useUploadMediaChunkMutation();
    const [completeUpload] = useCompleteMediaUploadMutation();
    const uploadFile = useCallback((file, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const uploadKey = getUploadKey(file);
        const savedSession = loadUploadSession(uploadKey);
        let uploadId = (_a = savedSession === null || savedSession === void 0 ? void 0 : savedSession.uploadId) !== null && _a !== void 0 ? _a : '';
        let chunkSize = (_b = savedSession === null || savedSession === void 0 ? void 0 : savedSession.chunkSize) !== null && _b !== void 0 ? _b : DEFAULT_CHUNK_SIZE;
        let lastUploadedChunk = (_c = savedSession === null || savedSession === void 0 ? void 0 : savedSession.lastUploadedChunk) !== null && _c !== void 0 ? _c : -1;
        const totalChunks = Math.ceil(file.size / chunkSize);
        if (!uploadId) {
            const initResponse = yield initUpload({
                fileName: file.name,
                size: file.size,
                mimeType: file.type || 'application/octet-stream',
                totalChunks: totalChunks
            }).unwrap();
            uploadId = resolveUploadId(initResponse);
            if (!uploadId) {
                throw new Error('Upload id not returned from init endpoint.');
            }
            if (initResponse.chunkSize) {
                debugger;
                chunkSize = initResponse.chunkSize;
            }
            lastUploadedChunk = -1;
            saveUploadSession(uploadKey, {
                uploadId,
                chunkSize,
                lastUploadedChunk,
            });
        }
        for (let chunkIndex = lastUploadedChunk + 1; chunkIndex < totalChunks; chunkIndex += 1) {
            if (typeof navigator !== 'undefined' && !navigator.onLine) {
                yield waitForOnline();
            }
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);
            try {
                yield uploadChunk({
                    uploadId,
                    chunkIndex,
                    totalChunks,
                    chunkSize,
                    chunk,
                    fileName: file.name,
                }).unwrap();
            }
            catch (error) {
                if (typeof navigator !== 'undefined' && !navigator.onLine) {
                    yield waitForOnline();
                    chunkIndex -= 1;
                    continue;
                }
                throw error;
            }
            saveUploadSession(uploadKey, {
                uploadId,
                chunkSize,
                lastUploadedChunk: chunkIndex,
            });
        }
        yield completeUpload({
            uploadId,
            totalChunks,
            categoryId
        }).unwrap();
        clearUploadSession(uploadKey);
    }), [completeUpload, initUpload, uploadChunk]);
    return { uploadFile };
};
