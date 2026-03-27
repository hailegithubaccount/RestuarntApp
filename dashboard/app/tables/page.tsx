'use client';

import { useEffect, useState } from 'react';
import apiClient from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { Plus, Trash2, Table as TableIcon, Download, RefreshCw, QrCode } from 'lucide-react';
import Modal from '../components/Modal';
import styles from './tables.module.css';

interface Table {
  _id: string;
  tableNumber: number;
  qrCodeUrl: string;
}

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState<number | ''>('');
  const [generating, setGenerating] = useState(false);

  const fetchTables = async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.tables.base);
      setTables(response.data);
    } catch (error) {
      console.error('Failed to fetch tables:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleCreateHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber) return;
    
    setGenerating(true);
    try {
      await apiClient.post(ENDPOINTS.tables.base, { tableNumber: Number(newTableNumber) });
      fetchTables();
      setIsModalOpen(false);
      setNewTableNumber('');
    } catch (error: any) {
      console.error('Create table error:', error);
      alert(error.response?.data?.message || 'Error creating table. Number likely already exists.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this table? The QR code will no longer work.')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.tables.base}/${id}`);
      fetchTables();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting table');
    }
  };

  const downloadQR = (tableNumber: number) => {
    const url = `https://backendforpronative.onrender.com/api/tables/qrcode/${tableNumber}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `table-${tableNumber}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h1>Tables Management</h1>
          <p>Generate and manage QR codes for your restaurant tables</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add New Table
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading tables...</div>
      ) : (
        <div className={styles.tableGrid}>
          {tables.length === 0 ? (
            <div className={styles.empty}>No tables configured yet. Click "Add New Table" to start.</div>
          ) : (
            tables.map((table) => (
              <div key={table._id} className={styles.tableCard}>
                <div className={styles.qrWrapper}>
                  {/* Using the backend direct image route for high quality display */}
                  <img 
                    src={`https://backendforpronative.onrender.com/api/tables/qrcode/${table.tableNumber}`} 
                    alt={`Table ${table.tableNumber} QR`} 
                    className={styles.qrImg}
                  />
                  <div className={styles.qrOverlay}>
                    <button className={styles.downloadBtn} onClick={() => downloadQR(table.tableNumber)}>
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.tableInfo}>
                    <div className={styles.iconBox}>
                      <TableIcon size={24} />
                    </div>
                    <div className={styles.textDetails}>
                      <h3>Table {table.tableNumber}</h3>
                      <p>Ready for scanning</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(table._id)} className={styles.deleteBtn} title="Delete Table">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Restaurant Table"
      >
        <form className={styles.form} onSubmit={handleCreateHeader}>
          <div className={styles.formGroup}>
            <label>Table Number</label>
            <div className={styles.inputIcon}>
              <QrCode size={18} />
              <input 
                type="number" 
                placeholder="e.g. 5" 
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(e.target.value ? Number(e.target.value) : '')}
                required
                min="1"
              />
            </div>
            <p className={styles.hint}>This will generate a unique QR code for the table.</p>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className={styles.submitBtn} disabled={generating}>
              {generating ? <RefreshCw className={styles.spin} size={18} /> : 'Generate QR Code'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
