import React from 'react';
import { CreateTicketForm } from '../../components/support/CreateTicketForm';

export const CreateTicketPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <CreateTicketForm />
        </div>
      </div>
    </div>
  );
}; 