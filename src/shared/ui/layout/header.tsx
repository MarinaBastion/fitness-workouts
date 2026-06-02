import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import styles from './header.module.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          🎬 Медиатека
        </Link>
      </div>
      <nav className={styles.nav}>
        <Button
          appearance="subtle"
          onClick={() => navigate('/media-library-settings')}
        >
          Медиатека
        </Button>
        <Button
          appearance="subtle"
          onClick={() => navigate('/video-editor')}
        >
          Редактор
        </Button>
      </nav>
    </header>
  );
};