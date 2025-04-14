
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarDesktopNav: React.FC = () => {
  return (
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
  );
};

export default NavbarDesktopNav;
