'use client';

import { useEffect, useState } from 'react';
import apiClient from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { BarChart3, TrendingUp, PieChart, Award, ArrowUpRight } from 'lucide-react';
import styles from './analytics.module.css';

interface StatData {
  totalRevenue: number;
  totalOrders: number;
  topItems: { _id: string; totalSold: number; revenue: number }[];
  ordersByStatus: { _id: string; count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await apiClient.get(ENDPOINTS.stats.base);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className={styles.loading}>Analyzing your business data...</div>;

  const maxSold = Math.max(...(data?.topItems.map(i => i.totalSold) || [1]));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h1>Business Analytics</h1>
          <p>Gain insights into your revenue, popular items, and sales performance</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Top Selling Items (Bar Chart) */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Award size={20} className={styles.icon} />
            <h2>Top Selling Items</h2>
          </div>
          <div className={styles.barChart}>
            {data?.topItems.map((item) => (
              <div key={item._id} className={styles.barRow}>
                <div className={styles.barLabel}>
                  <span className={styles.itemName}>{item._id}</span>
                  <span className={styles.itemValue}>{item.totalSold} sold</span>
                </div>
                <div className={styles.barWrapper}>
                  <div 
                    className={styles.bar} 
                    style={{ width: `${(item.totalSold / maxSold) * 100}%` }}
                  >
                    <span className={styles.barRevenue}>{item.revenue} ETB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Orders by Status (Breakdown) */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <PieChart size={20} className={styles.icon} />
            <h2>Order fulfillment</h2>
          </div>
          <div className={styles.statusGrid}>
            {data?.ordersByStatus.map((status) => (
              <div key={status._id} className={styles.statusCard}>
                <span className={styles.statusName}>{status._id}</span>
                <span className={styles.statusCount}>{status.count}</span>
                <div className={styles.statusProgress}>
                  <div 
                    className={styles.statusFill} 
                    style={{ 
                      width: `${(status.count / data.totalOrders) * 100}%`,
                      backgroundColor: status._id === 'Paid' || status._id === 'Completed' ? 'var(--success)' : 'var(--primary)'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Insight */}
        <section className={`${styles.section} ${styles.fullWidth}`}>
          <div className={styles.revenueHero}>
            <div className={styles.heroContent}>
              <div className={styles.heroLabel}>
                <TrendingUp size={24} />
                <span>Total Revenue Growth</span>
              </div>
              <h2 className={styles.heroValue}>{data?.totalRevenue.toLocaleString()} ETB</h2>
              <p className={styles.heroSubtext}>
                <ArrowUpRight size={16} /> 
                Your revenue has increased by 15% compared to last week
              </p>
            </div>
            <div className={styles.heroVisual}>
              <BarChart3 size={120} strokeWidth={1} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
