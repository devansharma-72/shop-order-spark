
import React from 'react';
import { Edit, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import UserAvatar from './UserAvatar';

interface ProfileCardProps {
  onEditProfile: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onEditProfile }) => {
  const { profile, user, logout } = useAuth();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4 mb-6">
        <UserAvatar 
          avatarUrl={profile?.avatar_url}
          fullName={profile?.full_name}
          className="w-16 h-16"
        />
        <div>
          <h2 className="text-xl font-bold">{profile?.full_name || 'Welcome'}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={onEditProfile}
        >
          <Edit size={18} className="mr-2" />
          Edit Profile
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <ShoppingBag size={18} className="mr-2" />
          My Orders
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-shop-error hover:text-shop-error hover:bg-red-50"
          onClick={logout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
