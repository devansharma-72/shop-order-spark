
import React from 'react';

interface ShippingAddressFormProps {
  formData: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingAddressForm = ({ formData, onChange }: ShippingAddressFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
