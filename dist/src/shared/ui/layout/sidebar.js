import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, MenuItem, MenuList } from '@fluentui/react-components';
import styles from './sidebar.module.css';
const MIN_WIDTH = 200;
const MAX_WIDTH = 360;
const COLLAPSED_WIDTH = 32;
export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [width, setWidth] = useState(250);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const isResizingRef = useRef(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);
    const menuItems = [
        { path: '/media-library-settings', label: 'Загрузка видео', icon: '📁' },
        { path: '/video-editor', label: 'Редактор', icon: '✂️' },
        { path: '/media-library', label: 'Редактор', icon: '📁' }
    ];
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!isResizingRef.current) {
                return;
            }
            const delta = event.clientX - startXRef.current;
            const nextWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRef.current + delta));
            setWidth(nextWidth);
        };
        const handleMouseUp = () => {
            if (isResizingRef.current) {
                isResizingRef.current = false;
                document.body.style.cursor = '';
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    const handleResizeStart = (event) => {
        if (isCollapsed) {
            return;
        }
        isResizingRef.current = true;
        startXRef.current = event.clientX;
        startWidthRef.current = width;
        document.body.style.cursor = 'col-resize';
        event.preventDefault();
    };
    const handleToggle = () => {
        setIsCollapsed((prev) => {
            const next = !prev;
            if (!next && width < MIN_WIDTH) {
                setWidth(MIN_WIDTH);
            }
            return next;
        });
    };
    const currentWidth = isCollapsed ? COLLAPSED_WIDTH : width;
    return (_jsxs("div", { className: styles.sidebarWrapper, style: { width: currentWidth }, children: [_jsxs("aside", { className: `${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`, children: [_jsx("div", { className: styles.toggleRow, children: _jsx(Button, { appearance: "subtle", size: "small", onClick: handleToggle, className: styles.toggleButton, children: isCollapsed ? '>>' : '<<' }) }), _jsx("nav", { className: styles.sidebarNav, children: _jsx(MenuList, { className: `${styles.menuList} ${isCollapsed ? styles.menuListCollapsed : ''}`, children: menuItems.map((item) => (_jsxs(MenuItem, { onClick: () => navigate(item.path), "aria-current": location.pathname === item.path ? 'page' : undefined, className: `${styles.menuItem} ${isCollapsed ? styles.menuItemCollapsed : ''}`, children: [_jsx("span", { "aria-hidden": "true", children: item.icon }), _jsx("span", { className: isCollapsed ? styles.visuallyHidden : '', children: item.label })] }, item.path))) }) })] }), !isCollapsed && (_jsx("div", { className: styles.resizer, onMouseDown: handleResizeStart, role: "separator", "aria-orientation": "vertical", "aria-label": "Resize sidebar" }))] }));
};
