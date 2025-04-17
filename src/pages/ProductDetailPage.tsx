
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Product } from '@/types';
import { fetchProductById, fetchRelatedProducts } from '@/services/productDetailService';
import ProductBreadcrumbs from '@/components/Products/ProductBreadcrumbs';
import ProductImageDisplay from '@/components/Products/ProductImageDisplay';
import ProductDetailInfo from '@/components/Products/ProductDetailInfo';
import RelatedProducts from '@/components/Products/RelatedProducts';
import ProductDetailLoading from '@/components/Products/ProductDetailLoading';
import ProductNotFound from '@/components/Products/ProductNotFound';

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
          
          // Load related products
          const relatedData = await fetchRelatedProducts(productData.category, id);
          setRelatedProducts(relatedData);
        }
      } catch (error) {
        console.error('Error in product fetch:', error);
        toast.error('Something went wrong');
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
      toast.success(`${quantity} × ${product.name} added to cart`);
    }
  };
  
  if (isLoading) {
    return <ProductDetailLoading />;
  }
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumbs 
          productName={product.name} 
          category={product.category} 
        />
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <ProductImageDisplay 
            imageUrl={product.imageUrl} 
            productName={product.name} 
          />
          
          <ProductDetailInfo 
            product={product}
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
        
        <RelatedProducts products={relatedProducts} />
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
