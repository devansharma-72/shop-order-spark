
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';

const ProductDetailLoading: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/6 mb-6"></div>
              <div className="h-24 bg-gray-300 rounded w-full mb-6"></div>
              <div className="h-10 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailLoading;
