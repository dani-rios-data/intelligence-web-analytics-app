import React from 'react';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ className = '', style }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`${styles.footer} ${className}`} style={style}>
      <div className={styles.footerBrand}>
        TBWA Intelligence Analytics Platform
      </div>
      <div className={styles.footerCopyright}>
        © {currentYear} TBWA Intelligence. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 