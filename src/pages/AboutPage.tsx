
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/Layout/MainLayout';

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-shop-dark">About ShopSpark</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-shop-primary">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2023, ShopSpark was born from a simple idea: to create an online shopping experience that truly 
              puts customers first. We started as a small team of e-commerce enthusiasts who believed that shopping 
              online should be just as enjoyable and personalized as shopping in a physical store.
            </p>
            <p className="text-gray-700 mb-6">
              Today, we've grown into a thriving marketplace connecting customers with high-quality products across 
              multiple categories. Our curated collections ensure that you always find products that meet our strict 
              standards for quality, value, and sustainability.
            </p>
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" 
                alt="Our team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-shop-primary">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At ShopSpark, our mission is to revolutionize online shopping by creating a platform that combines 
              convenience, quality, and personalization. We believe that everyone deserves access to exceptional 
              products at fair prices, delivered with outstanding customer service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="bg-shop-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-gray-600">We curate only the highest quality products that meet our rigorous standards.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="bg-shop-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Value</h3>
                <p className="text-sm text-gray-600">We believe in fair pricing that reflects the true value of our products.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="bg-shop-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-gray-600">We foster connections between buyers, sellers, and our team.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-shop-primary">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our diverse team brings together expertise from retail, technology, design, and customer service. 
              We're united by our passion for creating exceptional shopping experiences and our commitment to our customers.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">John Doe</h4>
                <p className="text-sm text-gray-500">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Jane Smith</h4>
                <p className="text-sm text-gray-500">CTO</p>
              </div>
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Mike Johnson</h4>
                <p className="text-sm text-gray-500">Head of Product</p>
              </div>
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Sarah Lee</h4>
                <p className="text-sm text-gray-500">Design Director</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready to start shopping?</h2>
            <Link to="/products">
              <Button className="bg-shop-primary hover:bg-shop-accent button-hover text-lg px-6 py-3">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
