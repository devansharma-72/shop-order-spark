
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/Products/ProductGrid';
import { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ProductsPage = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching products:', error);
          toast.error('Failed to load products.');
        } else {
          // Map database fields to our Product interface
          const mappedProducts: Product[] = data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.image_url || '',
            category: item.category,
            inStock: item.in_stock
          }));
          
          setProducts(mappedProducts);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl text-gray-600 mb-8">
              Please log in or register to view our products and start shopping
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
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
