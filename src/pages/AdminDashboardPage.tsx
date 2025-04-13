
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import AdminProductsPanel from '@/components/Admin/AdminProductsPanel';
import AdminSidebar from '@/components/Admin/AdminSidebar';

const AdminDashboardPage = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-shop-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AdminSidebar />
          
          <div className="md:col-span-3">
            <AdminProductsPanel />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardPage;
