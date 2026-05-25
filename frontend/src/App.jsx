import React from 'react';
import Home from './pages/Home';

function App() {
    return (
        <div className="app">
            <header>
                <h1>AIU Daily Outfit Generator</h1>
                <p style={{ fontSize: 14, opacity: 0.9, marginTop: 8 }}>Your personal wardrobe companion</p>
            </header>
            <main>
                <Home />
            </main>
            <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center', color: '#666', fontSize: 13, marginTop: 40 }}>
                <p>© 2026 Daily Outfits Team | Powered by React + Spring Boot</p>
            </footer>
        </div>
    );
}

export default App;
