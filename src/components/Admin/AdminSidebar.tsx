
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, profile } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-gray-600 text-sm">{profile?.full_name || 'Admin'}</p>
      </div>
      
      <nav className="space-y-2">
        <Link to="/admin">
          <Button 
            variant={isActive('/admin') ? "default" : "ghost"} 
            className="w-full justify-start"
          >
            <Package size={18} className="mr-2" />
            Products
          </Button>
        </Link>
        
        <Link to="/admin/users">
          <Button 
            variant={isActive('/admin/users') ? "default" : "ghost"} 
            className="w-full justify-start"
          >
            <Users size={18} className="mr-2" />
            Users
          </Button>
        </Link>
        
        <Link to="/admin/orders">
          <Button 
            variant={isActive('/admin/orders') ? "default" : "ghost"} 
            className="w-full justify-start"
          >
            <ShoppingCart size={18} className="mr-2" />
            Orders
          </Button>
        </Link>
        
        <Link to="/admin/settings">
          <Button 
            variant={isActive('/admin/settings') ? "default" : "ghost"} 
            className="w-full justify-start"
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-shop-error hover:text-shop-error hover:bg-red-50"
          onClick={() => logout()}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
