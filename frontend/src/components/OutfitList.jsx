import React, { useEffect, useState } from 'react';
import { getItems } from '../services/api';
import ItemCard from './ItemCard';

export default function OutfitList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    const loadItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getItems();
            setItems(response.data);
        } catch (err) {
            console.error('Loading error:', err);
            setError('Failed to load items. Please check your connection to the server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const filteredItems = filter
        ? items.filter(item => item.category.toLowerCase().includes(filter.toLowerCase()))
        : items;

    if (loading) return <div className="loading">Loading items...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!items.length) return <div className="loading">No items in your wardrobe yet</div>;

    return (
        <div>
            <h2>My Wardrobe</h2>
            <div style={{ marginBottom: 20, marginTop: 20 }}>
                <input
                    type="text"
                    placeholder="Filter by category (Top, Bottom, Shoes, Accessory)"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #ddd', width: '100%' }}
                />
            </div>
            <div className="outfit-list">
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
            <p style={{ marginTop: 20, textAlign: 'center', color: '#666' }}>
                Showing {filteredItems.length} of {items.length} items
            </p>
        </div>
    );
}
