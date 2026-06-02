let activeVideo = null;
export const setActiveVideo = (video) => {
    if (activeVideo && activeVideo !== video) {
        activeVideo.pause();
        activeVideo.removeAttribute("src");
        activeVideo.load();
    }
    activeVideo = video;
};
