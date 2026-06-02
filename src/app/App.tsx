import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './provider';
import { AppLayout } from '../shared/ui/layout/appLayout';
import { AppRouter } from './router'; // Или Routes прямо здесь

export const App: React.FC = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </BrowserRouter>
    </AppProviders>
  );
};