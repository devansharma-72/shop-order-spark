
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import ProductSlideshow from '@/components/Products/ProductSlideshow';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

const IndexPage = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(10)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        // Map database fields to our Product interface
        const mappedProducts = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.image_url || '',
          category: item.category,
          inStock: item.in_stock
        }));

        setProducts(mappedProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
          {!isAuthenticated && (
            <div className="max-w-2xl mx-auto">
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

        {!isLoading && products.length > 0 && (
          <ProductSlideshow products={products} />
        )}
      </div>
    </MainLayout>
  );
};

export default IndexPage;
