
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { fetchProductById, fetchProducts } from '@/data/mockData';
import { Product } from '@/types';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/Products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productData = await fetchProductById(id);
        if (productData) {
          setProduct(productData);
          
          // Load related products (same category)
          const allProducts = await fetchProducts();
          const related = allProducts
            .filter(p => p.id !== id && p.category === productData.category)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (isLoading) {
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
  }
  
  if (!product) {
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
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-shop-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-shop-primary">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-shop-primary">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <Link to="/products" className="inline-flex items-center text-shop-primary hover:underline mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Back to Products
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-gray-600 mb-4">{product.category}</div>
            
            <div className="text-2xl font-bold text-shop-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <div className="h-10 w-12 flex items-center justify-center border-x">
                    {quantity}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-l-none"
                    onClick={incrementQuantity}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-shop-primary hover:bg-shop-accent button-hover py-6 text-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </Button>
              
              <Link to="/checkout" className="flex-1">
                <Button 
                  className="w-full bg-shop-dark hover:bg-opacity-80 button-hover py-6 text-lg"
                  onClick={() => {
                    // Add to cart first, then navigate to checkout
                    if (product.inStock) {
                      addToCart(product, quantity);
                    }
                  }}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </Link>
            </div>
            
            {!product.inStock && (
              <div className="mt-4 bg-red-50 text-shop-error p-3 rounded-md">
                This product is currently out of stock.
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
