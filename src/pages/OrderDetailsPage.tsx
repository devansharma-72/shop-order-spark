
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Order, toOrderStatus } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  
  useEffect(() => {
    if (!user || !id) {
      navigate('/login');
      return;
    }
    
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();
        
        if (orderError) {
          console.error('Error fetching order:', orderError);
          toast.error('Could not load order details');
          navigate('/account');
          return;
        }
        
        // Fetch order items
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
              category,
              description
            )
          `)
          .eq('order_id', id);
        
        if (itemsError) {
          console.error('Error fetching order items:', itemsError);
          toast.error('Could not load order items');
          return;
        }
        
        // Transform to match Order type
        setOrder({
          id: orderData.id,
          userId: orderData.user_id,
          totalAmount: orderData.total_amount,
          status: toOrderStatus(orderData.status),
          createdAt: orderData.created_at,
          shippingAddress: orderData.shipping_address,
          items: orderItems.map(item => ({
            quantity: item.quantity,
            product: {
              id: item.products.id,
              name: item.products.name,
              price: item.products.price,
              description: item.products.description || '',
              imageUrl: item.products.image_url || '',
              category: item.products.category,
              inStock: true
            }
          }))
        });
        
      } catch (error) {
        console.error('Error loading order details:', error);
        toast.error('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [id, user, navigate]);
  
  const handleCancelOrder = async () => {
    if (!order || !user) return;
    
    try {
      setIsCancelling(true);
      
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', order.id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast.success('Order cancelled successfully');
      setOrder({
        ...order,
        status: 'cancelled'
      });
      
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    } finally {
      setIsCancelling(false);
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10 px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!order) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/account')}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Account
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/account')}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Account
          </Button>
          
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <Button 
              variant="destructive" 
              onClick={handleCancelOrder} 
              disabled={isCancelling}
            >
              <XCircle className="mr-2" size={16} />
              Cancel Order
            </Button>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'delivered' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                  : order.status === 'shipped'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                  : order.status === 'cancelled'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img 
                        src={item.product.imageUrl || '/placeholder.svg'} 
                        alt={item.product.name} 
                        className="w-14 h-14 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.product.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">Subtotal</TableCell>
                  <TableCell className="text-right">${(order.totalAmount * 0.92).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">Tax (8%)</TableCell>
                  <TableCell className="text-right">${(order.totalAmount * 0.08).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">Total</TableCell>
                  <TableCell className="text-right font-bold">${order.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
              <p className="text-gray-700 dark:text-gray-300">{order.shippingAddress}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Shipping Status</h2>
              <div className="flex items-center gap-2">
                <Package size={20} className="text-shop-primary" />
                <span className="text-gray-700 dark:text-gray-300">
                  {order.status === 'delivered' ? 'Your order has been delivered' :
                   order.status === 'shipped' ? 'Your order is on the way' :
                   order.status === 'cancelled' ? 'This order has been cancelled' :
                   order.status === 'processing' ? 'Your order is being processed' :
                   'Your order has been placed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderDetailsPage;
