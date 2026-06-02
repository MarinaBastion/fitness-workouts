import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, MenuItem, MenuList } from '@fluentui/react-components';
import styles from './sidebar.module.css';

const MIN_WIDTH = 200;
const MAX_WIDTH = 360;
const COLLAPSED_WIDTH = 32;

export const Sidebar: React.FC = () => {
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
  ]

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
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

  const handleResizeStart = (event: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <div className={styles.sidebarWrapper} style={{ width: currentWidth }}>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.toggleRow}>
          <Button
            appearance="subtle"
            size="small"
            onClick={handleToggle}
            className={styles.toggleButton}
          >
            {isCollapsed ? '>>' : '<<'}
          </Button>
        </div>
        <nav className={styles.sidebarNav}>
          <MenuList className={`${styles.menuList} ${isCollapsed ? styles.menuListCollapsed : ''}`}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                className={`${styles.menuItem} ${isCollapsed ? styles.menuItemCollapsed : ''}`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span className={isCollapsed ? styles.visuallyHidden : ''}>{item.label}</span>
              </MenuItem>
            ))}
          </MenuList>
        </nav>
      </aside>
      {!isCollapsed && (
        <div
          className={styles.resizer}
          onMouseDown={handleResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
        />
      )}
    </div>
  );
};
