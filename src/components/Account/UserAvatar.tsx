
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  avatarUrl?: string | null;
  fullName?: string | null;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, fullName, className }) => {
  // Get initials for avatar fallback
  const getInitials = () => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Avatar className={className}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={fullName || 'User'} />
      ) : (
        <AvatarFallback className="bg-shop-primary text-white text-lg">
          {getInitials()}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
