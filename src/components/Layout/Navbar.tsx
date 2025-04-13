
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Search
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would implement search logic here
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <header className="bg-shop-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            ShopSpark
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-shop-secondary transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-shop-secondary transition-colors">
              Products
            </Link>
            <Link to="/about" className="hover:text-shop-secondary transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-shop-secondary transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Desktop Search, Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="py-1 px-3 pr-8 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-shop-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={16} />
              </button>
            </form>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="hover:text-shop-secondary flex items-center gap-1">
                  <User size={20} />
                  <span className="text-sm">{user?.name.split(' ')[0]}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="hover:text-shop-secondary hover:bg-transparent"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="hover:text-shop-secondary hover:bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-shop-primary hover:bg-shop-accent button-hover">
                    Register
                  </Button>
                </Link>
              </div>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-white hover:text-shop-secondary transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
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
        )}
      </div>
    </header>
  );
};

export default Navbar;
