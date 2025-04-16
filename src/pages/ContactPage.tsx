
import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-shop-primary">
                <Mail className="h-5 w-5" />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center space-x-3 text-shop-primary">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-shop-primary">
                <MessageCircle className="h-5 w-5" />
                <span>Live Chat Available 24/7</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  className="min-h-[120px]" 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-shop-primary hover:bg-shop-accent">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
