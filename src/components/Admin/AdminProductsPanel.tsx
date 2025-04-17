
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ProductFormModal from './ProductFormModal';
import ProductsEmptyState from './ProductsEmptyState';
import ProductsLoadingState from './ProductsLoadingState';
import ProductsPanelHeader from './ProductsPanelHeader';
import ProductSearch from './ProductSearch';
import ProductsTable from './ProductsTable';
import { fetchProducts, deleteProduct, updateProductStatus, type Product } from '@/services/productService';

const AdminProductsPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const queryClient = useQueryClient();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: fetchProducts
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    }
  });
  
  const updateStatusMutation = useMutation({
    mutationFn: updateProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product status updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update product status: ${error.message}`);
    }
  });
  
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    updateStatusMutation.mutate({ id, in_stock: !currentStatus });
  };
  
  const handleAddNew = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ProductsPanelHeader onAddNew={handleAddNew} />
      
      <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {isLoading ? (
        <ProductsLoadingState />
      ) : filteredProducts.length === 0 ? (
        <ProductsEmptyState />
      ) : (
        <ProductsTable 
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          isStatusUpdating={updateStatusMutation.isPending}
          isDeleting={deleteMutation.isPending}
        />
      )}
      
      {isModalOpen && (
        <ProductFormModal 
          product={currentProduct} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminProductsPanel;
