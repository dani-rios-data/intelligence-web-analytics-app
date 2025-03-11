'use client';

import React from 'react';
import Head from 'next/head';
import ServiceGuide from '../../components/ServiceGuide/ServiceGuide';

const HelpPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>TBWA Intelligence - Service Selection Guide</title>
        <meta name="description" content="TBWA Intelligence service selection guide" />
      </Head>
      
      <ServiceGuide />
    </>
  );
};

export default HelpPage; 