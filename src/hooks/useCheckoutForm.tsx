
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useCheckoutForm = () => {
  const { user, profile } = useAuth();
  const { items, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  // Pre-fill form with user data if available
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to place an order');
      navigate('/login');
      return;
    }
    
    // Process payment and create order
    toast.loading('Processing payment...');
    
    try {
      // Create shipping address string
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`;
      
      // Calculate total amount (including tax)
      const taxAmount = totalPrice * 0.08;
      const totalAmount = totalPrice + taxAmount;
      
      // Insert order into Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_address: shippingAddress
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Insert order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      toast.dismiss();
      toast.success('Payment successful!');
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.dismiss();
      toast.error('There was an error processing your order. Please try again.');
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};
