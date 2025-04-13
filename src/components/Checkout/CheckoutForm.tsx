
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/data/mockData';
import { toast } from 'sonner';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Simple formatting for card inputs
    if (name === 'cardNumber') {
      // Strip non-digits and limit to 16 digits
      const formatted = value.replace(/\D/g, '').substring(0, 16);
      // Add spaces every 4 digits
      const withSpaces = formatted.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData({ ...formData, [name]: withSpaces });
    } else if (name === 'cardExpiry') {
      // Strip non-digits and limit to 4 digits
      const formatted = value.replace(/\D/g, '').substring(0, 4);
      // Add slash after first 2 digits
      if (formatted.length > 2) {
        setFormData({ ...formData, [name]: `${formatted.substring(0, 2)}/${formatted.substring(2)}` });
      } else {
        setFormData({ ...formData, [name]: formatted });
      }
    } else if (name === 'cardCvc') {
      // Strip non-digits and limit to 3-4 digits
      const formatted = value.replace(/\D/g, '').substring(0, 4);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, we would process payment with Stripe or another provider here
      
      // Create the order
      await createOrder({
        userId: user?.id || 'guest',
        items: items,
        totalAmount: totalPrice,
        status: 'processing',
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
      });
      
      // Success!
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('There was a problem processing your order');
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-medium mb-4">Please login to continue</h2>
        <Button onClick={() => navigate('/login')} className="bg-shop-primary hover:bg-shop-accent button-hover">
          Login to Checkout
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="input-field w-full"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field w-full"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="input-field w-full"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="input-field w-full"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="input-field w-full"
                required
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                className="input-field w-full"
                required
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="input-field w-full"
              required
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              id="cardExpiry"
              name="cardExpiry"
              type="text"
              placeholder="MM/YY"
              className="input-field w-full"
              required
              value={formData.cardExpiry}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              id="cardCvc"
              name="cardCvc"
              type="text"
              placeholder="123"
              className="input-field w-full"
              required
              value={formData.cardCvc}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-shop-primary hover:bg-shop-accent text-white py-3 text-lg button-hover"
          disabled={isProcessing || items.length === 0}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
