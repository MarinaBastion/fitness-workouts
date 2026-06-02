export const getMediaFileById = (mediaFiles = [], itemId) => {
    return mediaFiles.find((item) => item.id === itemId);
};
