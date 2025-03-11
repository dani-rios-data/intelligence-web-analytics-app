import React from 'react';
import styles from './Layout.module.scss';
import { APP_NAME } from '@/lib/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        {APP_NAME}
      </div>
      <p>
        © {currentYear} TBWA Intelligence. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer; 