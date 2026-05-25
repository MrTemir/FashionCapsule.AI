import React, { useState } from 'react';
import { addItem } from '../services/api';
import { validateItem } from '../utils/validators';

export default function AddItemForm({ onItemAdded }) {
    const [form, setForm] = useState({
        name: '',
        category: 'TOP',
        color: 'Black',
        season: 'ALL'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        const validation = validateItem(form);
        if (!validation.valid) {
            setMessage({ type: 'error', text: validation.error });
            return;
        }

        setLoading(true);
        try {
            const response = await addItem(form);
            setMessage({ type: 'success', text: `Item "${response.data.name}" added successfully!` });
            setForm({ name: '', category: 'TOP', color: 'Black', season: 'ALL' });

            if (onItemAdded) onItemAdded();
        } catch (err) {
            console.error('Error:', err);
            setMessage({ type: 'error', text: 'Error adding item. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Clothing Item</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Item name (e.g., White T-shirt)"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="TOP">Top</option>
                    <option value="BOTTOM">Bottom</option>
                    <option value="SHOES">Shoes</option>
                    <option value="ACCESSORY">Accessory</option>
                </select>
                <input
                    type="text"
                    name="color"
                    placeholder="Color (e.g., Red, Blue, #FF5733)"
                    value={form.color}
                    onChange={handleChange}
                />
                <select name="season" value={form.season} onChange={handleChange}>
                    <option value="ALL">All Seasons</option>
                    <option value="SUMMER">Summer</option>
                    <option value="WINTER">Winter</option>
                    <option value="FALL">Fall</option>
                    <option value="SPRING">Spring</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Add Item'}
                </button>
            </form>
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}
