
import { Product, Order } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 'p2',
    name: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and more with this sleek smartwatch.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 'p3',
    name: 'Smartphone',
    description: 'Latest model with advanced camera system and all-day battery life.',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 'p4',
    name: 'Designer Backpack',
    description: 'Water-resistant backpack with multiple compartments and laptop sleeve.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    inStock: true
  },
  {
    id: 'p5',
    name: 'Fitness Tracker',
    description: 'Monitor your heart rate, steps, and sleep with this lightweight tracker.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: false
  },
  {
    id: 'p6',
    name: 'Lightweight Running Shoes',
    description: 'Ultra-comfortable running shoes with responsive cushioning.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    category: 'Footwear',
    inStock: true
  },
  {
    id: 'p7',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with 360° sound and 12-hour battery life.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 'p8',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe to keep your coffee hot for hours.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    category: 'Home',
    inStock: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    userId: '1',
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 1 },
      { product: MOCK_PRODUCTS[2], quantity: 1 }
    ],
    totalAmount: MOCK_PRODUCTS[0].price + MOCK_PRODUCTS[2].price,
    status: 'delivered',
    createdAt: '2023-08-15T10:30:00Z',
    shippingAddress: '123 Main St, Anytown, USA'
  },
  {
    id: 'o2',
    userId: '1',
    items: [
      { product: MOCK_PRODUCTS[3], quantity: 1 }
    ],
    totalAmount: MOCK_PRODUCTS[3].price,
    status: 'shipped',
    createdAt: '2023-09-25T14:45:00Z',
    shippingAddress: '123 Main St, Anytown, USA'
  }
];

// Helper functions to simulate API calls
export const fetchProducts = async (category?: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  if (category && category !== 'All') {
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }
  
  return MOCK_PRODUCTS;
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return MOCK_PRODUCTS.find(p => p.id === id);
};

export const fetchOrdersByUserId = async (userId: string): Promise<Order[]> => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay
  return MOCK_ORDERS.filter(order => order.userId === userId);
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  const newOrder = {
    ...order,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };
  
  // In a real app, we would save this to a database
  console.log('Order created:', newOrder);
  
  return newOrder;
};
