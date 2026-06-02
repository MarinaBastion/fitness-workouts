let activeVideo: HTMLVideoElement | null = null;

export const setActiveVideo = (video: HTMLVideoElement | null) => {
  if (activeVideo && activeVideo !== video) {
    activeVideo.pause();
    activeVideo.removeAttribute("src");
    activeVideo.load();
  }
  activeVideo = video;
};