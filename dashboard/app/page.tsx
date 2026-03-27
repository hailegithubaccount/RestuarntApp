'use client';

import { useEffect, useState } from 'react';
import apiClient from './lib/api';
import { ENDPOINTS } from './lib/endpoints';
import { 
  ShoppingBag, 
  DollarSign, 
  Table as TableIcon, 
  Coffee,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import styles from './page.module.css';

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalTables: number;
  totalMenuItems: number;
  pendingOrders: number;
  paidOrders: number;
  recentOrders: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get(ENDPOINTS.stats.base);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className={styles.loading}>Loading dashboard data...</div>;

  const cards = [
    { title: 'Total Revenue', value: `${stats?.totalRevenue.toLocaleString()} ETB`, icon: DollarSign, color: '#4ADE80' },
    { title: 'Total Orders', value: stats?.totalOrders, icon: ShoppingBag, color: '#60A5FA' },
    { title: 'Active Tables', value: stats?.totalTables, icon: TableIcon, color: '#F472B6' },
    { title: 'Menu Items', value: stats?.totalMenuItems, icon: Coffee, color: '#FB923C' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                  <Icon size={24} />
                </div>
                <span className={styles.trend}>
                  <ArrowUpRight size={16} />
                  +12%
                </span>
              </div>
              <div className={styles.cardContent}>
                <h3>{card.value}</h3>
                <p>{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.sections}>
        <section className={styles.recentOrders}>
          <div className={styles.sectionHeader}>
            <h2>Recent Orders</h2>
            <button className={styles.viewAll}>View All</button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</td>
                    <td className={styles.customerInfo}>
                      <span className={styles.buyerName}>{order.userEmail?.split('@')[0] || 'Guest'}</span>
                      <span className={styles.buyerEmail}>{order.userEmail || 'No email'}</span>
                    </td>
                    <td>Table {order.tableNumber}</td>
                    <td className={styles.itemsList}>
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className={styles.itemDetail}>
                          <span className={styles.itemName}>{item.coffeeName}</span>
                          <span className={styles.itemMeta}>{item.size} x {item.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td>{order.totalPrice} ETB</td>
                    <td>
                      <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.time}>
                      <Clock size={14} />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.quickStats}>
          <h2>Order Summary</h2>
          <div className={styles.summaryList}>
            <div className={styles.summaryItem}>
              <span>Completed/Paid</span>
              <span className={styles.summaryValue}>{stats?.paidOrders}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
