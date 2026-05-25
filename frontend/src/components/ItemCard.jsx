import React from 'react';

export default function ItemCard({ item }) {
    return (
        <div className="item-card">
            <h3>{item.name}</h3>
            <div><strong>Category:</strong> {item.category}</div>
            <div><strong>Color:</strong> <span style={{ display: 'inline-block', width: '16px', height: '16px', backgroundColor: item.color.toLowerCase(), border: '1px solid #ddd', borderRadius: '2px', marginLeft: '8px' }}></span> {item.color}</div>
            <div><strong>Season:</strong> {item.season}</div>
        </div>
    );
}
