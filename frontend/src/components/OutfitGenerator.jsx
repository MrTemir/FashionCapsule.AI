import React, { useState } from 'react';
import { generateOutfit } from '../services/api';

export default function OutfitGenerator() {
    const [season, setSeason] = useState('ALL');
    const [style, setStyle] = useState('CASUAL');
    const [loading, setLoading] = useState(false);
    const [outfit, setOutfit] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setOutfit(null);

        try {
            const response = await generateOutfit({ season, style });
            setOutfit(response.data);
        } catch (err) {
            console.error('Ошибка:', err);
            setError('Не удалось сгенерировать лук. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: 32 }}>
            <h2>✨ Лук дня (AI)</h2>
            <div style={{ display: 'flex', gap: 12, marginTop: 16, marginBottom: 16 }}>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="ALL">Все сезоны</option>
                    <option value="SUMMER">Лето</option>
                    <option value="WINTER">Зима</option>
                    <option value="FALL">Осень</option>
                    <option value="SPRING">Весна</option>
                </select>
                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="CASUAL">Casual</option>
                    <option value="FORMAL">Formal</option>
                    <option value="SPORT">Sport</option>
                    <option value="PARTY">Party</option>
                </select>
                <button onClick={handleGenerate} disabled={loading}>
                    {loading ? '⏳ Генерирую...' : '🎨 Сгенерировать'}
                </button>
            </div>

            {error && <div className="error">{error}</div>}

            {outfit && (
                <div className="outfit-item" style={{ marginTop: 16 }}>
                    <h3>Ваш лук на {season}</h3>
                    <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(outfit, null, 2)}
          </pre>
                </div>
            )}
        </div>
    );
}
