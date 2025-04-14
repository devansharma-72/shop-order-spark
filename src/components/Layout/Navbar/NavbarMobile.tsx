
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavbarMobileProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  toggleMenu,
  isMenuOpen
}) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="md:hidden mt-4 py-4 bg-shop-dark animate-fade-in">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 rounded-md text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Search size={18} />
          </button>
        </div>
      </form>
      
      <nav className="flex flex-col space-y-3">
        <Link 
          to="/" 
          className="py-2 hover:bg-gray-800 px-4 rounded" 
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link 
          to="/products" 
          className="py-2 hover:bg-gray-800 px-4 rounded" 
          onClick={toggleMenu}
        >
          Products
        </Link>
        <Link 
          to="/about" 
          className="py-2 hover:bg-gray-800 px-4 rounded" 
          onClick={toggleMenu}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className="py-2 hover:bg-gray-800 px-4 rounded" 
          onClick={toggleMenu}
        >
          Contact
        </Link>
        
        <div className="border-t border-gray-700 my-2 pt-2">
          {isAuthenticated ? (
            <>
              <Link 
                to="/account" 
                className="py-2 hover:bg-gray-800 px-4 rounded flex items-center gap-2" 
                onClick={toggleMenu}
              >
                <User size={18} />
                My Account
              </Link>
              <button 
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="w-full text-left py-2 hover:bg-gray-800 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block py-2 hover:bg-gray-800 px-4 rounded" 
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block py-2 bg-shop-primary hover:bg-shop-accent px-4 rounded mt-2" 
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
