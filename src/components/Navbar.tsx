import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Rochiell
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/trading" className="text-gray-600 hover:text-blue-600">Trading</Link>
            <Link to="/budget" className="text-gray-600 hover:text-blue-600">Budget</Link>
            <Link to="/news" className="text-gray-600 hover:text-blue-600">News</Link>
            <Link to="/exchange" className="text-gray-600 hover:text-blue-600">Exchange</Link>
            <Link to="/bot" className="text-gray-600 hover:text-blue-600">FinanceBot</Link>
          </div>

          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}