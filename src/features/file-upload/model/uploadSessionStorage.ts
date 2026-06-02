export type UploadSessionState = {
  uploadId: string;
  lastUploadedChunk: number;
  chunkSize: number;
};

const STORAGE_PREFIX = 'media-upload-session:';

const isBrowser = typeof window !== 'undefined';

export const getUploadKey = (file: File) => {
  return `${file.name}_${file.size}_${file.lastModified}`;
};

export const loadUploadSession = (key: string): UploadSessionState | null => {
  if (!isBrowser) {
    return null;
  }

  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as UploadSessionState;
  } catch {
    return null;
  }
};

export const saveUploadSession = (key: string, value: UploadSessionState) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
};

export const clearUploadSession = (key: string) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
};
