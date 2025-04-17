
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <span className="mr-4">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-r-none"
            onClick={onDecrement}
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
            onClick={onIncrement}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
