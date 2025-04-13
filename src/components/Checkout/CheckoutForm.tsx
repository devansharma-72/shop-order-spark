import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CheckoutForm = () => {
  const { user, profile } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
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
    console.log('Processing order:', { user, items: cart, shipping: formData });
    
    // Simulate payment processing delay
    toast.loading('Processing payment...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Payment successful!');
      clearCart();
      navigate('/order-confirmation');
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={formData.cardExpiry}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            placeholder="MM/YY"
            required
          />
        </div>
        
        <div>
          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input
            type="text"
            id="cardCvc"
            name="cardCvc"
            value={formData.cardCvc}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-shop-primary hover:bg-shop-accent button-hover">
        Pay ${totalPrice.toFixed(2)}
      </Button>
    </form>
  );
};

export default CheckoutForm;
