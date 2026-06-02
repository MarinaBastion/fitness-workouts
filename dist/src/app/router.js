import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { MediaLibraryPage } from '../pages/media-library/ui/mediaLibraryPage';
import { VideoEditorPage } from '@/pages/ video-editor/ui/videoEditorPage';
//import { VideoEditorPage } from '../pages/video-editor';
export const AppRouter = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MediaLibraryPage, {}) }), _jsx(Route, { path: "/media-library-settings", element: _jsx(MediaLibraryPage, {}) }), _jsx(Route, { path: "/video-editor", element: _jsx(VideoEditorPage, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { children: "404 - \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" }) })] }));
};
