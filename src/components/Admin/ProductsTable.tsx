
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X, Pencil, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  in_stock: boolean;
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  isStatusUpdating: boolean;
  isDeleting: boolean;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleStatus,
  isStatusUpdating,
  isDeleting
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No image</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    product.in_stock 
                      ? 'text-green-700 bg-green-50 hover:bg-green-100' 
                      : 'text-red-700 bg-red-50 hover:bg-red-100'
                  }`}
                  onClick={() => onToggleStatus(product.id, product.in_stock)}
                  disabled={isStatusUpdating}
                >
                  {product.in_stock ? (
                    <>
                      <Check size={16} className="mr-1" />
                      In Stock
                    </>
                  ) : (
                    <>
                      <X size={16} className="mr-1" />
                      Out of Stock
                    </>
                  )}
                </Button>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(product)}
                >
                  <Pencil size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-shop-error hover:bg-red-50 hover:text-shop-error"
                  onClick={() => onDelete(product.id)}
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
