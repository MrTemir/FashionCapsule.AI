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

        // Валидация
        const validation = validateItem(form);
        if (!validation.valid) {
            setMessage({ type: 'error', text: validation.error });
            return;
        }

        setLoading(true);
        try {
            const response = await addItem(form);
            setMessage({ type: 'success', text: `✅ Предмет "${response.data.name}" успешно добавлен!` });
            setForm({ name: '', category: 'TOP', color: 'Black', season: 'ALL' });

            // Вызов callback для обновления списка
            if (onItemAdded) onItemAdded();
        } catch (err) {
            console.error('Ошибка:', err);
            setMessage({ type: 'error', text: '❌ Ошибка при добавлении предмета' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>➕ Добавить предмет одежды</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Название (например: Белая футболка)"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="TOP">👕 Top (Верх)</option>
                    <option value="BOTTOM">👖 Bottom (Низ)</option>
                    <option value="SHOES">👞 Shoes (Обувь)</option>
                    <option value="ACCESSORY">👜 Accessory (Аксессуар)</option>
                </select>
                <input
                    type="text"
                    name="color"
                    placeholder="Цвет (например: Red, Blue, #FF5733)"
                    value={form.color}
                    onChange={handleChange}
                />
                <select name="season" value={form.season} onChange={handleChange}>
                    <option value="ALL">🌍 All (Все сезоны)</option>
                    <option value="SUMMER">☀️ Summer (Лето)</option>
                    <option value="WINTER">❄️ Winter (Зима)</option>
                    <option value="FALL">🍂 Fall (Осень)</option>
                    <option value="SPRING">🌸 Spring (Весна)</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? '⏳ Сохраняю...' : '✨ Добавить'}
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
