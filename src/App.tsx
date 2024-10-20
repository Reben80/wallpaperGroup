import React from 'react';
import WallpaperGroupIdentifier from './components/WallpaperGroupIdentifier';

const App: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
    }}>
      <WallpaperGroupIdentifier />
    </div>
  );
};

export default App;
