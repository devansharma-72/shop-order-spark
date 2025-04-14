
import React from 'react';

interface PaymentFormProps {
  formData: {
    cardNumber: string;
    cardName: string;
    cardExpiry: string;
    cardCvc: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm = ({ formData, onChange }: PaymentFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={formData.cardExpiry}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            placeholder="MM/YY"
            required
          />
        </div>
        
        <div>
          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input
            type="text"
            id="cardCvc"
            name="cardCvc"
            value={formData.cardCvc}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shop-primary focus:ring-shop-primary sm:text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
