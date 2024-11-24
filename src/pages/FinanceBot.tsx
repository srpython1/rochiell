import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FinanceBot() {
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: data.message }]);
      
      // Here you would integrate with an AI service
      const botResponse = "This is a placeholder response. In production, this would be connected to an AI service.";
      
      // Add bot response
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      
      reset();
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finance Bot</h1>

      <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
            <input
              {...register('message')}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ask about investments, market analysis, or financial advice..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}