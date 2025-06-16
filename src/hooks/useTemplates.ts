import { useState, useEffect } from 'react';
import { Template, CartItem } from '../types';
import { useUser } from '@clerk/clerk-react';
import { useSubscription } from './useSubscription';
import { getMockTemplates } from '../utils/mockData';
import { secureLocalStorage } from '../utils/security';

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
  const { plan, features } = useSubscription();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage if available
    return secureLocalStorage.getItem<CartItem[]>('cart') || [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, [plan]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    secureLocalStorage.setItem('cart', cart);
  }, [cart]);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTemplates = getMockTemplates();
      
      // Filter templates based on subscription plan
      const filteredTemplates = mockTemplates.map(template => {
        let isAccessible = false;
        
        switch (features.templatesAccess) {
          case 'all':
            isAccessible = true;
            break;
          case 'premium':
            isAccessible = template.category !== 'Enterprise Only';
            break;
          case 'basic':
            isAccessible = ['Business Plan', 'Marketing', 'Productivity'].includes(template.category);
            break;
        }
        
        return {
          ...template,
          isPurchased: isAccessible || template.isPurchased,
          // Lock premium templates for basic users
          price: !isAccessible && plan === 'starter' ? template.price : template.price
        };
      });
      
      setTemplates(filteredTemplates);
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

      // Mark templates as purchased
      setTemplates(prev => prev.map(template => {
        const cartItem = cart.find(item => item.templateId === template.id);
        if (cartItem) {
          return { ...template, isPurchased: true };
        }
        return template;
      }));

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