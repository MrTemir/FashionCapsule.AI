import React from 'react';

export default function ItemCard({ item }) {
    const getCategoryEmoji = (cat) => {
        const map = { Top: '👕', Bottom: '👖', Shoes: '👞', Accessory: '👜' };
        return map[cat] || '🎽';
    };

    return (
        <div className="item-card">
            <h3>{getCategoryEmoji(item.category)} {item.name}</h3>
            <div><strong>Категория:</strong> {item.category}</div>
            <div><strong>Цвет:</strong> <span style={{ display: 'inline-block', width: '16px', height: '16px', backgroundColor: item.color.toLowerCase(), border: '1px solid #ddd', borderRadius: '2px', marginLeft: '8px' }}></span> {item.color}</div>
            <div><strong>Сезон:</strong> {item.season}</div>
        </div>
    );
}
