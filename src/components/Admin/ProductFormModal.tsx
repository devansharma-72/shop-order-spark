
import React, { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  in_stock: boolean;
}

interface ProductFormModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  in_stock: boolean;
}

const createProduct = async (data: Omit<ProductFormData, 'price'> & { price: number }) => {
  const { data: result, error } = await supabase
    .from('products')
    .insert([data])
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return result;
};

const updateProduct = async ({ id, ...data }: { id: string } & Omit<ProductFormData, 'price'> & { price: number }) => {
  const { data: result, error } = await supabase
    .from('products')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return result;
};

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const isEditing = !!product;
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    in_stock: true
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: String(product.price),
        category: product.category,
        image_url: product.image_url || '',
        in_stock: product.in_stock
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        in_stock: true
      });
    }
    setErrors({});
  }, [product]);
  
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product created successfully');
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`Failed to create product: ${error.message}`);
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product updated successfully');
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`Failed to update product: ${error.message}`);
    }
  });
  
  const isLoading = createMutation.isPending || updateMutation.isPending;
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };
  
  const toggleInStock = () => {
    setFormData(prev => ({ ...prev, in_stock: !prev.in_stock }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const numericPrice = Number(formData.price);
    const submissionData = {
      ...formData,
      price: numericPrice,
      image_url: formData.image_url || null
    };
    
    if (isEditing && product) {
      updateMutation.mutate({ id: product.id, ...submissionData });
    } else {
      createMutation.mutate(submissionData);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-shop-error">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.category && (
                  <p className="text-sm text-shop-error">{errors.category}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-shop-error">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.price && (
                  <p className="text-sm text-shop-error">{errors.price}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image_url && (
                  <p className="text-sm text-shop-error">{errors.image_url}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="in_stock"
                checked={formData.in_stock}
                onCheckedChange={toggleInStock}
                disabled={isLoading}
              />
              <Label htmlFor="in_stock">In Stock</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-shop-primary hover:bg-shop-accent"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                isEditing ? 'Update Product' : 'Create Product'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
