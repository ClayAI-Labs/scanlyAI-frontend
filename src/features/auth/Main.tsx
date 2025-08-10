import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthMain() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-indigo-50 to-sky-50">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}