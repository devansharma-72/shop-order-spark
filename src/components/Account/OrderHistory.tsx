
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface OrderHistoryProps {
  orders: Order[];
  isLoading: boolean;
  refreshOrders: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, isLoading, refreshOrders }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCancelOrder = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to details
    if (!user) return;
    
    try {
      toast.loading('Cancelling order...');
      
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast.dismiss();
      toast.success('Order cancelled successfully');
      refreshOrders();
      
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.dismiss();
      toast.error('Failed to cancel order');
    }
  };
  
  const handleViewDetails = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Order History</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
              <div className="h-24 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Package size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2 dark:text-white">No Orders Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven't placed any orders yet.
          </p>
          <Link to="/products">
            <Button className="bg-shop-primary hover:bg-shop-accent button-hover">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div 
              key={order.id} 
              className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewDetails(order.id)}
            >
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b dark:border-gray-600 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Order #{order.id}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
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
                  
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={(e) => handleCancelOrder(order.id, e)}
                    >
                      <XCircle className="mr-1" size={14} />
                      Cancel
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm" className="ml-2 dark:text-gray-200">
                    Details
                    <ArrowRight className="ml-1" size={14} />
                  </Button>
                </div>
              </div>
              <div className="p-4 dark:bg-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <img 
                        src={item.product.imageUrl || '/placeholder.svg'} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium dark:text-white">{item.product.name}</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t dark:border-gray-700 flex justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </div>
                  <div className="font-bold dark:text-white">
                    Total: ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
