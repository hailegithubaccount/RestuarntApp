'use client';

import { useEffect, useState } from 'react';
import apiClient from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { Search, Filter, Clock, CheckCircle2, Package, PlayCircle, MoreVertical } from 'lucide-react';
import styles from './orders.module.css';

const STATUS_OPTIONS = ['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Paid'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.orders.base, {
        params: filterStatus !== 'All' ? { status: filterStatus } : {}
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, [filterStatus]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await apiClient.put(`${ENDPOINTS.orders.base}/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Error updating order status');
    }
  };

  const filteredOrders = orders.filter(order => 
    order.tableNumber?.toString().includes(searchTerm) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h1>Orders Management</h1>
          <p>Manage and track all customer orders in real-time</p>
        </div>
        
        <div className={styles.filters}>
          <div className={styles.search}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search table or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.statusTabs}>
            {STATUS_OPTIONS.map(status => (
              <button 
                key={status}
                className={`${styles.tab} ${filterStatus === status ? styles.activeTab : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && orders.length === 0 ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : (
        <div className={styles.orderGrid}>
          {filteredOrders.length === 0 ? (
            <div className={styles.empty}>No orders found matching your criteria.</div>
          ) : (
            filteredOrders.map(order => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</span>
                    <span className={styles.tableBadge}>Table {order.tableNumber}</span>
                  </div>
                  <span className={`${styles.statusLabel} ${styles[order.status.toLowerCase()] || ''}`}>
                    {order.status}
                  </span>
                </div>

                <div className={styles.items}>
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className={styles.item}>
                      <span className={styles.itemQty}>{item.quantity}x</span>
                      <span className={styles.itemName}>{item.coffeeName}</span>
                      <span className={styles.itemSize}>({item.size})</span>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <div className={styles.totalInfo}>
                    <span className={styles.label}>Total Price</span>
                    <span className={styles.value}>{order.totalPrice} ETB</span>
                  </div>
                  
                  <div className={styles.actions}>
                    {order.status === 'Pending' && (
                      <button 
                        className={styles.actionBtn}
                        onClick={() => updateStatus(order._id, 'Preparing')}
                      >
                        <PlayCircle size={16} />
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button 
                        className={styles.actionBtn}
                        onClick={() => updateStatus(order._id, 'Ready')}
                      >
                        <Package size={16} />
                        Mark as Ready
                      </button>
                    )}
                    {order.status === 'Ready' && (
                      <button 
                        className={styles.actionBtn}
                        onClick={() => updateStatus(order._id, 'Completed')}
                      >
                        <CheckCircle2 size={16} />
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
                
                <div className={styles.timeInfo}>
                  <Clock size={12} />
                  <span>Placed {new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
