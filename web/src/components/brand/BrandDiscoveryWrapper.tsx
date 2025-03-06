'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BrandDiscoveryWrapper() {
  const router = useRouter();

  return (
    <div className="brand-wrapper">
      <nav className="brand-nav">
        <button 
          onClick={() => router.push('/services')}
          className="brand-nav-back"
        >
          <ArrowLeft size={20} />
          <span>Back to Menu</span>
        </button>
        <div className="brand-nav-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
      </nav>
      
      <iframe 
        src="https://tbwa-intelligence.replit.app/"
        className="brand-frame"
        title="Brand Discovery Analysis"
      />

      <style jsx>{`
        .brand-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #000;
        }

        .brand-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: #000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .brand-nav-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: #fff;
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .brand-nav-back:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .brand-nav-brand {
          font-size: 1.25rem;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.5px;
        }

        .brand-nav-brand span {
          color: #facc15;
        }

        .brand-frame {
          flex: 1;
          width: 100%;
          border: none;
        }
      `}</style>
    </div>
  );
} 