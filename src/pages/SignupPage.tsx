import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <SignUp routing="path" path="/signup" />
      </div>
    </div>
  );
}