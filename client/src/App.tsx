import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import { GameSessionsContext } from "./models/GameSessionContext";
import ChartNavigation from "./components/ChartsNavigation";
import { GameSession } from "./models/GameSession";
import GamePieChartPage from "./components/GamePieChartPage";
import GameTreeMapChartPage from "./components/GameTreeMapChartPage";
import SettingsPage from "./components/SettingsPage";
import RegistrationPage from "./components/RegistrationPage";
import LoginForm from "./components/LoginForm";
import { fetchGameSessions } from "./AppUtils";

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
    <GameSessionsContext.Provider value={{ gameSessions, setGameSessions }}>
      <Router>
        <div className="app">
          <Navigation />

          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />

            <Route path="/charts" element={<ChartNavigation />} />
            <Route path="/charts/pie" element={<GamePieChartPage />} />
            <Route path="/charts/treemap" element={<GameTreeMapChartPage />} />

            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />
          </Routes>
        </div>
      </Router>
    </GameSessionsContext.Provider>
  );
}

export default App;
