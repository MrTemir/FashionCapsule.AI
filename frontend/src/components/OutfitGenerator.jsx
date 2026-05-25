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
            console.error('Error:', err);
            setError('Unable to generate an outfit right now. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: 32 }}>
            <h2 style={{ marginBottom: 20 }}>Outfit Generator</h2>

            <div className="generator-controls" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="ALL">All seasons</option>
                    <option value="SUMMER">Summer</option>
                    <option value="WINTER">Winter</option>
                    <option value="FALL">Fall</option>
                    <option value="SPRING">Spring</option>
                </select>

                <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                    <option value="SUNNY">Sunny</option>
                    <option value="RAINY">Rainy</option>
                    <option value="COLD">Cold</option>
                    <option value="WINDY">Windy</option>
                    <option value="SNOWY">Snowy</option>
                </select>

                <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
                    <option value="MORNING">Morning</option>
                    <option value="AFTERNOON">Afternoon</option>
                    <option value="EVENING">Evening</option>
                    <option value="NIGHT">Night</option>
                </select>

                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="CASUAL">Casual</option>
                    <option value="FORMAL">Formal</option>
                    <option value="SPORT">Sport</option>
                    <option value="PARTY">Party</option>
                </select>

                <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate outfit'}
                </button>
            </div>

            {error && <div className="error" style={{ marginTop: 20 }}>{error}</div>}

            {outfit && (
                <div className="outfit-result-card" style={{ marginTop: 20 }}>
                    <h3 style={{ marginBottom: 12 }}>Stylist recommendation</h3>

                    <div className="recommendation-text" style={{ marginBottom: 12 }}>
                        {outfit.recommendation || 'No recommendation available.'}
                    </div>

                    <h4 style={{ marginBottom: 12, color: '#4a5568' }}>Available items</h4>

                    {outfit.availableItems && outfit.availableItems.length > 0 ? (
                        <div className="items-wrapper" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {outfit.availableItems.map((item, idx) => (
                                <div key={idx} className="item-badge" style={{ padding: '6px 10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6 }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#718096', fontSize: 14 }}>No suitable items found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
