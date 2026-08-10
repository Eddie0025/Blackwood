import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description, path = '/' }) {
  const siteName = 'Blackwood Technologies';
  const baseUrl = 'https://blackwoodtech.com';
  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — Autonomous Intelligence Systems`;
  const fullUrl = `${baseUrl}${path}`;
  const defaultDescription = 'Blackwood Technologies builds advanced autonomous intelligence systems for defense, cybersecurity, and enterprise.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
}

export default SEO;
