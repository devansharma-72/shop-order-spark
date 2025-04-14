
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      ShopSpark
    </Link>
  );
};

export default NavbarLogo;
