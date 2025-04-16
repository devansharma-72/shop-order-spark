import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const IndexPage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        {isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our wide range of products and find something you'll love.
            </p>
            <Link to="/products">
              <Button className="bg-shop-primary hover:bg-shop-accent">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl text-gray-600 mb-8">
              Please log in or register to start shopping
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button className="bg-shop-primary hover:bg-shop-accent">
                  Login to Shop
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default IndexPage;
