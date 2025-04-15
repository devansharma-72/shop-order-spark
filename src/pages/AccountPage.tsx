
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Order, toOrderStatus } from '@/types';
import { toast } from 'sonner';
import ProfileCard from '@/components/Account/ProfileCard';
import OrderHistory from '@/components/Account/OrderHistory';
import EditProfileDialog from '@/components/Account/EditProfileDialog';
import { supabase } from '@/integrations/supabase/client';

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
  
  const loadOrders = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);

      // Fetch orders from Supabase
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (ordersError) throw ordersError;
      
      // For each order, fetch its items
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              quantity,
              price,
              products (
                id,
                name,
                price,
                image_url,
                category
              )
            `)
            .eq('order_id', order.id);
          
          if (itemsError) throw itemsError;
          
          // Transform to match Order type
          return {
            id: order.id,
            userId: order.user_id,
            totalAmount: order.total_amount,
            status: toOrderStatus(order.status),
            createdAt: order.created_at,
            shippingAddress: order.shipping_address,
            items: orderItems.map(item => ({
              quantity: item.quantity,
              product: {
                id: item.products.id,
                name: item.products.name,
                price: item.products.price,
                description: '',
                imageUrl: item.products.image_url || '',
                category: item.products.category,
                inStock: true
              }
            }))
          };
        })
      );
      
      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load your orders');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
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
            <OrderHistory orders={orders} isLoading={isLoading} refreshOrders={loadOrders} />
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
