import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TBWA Intelligence - Service Selection Guide',
  description: 'Guía de selección de servicios para la plataforma TBWA Intelligence',
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="help-layout">
      {children}
    </div>
  );
} 