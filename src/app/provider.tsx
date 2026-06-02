import React from 'react';
import { Provider } from 'react-redux';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { store } from './store'
import { ErrorBoundary } from '../shared/ui/error-boundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          {children}
        </FluentProvider>
      </Provider>
    </ErrorBoundary>
  );
};