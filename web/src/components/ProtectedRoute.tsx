import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  console.log('🔒 [ProtectedRoute] Rendering...', {
    isAuthChecked,
    authenticated,
    timestamp: Date.now()
  });

  useEffect(() => {
    console.log('🔒 [ProtectedRoute] useEffect - Checking authentication...');
    
    // Check authentication status
    const checkAuth = () => {
      console.log('🔒 [ProtectedRoute] Running isAuthenticated check...');
      
      const authStatus = isAuthenticated();
      console.log('🔒 [ProtectedRoute] Auth result:', authStatus);
      
      setAuthenticated(authStatus);
      setIsAuthChecked(true);
      
      console.log('🔒 [ProtectedRoute] State updated:', {
        authenticated: authStatus,
        isAuthChecked: true
      });
    };

    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (!isAuthChecked) {
    console.log('🔒 [ProtectedRoute] Showing loading state...');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!authenticated) {
    console.log('🔒 [ProtectedRoute] User NOT authenticated - redirecting to /signin');
    return <Navigate to="/signin" replace />;
  }

  // Render protected content
  console.log('🔒 [ProtectedRoute] User authenticated - rendering protected content');
  return <>{children}</>;
} 