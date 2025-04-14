
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarCartIconProps {
  className?: string;
}

const NavbarCartIcon: React.FC<NavbarCartIconProps> = ({ className = '' }) => {
  const { totalItems } = useCart();
  
  return (
    <Link to="/cart" className={`relative ${className}`}>
      <ShoppingCart className="text-white hover:text-shop-secondary transition-colors" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-shop-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default NavbarCartIcon;
