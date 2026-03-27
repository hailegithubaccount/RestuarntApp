'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { Coffee, Mail, Lock, Loader2 } from 'lucide-react';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post(ENDPOINTS.auth.login, { email, password });
      const { user } = response.data;
      
      // Since backend doesn't seem to return a JWT token in the login response (as per authController.js)
      // but the user object is returned. I'll mock a token or use the user ID.
      // Wait, authController.js line 30 says: res.status(200).json({ message: "Login successful", user });
      // I'll store the user object.
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'dummy-token'); // Mocking for interceptor
      
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Coffee size={40} color="var(--primary)" />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to manage your coffee shop</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.icon} />
              <input 
                id="email"
                type="email" 
                placeholder="admin@coffee.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.icon} />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className={styles.loginBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} size={20} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
