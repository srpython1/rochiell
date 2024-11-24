import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Budget() {
  const [budgetType, setBudgetType] = useState('personal');
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget Planning</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setBudgetType('personal')}
          className={`px-4 py-2 rounded-md ${
            budgetType === 'personal' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Personal Budget
        </button>
        <button
          onClick={() => setBudgetType('business')}
          className={`px-4 py-2 rounded-md ${
            budgetType === 'business' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Business Budget
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Income</label>
            <input
              type="number"
              {...register('income')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expenses</label>
            <div className="space-y-2">
              {budgetType === 'personal' ? (
                <>
                  <input {...register('housing')} placeholder="Housing" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  <input {...register('food')} placeholder="Food" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  <input {...register('transportation')} placeholder="Transportation" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </>
              ) : (
                <>
                  <input {...register('operational')} placeholder="Operational Costs" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  <input {...register('payroll')} placeholder="Payroll" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  <input {...register('marketing')} placeholder="Marketing" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Budget
          </button>
        </form>
      </div>
    </div>
  );
}