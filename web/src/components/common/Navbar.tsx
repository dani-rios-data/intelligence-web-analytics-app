'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="nav">
      <div className="container nav-container">
        <Link href="/" className="nav-brand">
          <Image
            src="/images/logo_tbwa.svg"
            alt="TBWA Logo"
            width={120}
            height={40}
            className="nav-logo"
          />
        </Link>

        {session && (
          <div className="nav-menu">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/upload" className="nav-link">
              Upload File
            </Link>
            <button onClick={() => signOut()} className="btn btn-danger">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
} 