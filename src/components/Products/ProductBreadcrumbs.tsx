
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductBreadcrumbsProps {
  productName: string;
  category: string;
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ productName, category }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link to="/" className="hover:text-shop-primary dark:hover:text-shop-secondary">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/products" className="hover:text-shop-primary dark:hover:text-shop-secondary">Products</Link>
      <span className="mx-2">/</span>
      <Link to={`/products?category=${category}`} className="hover:text-shop-primary dark:hover:text-shop-secondary">
        {category}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-700 dark:text-gray-300">{productName}</span>
    </div>
  );
};

export default ProductBreadcrumbs;
