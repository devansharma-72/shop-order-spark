
import React from 'react';

const ProductsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium text-gray-600">No products found</h3>
      <p className="text-gray-500 mt-2">Try adjusting your search or add a new product</p>
    </div>
  );
};

export default ProductsEmptyState;
