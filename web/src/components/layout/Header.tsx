import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './Layout.module.scss';
import { ROUTES } from '@/lib/config';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const router = useRouter();

  const handleSignOut = () => {
    router.push(ROUTES.AUTH.SIGNIN);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button 
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link href={ROUTES.HOME} className={styles.logo}>
          <span>TBWA</span>
          <span className={styles.accent}>\</span>
          <span>INTELLIGENCE</span>
        </Link>
      </div>
      <button 
        onClick={handleSignOut} 
        className={`${styles.headerButton} ${styles.signOutButton}`}
      >
        <span>Sign Out</span>
        <LogOut size={20} />
      </button>
    </header>
  );
};

export default Header; 