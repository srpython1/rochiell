import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StockTrading from './pages/StockTrading';
import Budget from './pages/Budget';
import News from './pages/News';
import CurrencyExchange from './pages/CurrencyExchange';
import FinanceBot from './pages/FinanceBot';

const queryClient = new QueryClient();

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trading" element={<StockTrading />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/news" element={<News />} />
                <Route path="/exchange" element={<CurrencyExchange />} />
                <Route path="/bot" element={<FinanceBot />} />
              </Routes>
            </main>
          </div>
          <Toaster position="bottom-right" />
        </Router>
      </QueryClientProvider>
    </ClerkProvider>
  );
}