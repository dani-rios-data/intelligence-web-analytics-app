import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import Menu from './components/Menu';
import Services from './components/Services';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';

// Component to log route changes
function RouteLogger() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('🛣️ [Router] Route change detected:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      timestamp: Date.now()
    });
  }, [location]);
  
  return null;
}

function App() {
  console.log('🏠 [App] App component rendering...', {
    timestamp: Date.now(),
    location: window.location.pathname,
    href: window.location.href
  });

  return (
    <ThemeProvider>
      <Router>
        <RouteLogger />
        <div className="App">
          <Routes>
            {/* SIMPLIFIED ROUTING - Testing for re-mounting issues */}
            
            {/* Direct signin route - no redirects */}
            <Route 
              path="/signin" 
              element={
                <>
                  {console.log('📝 [Router] Rendering SignIn route')}
                  <SignIn />
                </>
              } 
            />
            
            {/* Menu route */}
            <Route 
              path="/menu" 
              element={
                <>
                  {console.log('📋 [Router] Rendering Menu route')}
                  <ProtectedRoute>
                    <Menu />
                  </ProtectedRoute>
                </>
              } 
            />
            
            {/* Services route */}
            <Route 
              path="/services" 
              element={
                <>
                  {console.log('🔧 [Router] Rendering Services route')}
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                </>
              } 
            />
            
            {/* Simple redirect for root - ONLY ONE redirect now */}
            <Route 
              path="/" 
              element={
                <>
                  {console.log('🔄 [Router] Simple redirect from / to /signin')}
                  <Navigate to="/signin" replace />
                </>
              } 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 