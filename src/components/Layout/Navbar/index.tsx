
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopNav from './NavbarDesktopNav';
import NavbarSearch from './NavbarSearch';
import NavbarAuthButtons from './NavbarAuthButtons';
import NavbarCartIcon from './NavbarCartIcon';
import NavbarMobile from './NavbarMobile';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
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
          <NavbarLogo />
          
          {/* Desktop Navigation */}
          <NavbarDesktopNav />
          
          {/* Desktop Search, Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <NavbarSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            
            <ThemeToggle />
            
            <NavbarAuthButtons />
            
            <NavbarCartIcon />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <NavbarCartIcon />
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <NavbarMobile
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            toggleMenu={toggleMenu}
            isMenuOpen={isMenuOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
