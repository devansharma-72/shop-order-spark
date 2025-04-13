
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'register') {
        // Validate form
        if (!formData.name.trim()) {
          throw new Error('Name is required');
        }
        
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        await register(formData.name, formData.email, formData.password);
        toast.success('Registration successful!');
        navigate('/');
      } else {
        await login(formData.email, formData.password);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'login' ? 'Login to Your Account' : 'Create an Account'}
      </h2>
      
      {error && (
        <div className="bg-red-50 text-shop-error p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="input-field w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input-field w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            className="input-field w-full"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        {mode === 'register' && (
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="input-field w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full bg-shop-primary hover:bg-shop-accent text-white button-hover py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        {mode === 'login' ? (
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-shop-primary hover:underline">
              Register here
            </a>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-shop-primary hover:underline">
              Login here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
