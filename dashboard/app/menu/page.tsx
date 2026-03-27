'use client';

import { useEffect, useState } from 'react';
import apiClient from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { Plus, Edit2, Trash2, Coffee, Star, MapPin, Tag, Image as ImageIcon, X } from 'lucide-react';
import Modal from '../components/Modal';
import styles from './menu.module.css';

interface Size {
  size: string;
  price: number;
}

interface CoffeeItem {
  _id?: string;
  name: string;
  category: string;
  description: string;
  origin: string;
  imageUrl: string;
  sizes: Size[];
  rating: number;
  available: boolean;
}

const INITIAL_ITEM: CoffeeItem = {
  name: '',
  category: 'Cappuccino',
  description: '',
  origin: '',
  imageUrl: '',
  sizes: [{ size: 'S', price: 0 }],
  rating: 4.5,
  available: true,
};

const CATEGORIES = ['Cappuccino', 'Espresso', 'Latte', 'Americano', 'Macchiato'];

export default function MenuPage() {
  const [items, setItems] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CoffeeItem | null>(null);
  const [formData, setFormData] = useState<CoffeeItem>(INITIAL_ITEM);

  const fetchItems = async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.coffees.all);
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item?: CoffeeItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(INITIAL_ITEM);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(INITIAL_ITEM);
  };

  const handleAddSize = () => {
    setFormData({ ...formData, sizes: [...formData.sizes, { size: '', price: 0 }] });
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSizeChange = (index: number, field: keyof Size, value: any) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = { ...newSizes[index], [field]: field === 'price' ? Number(value) : value };
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        await apiClient.put(`${ENDPOINTS.coffees.base}/${editingItem._id}`, formData);
      } else {
        await apiClient.post(ENDPOINTS.coffees.base, formData);
      }
      fetchItems();
      handleCloseModal();
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving coffee item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.coffees.base}/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting item');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h1>Menu Management</h1>
          <p>Configure your coffee items, categories, and pricing</p>
        </div>
        <button className={styles.addBtn} onClick={() => handleOpenModal()}>
          <Plus size={20} />
          Add New Coffee
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading menu items...</div>
      ) : (
        <div className={styles.menuGrid}>
          {items.map((item) => (
            <div key={item._id} className={styles.menuCard}>
              <div className={styles.imageWrapper}>
                <img src={item.imageUrl} alt={item.name} className={styles.coffeeImg} />
                <div className={styles.categoryBadge}>{item.category}</div>
                <div className={styles.actionsOverlay}>
                  <button onClick={() => handleOpenModal(item)} className={styles.iconBtn} title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item._id!)} className={`${styles.iconBtn} ${styles.delete}`} title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.itemNameRow}>
                  <h3>{item.name}</h3>
                  <span className={styles.rating}><Star size={14} fill="currentColor" /> {item.rating}</span>
                </div>
                <div className={styles.origin}><MapPin size={14} /> {item.origin}</div>
                
                <div className={styles.sizes}>
                  {item.sizes.map((s, idx) => (
                    <div key={idx} className={styles.sizeTag}>
                      {s.size}: <strong>{s.price} ETB</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingItem ? 'Edit Coffee Item' : 'Add New Coffee Item'}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Coffee Name</label>
              <input 
                type="text" 
                placeholder="e.g. Ethiopia Sidamo" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Origin</label>
              <input 
                type="text" 
                placeholder="e.g. Sidamo Region" 
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Rating (0-5)</label>
              <input 
                type="number" 
                step="0.1" 
                min="0" 
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Image URL</label>
            <div className={styles.inputIcon}>
              <ImageIcon size={18} />
              <input 
                type="text" 
                placeholder="https://..." 
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea 
              placeholder="Tell us about the coffee flavor profile..." 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className={styles.sizeSection}>
            <label className={styles.sectionTitle}>Pricing & Sizes</label>
            {formData.sizes.map((s, idx) => (
              <div key={idx} className={styles.sizeRow}>
                <input 
                  type="text" 
                  placeholder="Size (e.g. S, Large)" 
                  value={s.size}
                  onChange={(e) => handleSizeChange(idx, 'size', e.target.value)}
                  required
                />
                <input 
                  type="number" 
                  placeholder="Price" 
                  value={s.price || ''}
                  onChange={(e) => handleSizeChange(idx, 'price', e.target.value)}
                  required
                />
                <button type="button" onClick={() => handleRemoveSize(idx)} className={styles.removeSize}>
                  <X size={16} />
                </button>
              </div>
            ))}
            <button type="button" className={styles.addSizeBtn} onClick={handleAddSize}>
              <Plus size={16} /> Add Size
            </button>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>
              {editingItem ? 'Update Item' : 'Create Coffee'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
