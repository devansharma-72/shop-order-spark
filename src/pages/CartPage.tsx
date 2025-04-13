
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/Cart/CartItem';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-shop-primary hover:bg-shop-accent button-hover">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">
                  Cart Items ({totalItems})
                </h2>
                <Button 
                  variant="ghost" 
                  className="text-shop-error hover:text-shop-error hover:bg-red-50"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="divide-y">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
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
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full bg-shop-primary hover:bg-shop-accent button-hover py-6 text-lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              
              <div className="mt-6">
                <Link to="/products" className="text-shop-primary hover:underline flex items-center justify-center">
                  <ArrowRight className="mr-2 rotate-180" size={16} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
