import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CurrencyExchange() {
  const [result, setResult] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Implement currency conversion
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Currency Exchange</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Currency</label>
              <select
                {...register('fromCurrency')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more currencies */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">To Currency</label>
              <select
                {...register('toCurrency')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                {/* Add more currencies */}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register('amount')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Convert
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium">Result</h3>
            <p className="text-2xl font-bold text-blue-600">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}