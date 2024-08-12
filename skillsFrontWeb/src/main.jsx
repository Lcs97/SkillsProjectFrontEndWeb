import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes/routes';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <AppRoutes />
    <Footer />
  </React.StrictMode>
);
