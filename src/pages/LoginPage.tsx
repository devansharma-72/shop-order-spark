
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import AuthForm from '@/components/Auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <AuthForm mode="login" />
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
