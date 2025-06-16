import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, CreditCard, ArrowLeft, Check, Shield, Clock, Star } from 'lucide-react';
import { useTemplates } from '../hooks/useTemplates';
import { useUser } from '@clerk/clerk-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice, purchaseTemplates } = useTemplates();
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);

  const handleRemoveItem = (templateId: string) => {
    removeFromCart(templateId);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await purchaseTemplates();
      setIsPurchaseComplete(true);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (isPurchaseComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Purchase Complete!</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your templates are now available in your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/templates"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Browse More Templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any templates to your cart yet.
          </p>
          <Link
            to="/templates"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            Browse Templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <Link
          to="/templates"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 ml-auto mr-auto">Your Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div 
              key={item.templateId} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <img 
                src={item.template.thumbnailUrl} 
                alt={item.template.title} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.template.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                    {item.template.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{item.template.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">{item.template.description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-xl font-bold text-gray-900">
                  {formatPrice(item.template.price)}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.templateId)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">{formatPrice(0)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <LoadingSpinner size="sm" text="Processing..." />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Checkout</span>
                </>
              )}
            </button>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Instant download after purchase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


