import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { stockApi } from '../lib/api';
import PayPalButton from '../components/PayPalButton';

const searchSchema = z.object({
  symbol: z.string().min(1, 'Stock symbol is required'),
});

const tradeSchema = z.object({
  symbol: z.string().min(1, 'Stock symbol is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  type: z.enum(['buy', 'sell']),
});

type SearchForm = z.infer<typeof searchSchema>;
type TradeForm = z.infer<typeof tradeSchema>;

export default function StockTrading() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const onSearch = async (data: SearchForm) => {
    try {
      const results = await stockApi.search(data.symbol);
      setSearchResults(results.bestMatches || []);
      toast.success('Stocks found!');
    } catch (error) {
      toast.error('Error searching stocks');
      console.error('Search error:', error);
    }
  };

  const handleTrade = async (type: 'buy' | 'sell', symbol: string, quantity: number) => {
    try {
      const quote = await stockApi.getQuote(symbol);
      const price = parseFloat(quote['Global Quote']['05. price']);
      setSelectedStock({ symbol, price, quantity, type });
    } catch (error) {
      toast.error('Error getting stock quote');
      console.error('Trade error:', error);
    }
  };

  const handlePaymentSuccess = (details: any) => {
    toast.success('Trade executed successfully!');
    setSelectedStock(null);
  };

  const handlePaymentError = (error: any) => {
    toast.error('Payment failed');
    console.error('Payment error:', error);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stock Trading</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSearch)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Search Stocks</label>
            <input
              {...register('symbol')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter stock symbol (e.g., AAPL)"
            />
            {errors.symbol && (
              <p className="mt-1 text-sm text-red-600">{errors.symbol.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="space-y-4">
            {searchResults.map((stock: any) => (
              <div key={stock['1. symbol']} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{stock['1. symbol']}</h3>
                  <p className="text-sm text-gray-600">{stock['2. name']}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleTrade('buy', stock['1. symbol'], 1)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleTrade('sell', stock['1. symbol'], 1)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Sell
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedStock && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Complete Trade</h2>
          <div className="mb-4">
            <p>Symbol: {selectedStock.symbol}</p>
            <p>Price: ${selectedStock.price}</p>
            <p>Quantity: {selectedStock.quantity}</p>
            <p>Total: ${(selectedStock.price * selectedStock.quantity).toFixed(2)}</p>
          </div>
          <PayPalButton
            amount={selectedStock.price * selectedStock.quantity}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      )}
    </div>
  );
}