
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

interface ProfileCardProps {
  onEditProfile: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onEditProfile }) => {
  const { profile, user, logout } = useAuth();
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (!profile?.full_name) return 'U';
    return profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-16 h-16">
          {profile?.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={profile?.full_name || 'User'} />
          ) : (
            <AvatarFallback className="bg-shop-primary text-white text-lg">
              {getInitials()}
            </AvatarFallback>
          )}
        </Avatar>
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
