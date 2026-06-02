import { MediaFile } from './media-file';

export const getMediaFileById = (mediaFiles: MediaFile[] = [], itemId: string) => {
  return mediaFiles.find((item) => item.id === itemId);
};
