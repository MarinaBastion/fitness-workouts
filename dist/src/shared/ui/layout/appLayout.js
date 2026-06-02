import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from './header';
import { Sidebar } from './sidebar';
import styles from './appLayout.module.css';
export const AppLayout = ({ children }) => {
    return (_jsxs("div", { className: styles.appLayout, children: [_jsx(Header, {}), _jsxs("div", { className: styles.content, children: [_jsx(Sidebar, {}), _jsx("main", { className: styles.main, children: children })] })] }));
};
