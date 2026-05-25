import React, { useState } from 'react';
import { generateOutfit } from '../services/api';

export default function OutfitGenerator() {
    const [season, setSeason] = useState('ALL');
    const [weather, setWeather] = useState('SUNNY');
    const [timeOfDay, setTimeOfDay] = useState('MORNING');
    const [style, setStyle] = useState('CASUAL');
    const [loading, setLoading] = useState(false);
    const [outfit, setOutfit] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setOutfit(null);

        try {
            const response = await generateOutfit({ season, weather, timeOfDay, style });
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
            <h2 style={{ marginBottom: 20 }}>✨ Генератор Идеального Лука</h2>
            
            <div className="generator-controls">
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="ALL">Все сезоны</option>
                    <option value="SUMMER">Лето ☀️</option>
                    <option value="WINTER">Зима ❄️</option>
                    <option value="FALL">Осень 🍂</option>
                    <option value="SPRING">Весна 🌱</option>
                </select>
                <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                    <option value="SUNNY">Солнечно ☀️</option>
                    <option value="RAINY">Дождь 🌧️</option>
                    <option value="COLD">Холодно 🥶</option>
                    <option value="WINDY">Ветрено 💨</option>
                    <option value="SNOWY">Снег ❄️</option>
                </select>
                <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
                    <option value="MORNING">Утро 🌅</option>
                    <option value="AFTERNOON">День 🏙️</option>
                    <option value="EVENING">Вечер 🌇</option>
                    <option value="NIGHT">Ночь 🌃</option>
                </select>
                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="CASUAL">Casual 👕</option>
                    <option value="FORMAL">Formal 👔</option>
                    <option value="SPORT">Sport 🏃‍♂️</option>
                    <option value="PARTY">Party 🎉</option>
                </select>
                <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
                    {loading ? '⏳ Магия ИИ работает...' : '🎨 Создать шедевр'}
                </button>
            </div>

            {error && <div className="error" style={{marginTop: 20}}>{error}</div>}

            {outfit && (
                <div className="outfit-result-card">
                    <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        💡 Рекомендация стилиста
                    </h3>
                    
                    <div className="recommendation-text">
                        {outfit.recommendation || 'Рекомендация не найдена'}
                    </div>

                    <h4 style={{ marginBottom: 12, color: '#4a5568' }}>🛍️ Доступные вещи для образа:</h4>
                    
                    {outfit.availableItems && outfit.availableItems.length > 0 ? (
                        <div className="items-wrapper">
                            {outfit.availableItems.map((item, idx) => (
                                <div key={idx} className="item-badge">
                                    👗 {item}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#a0aec0', fontSize: 14 }}>К сожалению, подходящих вещей не нашлось.</p>
                    )}
                </div>
            )}
        </div>
    );
}
