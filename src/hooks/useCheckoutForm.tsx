
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
          shipping_address: shippingAddress,
          status: 'pending' // Explicitly set the initial status
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Transform any non-UUID product IDs into valid UUIDs before inserting
      const orderItems = items.map(item => {
        let productId = item.product.id;
        
        // If product ID is not a valid UUID, generate a deterministic UUID from it
        if (!isValidUUID(productId)) {
          productId = generateDeterministicUUID(productId);
          console.log(`Transformed product ID ${item.product.id} to UUID ${productId}`);
        }
        
        return {
          order_id: orderData.id,
          product_id: productId,
          quantity: item.quantity,
          price: item.product.price
        };
      });
      
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

  // Helper function to validate UUID format
  const isValidUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  // Helper function to generate a deterministic UUID from a string
  const generateDeterministicUUID = (input: string) => {
    // A very simple deterministic algorithm to generate a UUID-like string
    // For demo purposes only - not cryptographically secure
    const hash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash).toString(16).padStart(8, '0');
    };
    
    const part1 = hash(input).substring(0, 8);
    const part2 = hash(input + '1').substring(0, 4);
    const part3 = '4' + hash(input + '2').substring(0, 3); // Version 4 UUID
    const part4 = '8' + hash(input + '3').substring(0, 3); // Variant 8 for UUID
    const part5 = hash(input + '4').substring(0, 12);
    
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};
