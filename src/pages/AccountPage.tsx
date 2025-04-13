
import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { fetchOrdersByUserId } from '@/data/mockData';
import { Order } from '@/types';
import { Package, ShoppingBag, User as UserIcon, LogOut } from 'lucide-react';

const AccountPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      
      try {
        const userOrders = await fetchOrdersByUserId(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrders();
  }, [user]);
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-shop-primary text-white rounded-full w-16 h-16 flex items-center justify-center">
                <UserIcon size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <UserIcon size={18} className="mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag size={18} className="mr-2" />
                My Orders
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-shop-error hover:text-shop-error hover:bg-red-50"
                onClick={logout}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          {/* Order History */}
          <div className="md:col-span-2">
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
