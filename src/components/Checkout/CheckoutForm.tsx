
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';
import { useCart } from '@/context/CartContext';
import ShippingAddressForm from './ShippingAddressForm';
import PaymentForm from './PaymentForm';

const CheckoutForm = () => {
  const { formData, handleInputChange, handleSubmit } = useCheckoutForm();
  const { totalPrice } = useCart();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-medium mb-2">Shipping Information</h2>
      <ShippingAddressForm 
        formData={formData} 
        onChange={handleInputChange} 
      />
      
      <h2 className="text-lg font-medium mt-8 mb-2">Payment Information</h2>
      <PaymentForm 
        formData={formData} 
        onChange={handleInputChange} 
      />
      
      <Button type="submit" className="w-full bg-shop-primary hover:bg-shop-accent button-hover">
        Pay ${totalPrice.toFixed(2)}
      </Button>
    </form>
  );
};

export default CheckoutForm;
