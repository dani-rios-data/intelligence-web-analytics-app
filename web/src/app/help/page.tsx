'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ServiceGuide from '../../components/ServiceGuide/ServiceGuide';

// Nota: En App Router de Next.js 13+, no se usa Head como componente
// Los metadatos se definen con una exportación de metadata o generateMetadata en el layout o en la página

const HelpPage: React.FC = () => {
  return <ServiceGuide />;
};

export default HelpPage;

// Los metadatos para páginas client-side se definen en el archivo page.tsx
// pero se procesarán en el servidor y no se aplicarán automáticamente.
// Para páginas client-side, es mejor definir los metadatos en un archivo layout.tsx del mismo directorio. 