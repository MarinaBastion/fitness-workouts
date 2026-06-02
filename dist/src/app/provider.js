import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { store } from './store';
import { ErrorBoundary } from '../shared/ui/error-boundary';
export const AppProviders = ({ children }) => {
    return (_jsx(ErrorBoundary, { children: _jsx(Provider, { store: store, children: _jsx(FluentProvider, { theme: webLightTheme, children: children }) }) }));
};
