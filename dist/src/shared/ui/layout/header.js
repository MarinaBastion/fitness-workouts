import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import styles from './header.module.css';
export const Header = () => {
    const navigate = useNavigate();
    return (_jsxs("header", { className: styles.header, children: [_jsx("div", { className: styles.logo, children: _jsx(Link, { to: "/", style: { textDecoration: 'none', color: 'inherit' }, children: "\uD83C\uDFAC \u041C\u0435\u0434\u0438\u0430\u0442\u0435\u043A\u0430" }) }), _jsxs("nav", { className: styles.nav, children: [_jsx(Button, { appearance: "subtle", onClick: () => navigate('/media-library-settings'), children: "\u041C\u0435\u0434\u0438\u0430\u0442\u0435\u043A\u0430" }), _jsx(Button, { appearance: "subtle", onClick: () => navigate('/video-editor'), children: "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440" })] })] }));
};
