import { useState, useEffect } from 'react';
import { Template, CartItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
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
  const { user, isDemoMode } = useAuth();
  const { completeStep } = useOnboarding();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
    if (isDemoMode) {
      const savedCart = localStorage.getItem('demo_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isDemoMode]);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTemplates = getMockTemplates();
      
      // Mark purchased templates for authenticated users
      if (user && isDemoMode) {
        const purchasedTemplates = localStorage.getItem('demo_purchased_templates');
        if (purchasedTemplates) {
          const purchased = JSON.parse(purchasedTemplates);
          const templatesWithPurchaseStatus = mockTemplates.map(template => ({
            ...template,
            isPurchased: purchased.includes(template.id),
          }));
          setTemplates(templatesWithPurchaseStatus);
        } else {
          setTemplates(mockTemplates);
        }
      } else {
        setTemplates(mockTemplates);
      }
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
        if (isDemoMode) {
          localStorage.setItem('demo_cart', JSON.stringify(newCart));
        }
        return newCart;
      }
    });
  };

  const removeFromCart = (templateId: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.templateId !== templateId);
      if (isDemoMode) {
        localStorage.setItem('demo_cart', JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (isDemoMode) {
      localStorage.removeItem('demo_cart');
    }
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

      if (isDemoMode) {
        const purchasedTemplates = localStorage.getItem('demo_purchased_templates');
        const purchased = purchasedTemplates ? JSON.parse(purchasedTemplates) : [];
        const newPurchases = cart.map(item => item.templateId);
        const updatedPurchased = [...purchased, ...newPurchases];
        
        localStorage.setItem('demo_purchased_templates', JSON.stringify(updatedPurchased));
        
        // Update templates to mark as purchased
        setTemplates(prev => prev.map(template => ({
          ...template,
          isPurchased: updatedPurchased.includes(template.id),
        })));
        
        // Mark explore-templates step as complete
        completeStep('explore-templates');
      }

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