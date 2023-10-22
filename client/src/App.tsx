import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import { GoodplaysContext } from "./models/GoodplaysContextType";
import ChartNavigation from "./components/ChartsNavigation";
import { GameSession } from "./models/GameSession";
import GamePieChartPage from "./components/GamePieChartPage";
import GameTreeMapChartPage from "./components/GameTreeMapChartPage";
import SettingsPage from "./components/SettingsPage";
import RegistrationPage from "./components/RegistrationPage";
import LoginForm from "./components/LoginForm";
import { fetchGameSessions } from "./AppUtils";
import LogoutForm from './components/LogoutForm';

function App() {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setGameSessions(await fetchGameSessions());
    };

    fetchData();
  }, []);

  return (
    <GoodplaysContext.Provider value={{ gameSessions, setGameSessions, isLoggedIn, setIsLoggedIn }}>
      <Router>
        <div className="app">
          <Navigation />

          <Routes>
            <Route path="/" element={ isLoggedIn ? (<HomePage />) : (<Navigate to="/login" replace={true} />) }/> 

            <Route path="/charts" element={isLoggedIn ? (<ChartNavigation />) : (<Navigate to="/login" replace={true} />)} />
            <Route path="/charts/pie" element={isLoggedIn ? (<GamePieChartPage />) : (<Navigate to="/login" replace={true} />)} />
            <Route path="/charts/treemap" element={ isLoggedIn? (<GameTreeMapChartPage />) : (<Navigate to="/login" replace={true} />)} />

            <Route path="/settings" element={isLoggedIn ? (<SettingsPage />) : (<Navigate to="/login" replace={true} />)} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginForm /> } />
            <Route path="/logout" element={isLoggedIn && <LogoutForm /> } 
              
            />
          </Routes>
        </div>
      </Router>
    </GoodplaysContext.Provider>
  );
}

export default App;
