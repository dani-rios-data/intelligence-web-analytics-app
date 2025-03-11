import React from 'react';
import { LayoutProps } from '@/types';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import styles from './Layout.module.scss';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Páginas que no deberían mostrar el header y el footer (por ejemplo, páginas de autenticación)
  const isAuthPage = pathname?.startsWith('/auth') || pathname === '/signin' || pathname === '/verify';
  
  if (isAuthPage) {
    return <div className={styles.authLayout}>{children}</div>;
  }
  
  return (
    <div className={styles.layout}>
      <Header toggleSidebar={toggleSidebar} />
      <div className={styles.container}>
        <Sidebar isOpen={isSidebarOpen} closeMenu={() => setIsSidebarOpen(false)} />
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 