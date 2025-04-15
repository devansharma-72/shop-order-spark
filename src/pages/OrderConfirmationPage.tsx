
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const OrderConfirmationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState<string>('');
  
  useEffect(() => {
    // Get order ID from URL params if available
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
      setOrderNumber(orderId);
    } else {
      // Fallback - generate a random order number
      setOrderNumber(Math.floor(1000000 + Math.random() * 9000000).toString());
    }
    
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, location.search]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 text-shop-success">
            <CheckCircle size={64} className="mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and is now being processed.
          </p>
          
          <div className="bg-shop-primary bg-opacity-10 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="font-bold text-xl">{orderNumber}</p>
          </div>
          
          <p className="text-gray-600 mb-8">
            We'll send you a confirmation email with your order details and tracking information once your package ships.
          </p>
          
          <div className="flex flex-col space-y-4">
            {orderNumber && (
              <Link to={`/order/${orderNumber}`}>
                <Button variant="outline" className="w-full">
                  <Package className="mr-2" size={16} />
                  View Order Details
                </Button>
              </Link>
            )}
            
            <Link to="/account">
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </Link>
            
            <Link to="/products">
              <Button className="w-full bg-shop-primary hover:bg-shop-accent button-hover">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmationPage;
