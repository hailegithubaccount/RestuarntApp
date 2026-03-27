'use client';

import { usePathname } from 'next/navigation';
import { User, Bell, Search } from 'lucide-react';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [userName, setUserName] = useState('Admin');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.username) {
      setUserName(user.username);
    }
  }, []);

  const getPageTitle = () => {
    const path = pathname.split('/')[1];
    if (!path) return 'Dashboard Overview';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  if (pathname === '/login') return null;

  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Search for orders, items..." />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge} />
        </button>
        
        <div className={styles.profile}>
          <div className={styles.userInfo}>
            <span className={styles.name}>{userName}</span>
            <span className={styles.role}>Merchant Admin</span>
          </div>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
