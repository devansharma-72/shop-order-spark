
import React from 'react';
import { Input } from '@/components/ui/input';

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default ProductSearch;
