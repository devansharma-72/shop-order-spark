
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

interface ProductActionsProps {
  product: Product;
  quantity: number;
  onAddToCart: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, quantity, onAddToCart }) => {
  return (
    <div className="flex gap-4">
      <Button 
        className="flex-1 bg-shop-primary hover:bg-shop-accent button-hover py-6 text-lg"
        onClick={onAddToCart}
        disabled={!product.inStock}
      >
        <ShoppingCart className="mr-2" />
        Add to Cart
      </Button>
      
      <Link to="/checkout" className="flex-1">
        <Button 
          className="w-full bg-shop-dark hover:bg-opacity-80 button-hover py-6 text-lg"
          onClick={onAddToCart}
          disabled={!product.inStock}
        >
          Buy Now
        </Button>
      </Link>
    </div>
  );
};

export default ProductActions;
