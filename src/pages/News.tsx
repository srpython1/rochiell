import { useEffect, useState } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // Fetch financial news and investment tips
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial News & Tips</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Latest News</h2>
          <div className="space-y-4">
            {/* News items will be populated here */}
            <div className="border-b pb-4">
              <h3 className="font-medium">Sample Financial News</h3>
              <p className="text-gray-600">This is a placeholder for financial news content.</p>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Investment Tips</h2>
          <div className="space-y-4">
            {/* Investment tips will be populated here */}
            <div className="border-b pb-4">
              <h3 className="font-medium">Diversification Strategy</h3>
              <p className="text-gray-600">Learn about portfolio diversification and risk management.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}