// src/components/Layout/Layout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function Layout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col" data-testid="layout-wrapper">
      <Header />

      <main className="w-full mx-auto max-w-7xl px-4 md:px-6 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
