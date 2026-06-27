import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminProvider } from './context/AdminContext';
import './styles/globals.css';
import './styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: 'var(--font-body)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                },
                success: {
                  style: { background: 'var(--c-green-pale)', color: 'var(--c-green-deep)' },
                  iconTheme: { primary: '#2E7D32', secondary: '#E8F5E9' },
                },
                error: {
                  style: { background: 'var(--c-red-pale)', color: 'var(--c-red-deep)' },
                  iconTheme: { primary: '#E53935', secondary: '#FDECEA' },
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);
