
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/Layout/MainLayout';
import ProductGrid from '@/components/Products/ProductGrid';
import { fetchProducts } from '@/data/mockData';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        // Get 4 random products for the featured section
        const randomProducts = [...products]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedProducts(randomProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-shop-dark text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shop The Best Products Online
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Discover our curated collection of premium products at competitive prices. 
                From electronics to fashion, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-shop-primary hover:bg-shop-accent button-hover text-lg px-6 py-3">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-shop-dark text-lg px-6 py-3">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800&q=80" 
                alt="Shopping Experience" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/products?category=Electronics" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-40 bg-shop-primary bg-opacity-10 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" 
                    alt="Electronics" 
                    className="object-cover h-32 w-32"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium group-hover:text-shop-primary transition-colors">
                    Electronics
                  </h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Accessories" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-40 bg-shop-secondary bg-opacity-10 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" 
                    alt="Accessories" 
                    className="object-cover h-32 w-32"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium group-hover:text-shop-primary transition-colors">
                    Accessories
                  </h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Footwear" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-40 bg-shop-accent bg-opacity-10 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" 
                    alt="Footwear" 
                    className="object-cover h-32 w-32"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium group-hover:text-shop-primary transition-colors">
                    Footwear
                  </h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Home" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-40 bg-shop-primary bg-opacity-10 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80" 
                    alt="Home & Kitchen" 
                    className="object-cover h-32 w-32"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium group-hover:text-shop-primary transition-colors">
                    Home & Kitchen
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline" className="border-shop-primary text-shop-primary hover:bg-shop-primary hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="bg-shop-primary text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Get 15% Off Your First Order</h2>
              <p className="text-shop-light mb-4 md:mb-0">Sign up for our newsletter and receive a welcome discount!</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="py-3 px-4 rounded-l-md w-full md:w-auto focus:outline-none text-gray-800"
              />
              <Button className="bg-shop-dark hover:bg-opacity-80 rounded-l-none button-hover">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-shop-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We carefully select and test every product we sell to ensure the highest quality for our customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-shop-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick and reliable shipping with real-time tracking for all your orders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-shop-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Your transactions are protected with industry-leading security and encryption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
