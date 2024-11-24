import React from 'react';
import { createRoot } from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/paypal-js';
import App from './App';
import './index.css';

const paypalOptions = {
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: 'USD',
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalOptions}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);