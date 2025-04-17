
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/types';
import ProductQuantitySelector from './ProductQuantitySelector';
import ProductActions from './ProductActions';

interface ProductDetailInfoProps {
  product: Product;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  onAddToCart: () => void;
}

const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ 
  product, 
  quantity, 
  incrementQuantity, 
  decrementQuantity,
  onAddToCart
}) => {
  return (
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
      
      <ProductQuantitySelector 
        quantity={quantity}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
      />
      
      <ProductActions 
        product={product} 
        quantity={quantity}
        onAddToCart={onAddToCart}
      />
      
      {!product.inStock && (
        <div className="mt-4 bg-red-50 text-shop-error p-3 rounded-md">
          This product is currently out of stock.
        </div>
      )}
    </div>
  );
};

export default ProductDetailInfo;
