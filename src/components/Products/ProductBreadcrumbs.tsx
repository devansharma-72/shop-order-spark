
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductBreadcrumbsProps {
  productName: string;
  category: string;
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ productName, category }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-shop-primary">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/products" className="hover:text-shop-primary">Products</Link>
      <span className="mx-2">/</span>
      <Link to={`/products?category=${category}`} className="hover:text-shop-primary">
        {category}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-700">{productName}</span>
    </div>
  );
};

export default ProductBreadcrumbs;
