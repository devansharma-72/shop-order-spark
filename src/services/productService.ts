
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  in_stock: boolean;
}

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return id;
};

export const updateProductStatus = async ({ id, in_stock }: { id: string; in_stock: boolean }) => {
  const { error } = await supabase
    .from('products')
    .update({ in_stock })
    .eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return { id, in_stock };
};
