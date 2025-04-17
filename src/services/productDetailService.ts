
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error loading product:', error);
    throw error;
  }
  
  if (!data) return null;
  
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    imageUrl: data.image_url || '',
    category: data.category,
    inStock: data.in_stock
  };
};

export const fetchRelatedProducts = async (category: string, currentProductId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', currentProductId)
    .limit(4);
  
  if (error) {
    console.error('Error loading related products:', error);
    throw error;
  }
  
  if (!data) return [];
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.image_url || '',
    category: item.category,
    inStock: item.in_stock
  }));
};
