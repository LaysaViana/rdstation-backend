import React from 'react';
import ReactDOM from 'react-dom/client';
import injectMobileFixes from './styles/inject-mobile-fixes';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/home/Home.page';
import './styles/index.css';

injectMobileFixes();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Layout>
        <HomePage />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
);
