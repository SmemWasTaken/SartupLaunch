import { useState, useEffect } from 'react';
import { Template, CartItem } from '../types';
import { useUser } from '@clerk/clerk-react';
import { getMockTemplates } from '../utils/mockData';

interface UseTemplatesReturn {
  templates: Template[];
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (template: Template) => void;
  removeFromCart: (templateId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  purchaseTemplates: () => Promise<void>;
}

export const useTemplates = (): UseTemplatesReturn => {
  const { user } = useUser();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTemplates = getMockTemplates();
      
      setTemplates(mockTemplates);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (template: Template) => {
    if (template.isPurchased) return;

    setCart(prev => {
      const existingItem = prev.find(item => item.templateId === template.id);
      if (existingItem) {
        return prev.map(item =>
          item.templateId === template.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newCart = [...prev, { templateId: template.id, template, quantity: 1 }];
        return newCart;
      }
    });
  };

  const removeFromCart = (templateId: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.templateId !== templateId);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.template.price * item.quantity), 0);
  };

  const purchaseTemplates = async () => {
    if (!user || cart.length === 0) return;

    setIsLoading(true);
    try {
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 1500));

      clearCart();
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    templates,
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    purchaseTemplates,
  };
};