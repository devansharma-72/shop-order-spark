
import React from 'react';

interface ProductImageDisplayProps {
  imageUrl: string;
  productName: string;
}

const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({ imageUrl, productName }) => {
  return (
    <div className="md:w-1/2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img 
          src={imageUrl} 
          alt={productName} 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default ProductImageDisplay;
