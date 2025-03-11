import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Database, Bell, Users, Settings, HelpCircle } from 'lucide-react';
import styles from './Layout.module.scss';
import { ROUTES } from '@/lib/config';

interface SidebarProps {
  isOpen: boolean;
  closeMenu: () => void;
}

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeMenu }) => {
  const pathname = usePathname();
  
  const navigationItems: MenuItem[] = [
    { title: 'Dashboard', path: ROUTES.DASHBOARD, icon: <Home size={18} /> },
    { title: 'Services', path: ROUTES.SERVICES, icon: <Database size={18} /> },
  ];
  
  const notificationItems: MenuItem[] = [
    { title: 'Notification Center', path: '/notifications', icon: <Bell size={18} /> },
  ];
  
  const accountItems: MenuItem[] = [
    { title: 'Profile', path: '/profile', icon: <Users size={18} /> },
    { title: 'Settings', path: '/settings', icon: <Settings size={18} /> },
    { title: 'Help', path: ROUTES.HELP, icon: <HelpCircle size={18} /> },
  ];
  
  return (
    <>
      <div 
        className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}
        onClick={closeMenu}
      />
      <div 
        className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}
      >
        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Navigation</h3>
            <ul className={styles.menuList}>
              {navigationItems.map((item) => (
                <li key={item.path} className={styles.menuItem}>
                  <Link
                    href={item.path}
                    className={pathname === item.path ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Notifications</h3>
            <ul className={styles.menuList}>
              {notificationItems.map((item) => (
                <li key={item.path} className={styles.menuItem}>
                  <Link
                    href={item.path}
                    className={pathname === item.path ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Account</h3>
            <ul className={styles.menuList}>
              {accountItems.map((item) => (
                <li key={item.path} className={styles.menuItem}>
                  <Link
                    href={item.path}
                    className={pathname === item.path ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 