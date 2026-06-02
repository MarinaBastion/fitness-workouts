const STORAGE_PREFIX = 'media-upload-session:';
const isBrowser = typeof window !== 'undefined';
export const getUploadKey = (file) => {
    return `${file.name}_${file.size}_${file.lastModified}`;
};
export const loadUploadSession = (key) => {
    if (!isBrowser) {
        return null;
    }
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    }
    catch (_a) {
        return null;
    }
};
export const saveUploadSession = (key, value) => {
    if (!isBrowser) {
        return;
    }
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
};
export const clearUploadSession = (key) => {
    if (!isBrowser) {
        return;
    }
    window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
};
