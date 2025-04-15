
// Custom types for the app
export interface User {
  id: string;
  email: string;
  // Note: These have been removed as they're not directly on the User object from Supabase
  // name: string;
  // address?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'customer';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: string;
}

// Function to validate and convert string to OrderStatus
export function toOrderStatus(status: string): OrderStatus {
  const validStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  return validStatuses.includes(status as OrderStatus) 
    ? (status as OrderStatus) 
    : 'pending'; // Default to 'pending' if invalid status
}
