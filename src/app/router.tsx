import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MediaLibraryPage } from '../pages/media-library/ui/mediaLibraryPage';
import { VideoEditorPage } from '@/pages/ video-editor/ui/videoEditorPage';
//import { VideoEditorPage } from '../pages/video-editor';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MediaLibraryPage />} />
      <Route path="/media-library-settings" element={<MediaLibraryPage />} />
      <Route path="/video-editor" element={<VideoEditorPage />} />
      {/* <Route path="/video-editor" element={<VideoEditorPage />} /> */}
      <Route path="*" element={<div>404 - Страница не найдена</div>} />
    </Routes>
  );
};