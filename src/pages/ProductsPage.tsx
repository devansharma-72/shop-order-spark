
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ProductGrid from '@/components/Products/ProductGrid';
import { Button } from '@/components/ui/button';
import { fetchProducts } from '@/data/mockData';
import { Product } from '@/types';
import { Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get the category filter from URL
  const categoryFilter = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(allProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Filter products based on category and search query
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, categoryFilter, searchQuery]);
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
    setShowFilters(false);
  };
  
  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Shop All Products</h1>
          
          <Button 
            variant="outline" 
            className="md:hidden flex items-center gap-2"
            onClick={toggleFilters}
          >
            <Filter size={18} />
            Filters
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                {(categoryFilter !== 'All' || searchQuery) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-shop-primary"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div 
                      key={category} 
                      className={`cursor-pointer px-3 py-2 rounded-md ${
                        categoryFilter === category 
                          ? 'bg-shop-primary text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Add more filters here (price range, etc.) */}
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
              <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleFilters}
                      className="text-gray-500"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Categories</h3>
                    {(categoryFilter !== 'All' || searchQuery) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-sm text-gray-500"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category} 
                        className={`cursor-pointer px-3 py-2 rounded-md ${
                          categoryFilter === category 
                            ? 'bg-shop-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  
                  {/* Add more filters here (price range, etc.) */}
                </div>
              </div>
            </div>
          )}
          
          {/* Product Listing */}
          <div className="flex-grow">
            {/* Active Filters */}
            {(categoryFilter !== 'All' || searchQuery) && (
              <div className="bg-gray-100 p-3 rounded-lg mb-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-700">Active filters:</span>
                  
                  {categoryFilter !== 'All' && (
                    <div className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      Category: {categoryFilter}
                      <button 
                        className="ml-1 text-gray-500 hover:text-shop-primary"
                        onClick={() => handleCategoryChange('All')}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {searchQuery && (
                    <div className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      Search: {searchQuery}
                      <button 
                        className="ml-1 text-gray-500 hover:text-shop-primary"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('search');
                          setSearchParams(params);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-shop-primary"
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Results Count */}
            {!isLoading && (
              <p className="mb-4 text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            )}
            
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
