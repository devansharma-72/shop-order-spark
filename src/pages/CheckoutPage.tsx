
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import CheckoutForm from '@/components/Checkout/CheckoutForm';

const CheckoutPage = () => {
  const { items, totalItems, totalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={32} className="text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            You need to add some items to your cart before checking out.
          </p>
          <Link to="/products">
            <Button className="bg-shop-primary hover:bg-shop-accent button-hover">
              Browse Products
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <CheckoutForm />
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <p className="text-gray-600 mb-4">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
              </p>
              
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/cart" className="text-shop-primary hover:underline block text-center">
                  Edit Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
