import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Card, Text, Button } from '@fluentui/react-components';
import styles from './error-boundary.module.css';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.handleReset = () => {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null,
            });
        };
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        var _a, _b;
        // Логируем ошибку
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // Вызываем callback, если передан
        (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error, errorInfo);
        // Сохраняем информацию об ошибке
        this.setState({
            error,
            errorInfo,
        });
    }
    render() {
        var _a;
        if (this.state.hasError) {
            // Если передан кастомный fallback, используем его
            if (this.props.fallback) {
                return this.props.fallback;
            }
            // Иначе показываем стандартный UI ошибки
            return (_jsx("div", { className: styles.errorBoundary, children: _jsx(Card, { className: styles.errorCard, children: _jsxs("div", { className: styles.errorContent, children: [_jsx(Text, { size: 600, weight: "bold", className: styles.errorTitle, children: "\u26A0\uFE0F \u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A" }), _jsx(Text, { className: styles.errorMessage, children: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u043F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443." }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs("details", { className: styles.errorDetails, children: [_jsx("summary", { children: "\u0414\u0435\u0442\u0430\u043B\u0438 \u043E\u0448\u0438\u0431\u043A\u0438 (\u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438)" }), _jsxs("pre", { className: styles.errorStack, children: [this.state.error.toString(), (_a = this.state.errorInfo) === null || _a === void 0 ? void 0 : _a.componentStack] })] })), _jsxs("div", { className: styles.errorActions, children: [_jsx(Button, { appearance: "primary", onClick: this.handleReset, children: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430" }), _jsx(Button, { appearance: "secondary", onClick: () => window.location.reload(), children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443" })] })] }) }) }));
        }
        return this.props.children;
    }
}
