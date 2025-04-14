
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { fetchOrdersByUserId } from '@/data/mockData';
import { Order } from '@/types';
import { toast } from 'sonner';
import ProfileCard from '@/components/Account/ProfileCard';
import OrderHistory from '@/components/Account/OrderHistory';
import EditProfileDialog from '@/components/Account/EditProfileDialog';

const AccountPage = () => {
  const { user, profile, isAuthenticated, updateProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatarUrl: ''
  });
  
  useEffect(() => {
    // Update form data when profile changes
    if (profile) {
      setFormData({
        fullName: profile.full_name || '',
        email: user?.email || '',
        avatarUrl: profile.avatar_url || ''
      });
    }
  }, [profile, user]);
  
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      
      try {
        const userOrders = await fetchOrdersByUserId(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrders();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    try {
      await updateProfile({
        full_name: formData.fullName,
        avatar_url: formData.avatarUrl
      });
      
      setIsEditDialogOpen(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile */}
          <ProfileCard onEditProfile={() => setIsEditDialogOpen(true)} />
          
          {/* Order History */}
          <div className="md:col-span-2">
            <OrderHistory orders={orders} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleProfileUpdate}
      />
    </MainLayout>
  );
};

export default AccountPage;
