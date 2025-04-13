
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {!product.inStock && (
          <div className="absolute top-0 right-0 bg-shop-error px-2 py-1 text-white text-xs font-medium">
            Out of Stock
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`}>
              <Button size="sm" variant="secondary" className="rounded-full w-9 h-9 p-0">
                <Eye size={16} />
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="rounded-full w-9 h-9 p-0 bg-shop-primary hover:bg-shop-accent"
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-medium mb-1 hover:text-shop-primary transition-colors">
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            className="bg-shop-primary hover:bg-shop-accent button-hover text-white"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
