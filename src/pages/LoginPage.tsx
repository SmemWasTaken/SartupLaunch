import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Rocket, AlertCircle } from 'lucide-react';
import { SignIn } from '@clerk/clerk-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <SignIn routing="path" path="/login" />
      </div>
    </div>
  );
}