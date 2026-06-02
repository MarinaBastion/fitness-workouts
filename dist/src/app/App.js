import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './provider';
import { AppLayout } from '../shared/ui/layout/appLayout';
import { AppRouter } from './router'; // Или Routes прямо здесь
export const App = () => {
    return (_jsx(AppProviders, { children: _jsx(BrowserRouter, { children: _jsx(AppLayout, { children: _jsx(AppRouter, {}) }) }) }));
};
