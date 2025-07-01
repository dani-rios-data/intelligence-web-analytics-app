import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyPassword } from '../utils/auth';

const SignIn: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const particlesRef = useRef<HTMLDivElement>(null);

  console.log('🎭 [SignIn] Ultra-minimal version rendering');

  // Ultra-simple particles
  useEffect(() => {
    console.log('🎨 [SignIn] Creating simple particles...');
    
    if (!particlesRef.current) return;
    
    const count = 15;
    particlesRef.current.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #ffc107;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: float${i} ${5 + Math.random() * 3}s infinite linear;
        animation-delay: ${Math.random() * 5}s;
        opacity: 0.6;
        pointer-events: none;
      `;
      particlesRef.current.appendChild(p);
    }
    
    console.log(`✅ [SignIn] ${count} simple particles created`);

    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 [SignIn] Form submitted');
    
         if (password.trim() === '') {
       setError('PASSWORD REQUIRED');
       return;
     }

    setIsLoading(true);
    setError('');

         try {
       const result = await verifyPassword(password);
       if (result.success) {
        console.log('✅ [SignIn] Access granted');
         navigate('/menu');
       } else {
         setError(result.message || 'Error de acceso');
       }
     } catch (err) {
      console.error('💥 [SignIn] Error:', err);
      setError('Error de acceso. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

     return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '16px',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      zIndex: 99999
    }}>
      
      {/* Inline CSS for animations */}
       <style>{`
        @keyframes float0 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float1 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 15% { opacity: 0.6; } 85% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float2 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 20% { opacity: 0.6; } 80% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float3 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 12% { opacity: 0.6; } 88% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float4 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 18% { opacity: 0.6; } 82% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float5 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 8% { opacity: 0.6; } 92% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float6 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 14% { opacity: 0.6; } 86% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float7 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 11% { opacity: 0.6; } 89% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float8 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 16% { opacity: 0.6; } 84% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float9 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 13% { opacity: 0.6; } 87% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float10 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 9% { opacity: 0.6; } 91% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float11 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 17% { opacity: 0.6; } 83% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float12 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 7% { opacity: 0.6; } 93% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float13 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 19% { opacity: 0.6; } 81% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        @keyframes float14 { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 6% { opacity: 0.6; } 94% { opacity: 0.6; } 100% { transform: translateY(-50px) scale(1); opacity: 0; } }
        
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); } 
          to { transform: translate(-50%, -50%) rotate(360deg); } 
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        /* Responsive design */
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center !important; }
          .main-title { font-size: 48px !important; }
          .form-wrapper { max-width: 448px !important; margin: 0 auto !important; }
        }
        
        @media (max-width: 768px) {
          .main-title { font-size: 36px !important; }
          .hero-tagline { font-size: 24px !important; }
          .form-wrapper { padding: 24px !important; }
          .logo { top: 16px !important; left: 16px !important; height: 28px !important; }
        }
      `}</style>
      
      {/* Particles container */}
      <div ref={particlesRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}></div>

      {/* Logo */}
         <img 
           src="/images/logo_tbwa_white.svg" 
        alt="TBWA"
        className="logo"
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          height: '35px',
          width: 'auto',
          zIndex: 1000,
          opacity: 0.9
        }}
      />

      {/* Main content container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px'
      }}>
        
        {/* Content grid */}
        <div className="content-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          maxWidth: '1120px',
          width: '100%',
          alignItems: 'center'
        }}>
          
          {/* Left section - Hero */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            
            {/* Main title */}
            <h1 className="main-title" style={{
              fontSize: '48px',
              fontWeight: 900,
              lineHeight: '0.9',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ARE YOU<br/>
              <span style={{
                background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>READY TO</span><br/>
              DISRUPT?
            </h1>
            
            {/* Globe section */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '19px 0',
              position: 'relative'
            }}>
              
              <div style={{
                position: 'relative',
                width: '224px',
                height: '224px',
                transform: 'translateX(-56px)'
              }}>
                
                {/* Main globe */}
                <div style={{
                  width: '176px',
                  height: '176px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 30%, transparent 70%)',
                  border: '2px solid rgba(255, 193, 7, 0.2)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 32px rgba(255, 193, 7, 0.3), inset 0 0 32px rgba(255, 193, 7, 0.1)'
                }}>
                  
                  {/* Globe GIF */}
                 <img 
                   src="/images/globe.gif" 
                    alt="Globe"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Static Orbit 1 */}
                  <div style={{
                    position: 'absolute',
                    border: '1px solid rgba(255, 193, 7, 0.15)',
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    width: '192px',
                    height: '192px',
                    transform: 'translate(-50%, -50%)'
                  }}></div>
                  
                  {/* Static Orbit 2 */}
                  <div style={{
                    position: 'absolute',
                    border: '1px solid rgba(255, 193, 7, 0.1)',
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    width: '208px',
                    height: '208px',
                    transform: 'translate(-50%, -50%)'
                  }}></div>
                  
                </div>
               </div>
             </div>
            
            {/* Subtitle and tagline */}
            <p style={{
              color: '#b0b0b0',
              fontSize: '14px',
              fontWeight: 300,
              margin: 0
            }}>Intelligence that</p>
            
            <h2 className="hero-tagline" style={{
              color: '#ffc107',
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
              textShadow: '0 0 20px rgba(255, 193, 7, 0.3)',
              animation: 'glowPulse 2s ease-in-out infinite alternate'
            }}>Disrupts Everything</h2>
            
          </div>
          
          {/* Right section - Form */}
          <div className="form-wrapper" style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '19px',
            padding: '32px',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            
            {/* Form title */}
            <h3 style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              margin: '0 0 6px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>Secure Access Required</h3>
            
            {/* Form description */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '11px',
              margin: '0 0 26px 0',
              lineHeight: 1.5
            }}>Please enter your credentials to access the intelligence platform</p>
             
            {/* Form */}
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '26px'
            }}>
              
              {/* Password input */}
              <div style={{ position: 'relative' }}>
                                 <input
                   type={showPassword ? 'text' : 'password'}
                   placeholder="Enter your password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '19px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '13px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.borderColor = '#ffc107';
                    target.style.background = 'rgba(255, 193, 7, 0.05)';
                    target.style.boxShadow = '0 0 20px rgba(255, 193, 7, 0.2)';
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    target.style.background = 'rgba(255, 255, 255, 0.05)';
                    target.style.boxShadow = 'none';
                  }}
                />
                
                {/* Toggle password visibility */}
                <button
                  type="button"
                  onClick={togglePassword}
                  style={{
                    position: 'absolute',
                    right: '19px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                style={{
                  width: '100%',
                  padding: '19px',
                  background: (!password.trim() || isLoading) 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                  border: 'none',
                  borderRadius: '13px',
                  color: (!password.trim() || isLoading) ? 'rgba(255, 255, 255, 0.3)' : '#000',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: (isLoading || !password.trim()) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: (isLoading || !password.trim()) ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && password.trim()) {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && password.trim()) {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'none';
                  }
                }}
              >
                {isLoading ? 'ACCESSING...' : 'ACCESS INTELLIGENCE →'}
              </button>
              
              {/* Error message */}
              {error && (
                <div style={{
                  color: '#ff5722',
                  fontSize: '14px',
                  textAlign: 'center',
                  fontWeight: 500,
                  margin: '8px 0 0 0'
                }}>{error}</div>
              )}
              
            </form>
            
            {/* Footer */}
            <div style={{
              textAlign: 'center',
              marginTop: '40px'
            }}>
              
              <p style={{
                color: 'rgba(255, 255, 255, 0.3)',
                fontSize: '12px',
                lineHeight: 1.6,
                margin: '0 0 32px 0'
              }}>
                FOR SOME <span style={{ color: '#ffc107', fontWeight: 600 }}>"GOOD ENOUGH"</span> WILL ALWAYS BE ENOUGH.<br/>
                BUT MAYBE NOT FOR YOU. <span style={{ color: '#ffc107', fontWeight: 600 }}>WELCOME.</span>
              </p>
              
              <p style={{
                color: 'rgba(255, 255, 255, 0.2)',
                fontSize: '10px',
                margin: 0
              }}>
              TBWA INTELLIGENCE © 2025
              </p>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignIn;