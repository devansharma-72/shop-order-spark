
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';

interface OrderHistoryProps {
  orders: Order[];
  isLoading: boolean;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Order History</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-24 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Package size={24} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-4">
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
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                  <Button variant="ghost" size="sm" className="ml-2">
                    Details
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{item.product.name}</h4>
                        <div className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between">
                  <div className="text-sm text-gray-600">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </div>
                  <div className="font-bold">
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
