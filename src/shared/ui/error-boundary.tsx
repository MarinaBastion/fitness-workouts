import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Text, Button } from '@fluentui/react-components';
import styles from './error-boundary.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Вызываем callback, если передан
    this.props.onError?.(error, errorInfo);
    
    // Сохраняем информацию об ошибке
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Если передан кастомный fallback, используем его
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Иначе показываем стандартный UI ошибки
      return (
        <div className={styles.errorBoundary}>
          <Card className={styles.errorCard}>
            <div className={styles.errorContent}>
              <Text size={600} weight="bold" className={styles.errorTitle}>
                ⚠️ Что-то пошло не так
              </Text>
              
              <Text className={styles.errorMessage}>
                Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
              </Text>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className={styles.errorDetails}>
                  <summary>Детали ошибки (только в режиме разработки)</summary>
                  <pre className={styles.errorStack}>
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className={styles.errorActions}>
                <Button
                  appearance="primary"
                  onClick={this.handleReset}
                >
                  Попробовать снова
                </Button>
                <Button
                  appearance="secondary"
                  onClick={() => window.location.reload()}
                >
                  Обновить страницу
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}