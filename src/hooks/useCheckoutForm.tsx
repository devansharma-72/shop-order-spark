
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export const useCheckoutForm = () => {
  const { user, profile } = useAuth();
  const { items, clearCart } = useCart();
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and create order
    console.log('Processing order:', { user, items, shipping: formData });
    
    // Simulate payment processing delay
    toast.loading('Processing payment...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Payment successful!');
      clearCart();
      navigate('/order-confirmation');
    }, 1500);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};
