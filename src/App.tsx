import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginForm } from './features/auth/LoginForm';
import { SignupForm } from './features/auth/SignupForm';
import { HomeMain } from './features/home/Main';
import { HistoryMain } from './features/history/Main';
import { ViewReceipt } from './features/receipt/ViewReceipt';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <Layout>
              <HomeMain />
            </Layout>
          } />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected routes */}
          <Route path="/history" element={
            <ProtectedRoute>
              <Layout>
                <HistoryMain />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/receipt/:id" element={
            <ProtectedRoute>
              <Layout>
                <ViewReceipt />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;