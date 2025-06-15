import React from 'react';
import { ShoppingCart, CreditCard, Shield } from 'lucide-react';
import { CartItem } from '../types';

interface StickyCheckoutProps {
  cart: CartItem[];
  isVisible: boolean;
  onCheckout: () => void;
}

const StickyCheckout: React.FC<StickyCheckoutProps> = ({ cart, isVisible, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.template.price, 0);

  if (!isVisible || cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">
                {cart.length} item{cart.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <button
              onClick={onCheckout}
              className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Launch Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCheckout;