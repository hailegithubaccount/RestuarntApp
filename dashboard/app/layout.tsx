import type { Metadata } from 'next';
import './globals.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Merchant Dashboard | Coffee Shop',
  description: 'Admin dashboard for coffee shop management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles.mainContent}>
            <Header />
            <div className={styles.pageContainer}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
