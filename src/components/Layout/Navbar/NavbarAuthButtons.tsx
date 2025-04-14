
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const NavbarAuthButtons: React.FC = () => {
  const { profile, isAuthenticated, logout } = useAuth();
  
  // Get the first name from profile if available
  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'User';
  
  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/account" className="hover:text-shop-secondary flex items-center gap-1">
          <User size={20} />
          <span className="text-sm">{firstName}</span>
        </Link>
        <Button 
          variant="ghost" 
          onClick={logout}
          className="hover:text-shop-secondary hover:bg-transparent"
        >
          Logout
        </Button>
      </div>
    );
  }
  
  return (
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
  );
};

export default NavbarAuthButtons;
