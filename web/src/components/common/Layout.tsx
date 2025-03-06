import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {children}
      <footer className="bg-white shadow-sm py-4 mt-8">
        <div className="container text-center text-gray-600">
          © {new Date().getFullYear()} TBWA. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 