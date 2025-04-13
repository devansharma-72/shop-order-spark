
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import AuthForm from '@/components/Auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

const RegisterPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Wait until auth is loaded
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-shop-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <AuthForm mode="register" />
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
