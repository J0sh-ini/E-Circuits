import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../utils/supabase';

const LoginSection = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (username: string, email: string) => void }) => {
  console.log("LoginSection Rendered. isOpen:", isOpen);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && (!isRegister || username)) {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        });
        if (error) {
          console.error("SignUp Error:", error);
          alert(error.message);
          return;
        }
        alert("Please verify your email by clicking the link you received.");
        onLogin(username, email);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          console.error("SignIn Error:", error);
          alert(error.message);
          return;
        }
        const loggedInUsername = data.user?.user_metadata?.username || email.split('@')[0];
        onLogin(loggedInUsername, email);
      }
      setEmail('');
      setPassword('');
      setUsername('');
      onClose();
    } else {
      console.warn("Validation failed. Missing fields.");
    }
  };

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10001
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(30, 30, 35, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '2.5rem',
          borderRadius: '1rem',
          position: 'relative',
          width: '400px',
          maxWidth: '90%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            fontSize: '1.2rem',
            color: '#888'
          }}
        >
          ✕
        </button>
        <h2 style={{ marginTop: 0, marginBottom: '2rem', textAlign: 'center', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '1px' }}>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          {isRegister && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: '1rem',
              padding: '0.875rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'linear-gradient(90deg, #3c82ff, #2965d6)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 10px rgba(60, 130, 255, 0.3)'
            }}
          >
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: '#3c82ff', cursor: 'pointer', fontWeight: 600 }}
          >
            {isRegister ? 'Login' : 'Sign Up'}
          </span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export default LoginSection;
