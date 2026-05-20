import React, { useState } from 'react';
import AddItemForm from '../components/AddItemForm';
import OutfitList from '../components/OutfitList';
import OutfitGenerator from '../components/OutfitGenerator';

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleItemAdded = () => {
        // Триггер перезагрузки списка
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div>
            <AddItemForm onItemAdded={handleItemAdded} />
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />
            <OutfitList key={refreshKey} />
            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />
            <OutfitGenerator />
        </div>
    );
}
