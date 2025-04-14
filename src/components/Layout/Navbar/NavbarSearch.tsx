
import React from 'react';
import { Search } from 'lucide-react';

interface NavbarSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch
}) => {
  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="py-1 px-3 pr-8 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-shop-primary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Search size={16} />
      </button>
    </form>
  );
};

export default NavbarSearch;
