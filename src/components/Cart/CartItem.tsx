
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row border-b py-4 gap-4">
      <div className="flex-shrink-0">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-24 h-24 object-cover rounded-md"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-lg hover:text-shop-primary">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-r-none"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </Button>
          <div className="h-8 px-4 flex items-center justify-center border-y border-input">
            {quantity}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-l-none"
            onClick={handleIncrement}
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <div className="text-right sm:min-w-[100px]">
          <div className="font-bold">${(product.price * quantity).toFixed(2)}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-shop-error hover:text-shop-error hover:bg-red-50 mt-1"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
