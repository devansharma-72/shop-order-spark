
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface ProductsPanelHeaderProps {
  onAddNew: () => void;
}

const ProductsPanelHeader: React.FC<ProductsPanelHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Manage Products</h2>
      <Button onClick={onAddNew} className="bg-shop-primary hover:bg-shop-accent">
        <PlusCircle size={18} className="mr-2" />
        Add New Product
      </Button>
    </div>
  );
};

export default ProductsPanelHeader;
