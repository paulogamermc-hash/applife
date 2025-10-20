import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { GameProvider } from './contexts/GameContext';
import { BottomNavigation } from './components/BottomNavigation';
import { Dashboard } from './pages/Dashboard';
import { Missions } from './pages/Missions';
import { Shop } from './pages/Shop';
import { Profile } from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <BottomNavigation />
          </div>
        </BrowserRouter>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
