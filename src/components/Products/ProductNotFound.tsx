
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';

const ProductNotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products">
          <Button className="bg-shop-primary hover:bg-shop-accent button-hover">
            Back to Products
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default ProductNotFound;
