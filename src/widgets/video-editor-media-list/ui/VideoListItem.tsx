import React, { useRef } from 'react';
import { MediaFile } from '@/entities/media-file/model/media-file';
import styles from './videoEditorMediaListWidget.module.css';
import { useVideoPreview } from '../lib/useVideoPreview';

interface VideoListItemProps {
  file: MediaFile;
  index: number;
}
//TODO: get out const to separate file
const HOVER_DELAY = 300;

export const VideoListItem: React.FC<VideoListItemProps> = ({ file, index }) => {

//TODO: move to guard
  const videoSrc = file.filePath.startsWith("http") ? file.filePath : `${window.location.origin}${file.filePath}`;
  const previewVideoSrc =  file.shortVideoUrl? file.shortVideoUrl.startsWith("http") ? file.shortVideoUrl : `${window.location.origin}${file.shortVideoUrl}` : undefined;

const { videoRef, startPreview, stopPreview } = useVideoPreview({
    previewUrl:previewVideoSrc,
    src: videoSrc,
    delay: 300,
  });

  const categoryNames = (file.categories ?? [])
    .map((category) => category.name)
    .join(' • ');

   return (
    <article className={styles.videoRow}>
      <video
        ref={videoRef}
        className={styles.preview}
        poster={file.thumbnailUrl}
        muted
        preload="none"
        loop
        playsInline
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
      />
      <div className={styles.meta}>
        <h3 className={styles.name}>{file.name}</h3>
        <p className={styles.subtext}>{categoryNames || "Без категории"}</p>
      </div>
    </article>
  );
};