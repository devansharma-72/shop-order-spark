
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-shop-dark text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopSpark</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop shop for quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-shop-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-shop-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-shop-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-shop-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-shop-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-shop-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-shop-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-shop-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-shop-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-shop-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Electronics" className="text-gray-300 hover:text-shop-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-gray-300 hover:text-shop-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=Footwear" className="text-gray-300 hover:text-shop-primary">
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home" className="text-gray-300 hover:text-shop-primary">
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-shop-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 E-Commerce St.<br />
                  Shopping City, SC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-shop-primary flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-shop-primary">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-shop-primary flex-shrink-0" />
                <a href="mailto:info@shopsparkapp.com" className="text-gray-300 hover:text-shop-primary">
                  info@shopsparkapp.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ShopSpark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
