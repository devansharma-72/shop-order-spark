
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarAuthButtons from './NavbarAuthButtons';
import ThemeToggle from '../ThemeToggle';

interface NavbarMobileProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const NavbarMobile = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  toggleMenu
}: NavbarMobileProps) => {
  return (
    <div className="mt-4 pb-4 border-t border-gray-700">
      <form onSubmit={handleSearch} className="mt-4 flex">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 text-gray-900 bg-white rounded-l"
        />
        <Button type="submit" className="px-4 py-2 rounded-l-none">
          <Search size={20} />
        </Button>
      </form>
      
      <div className="flex flex-col mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <NavbarAuthButtons />
          <ThemeToggle />
        </div>
        
        <Link 
          to="/" 
          className="block px-4 py-2 hover:bg-gray-700 rounded" 
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link 
          to="/products" 
          className="block px-4 py-2 hover:bg-gray-700 rounded" 
          onClick={toggleMenu}
        >
          Products
        </Link>
        <Link 
          to="/about" 
          className="block px-4 py-2 hover:bg-gray-700 rounded" 
          onClick={toggleMenu}
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default NavbarMobile;
