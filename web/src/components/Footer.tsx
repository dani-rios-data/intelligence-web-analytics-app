import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        TBWA Intelligence Analytics Platform
      </div>
      <div className={styles.footerCopyright}>
        © 2025 TBWA Intelligence. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 