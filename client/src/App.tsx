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
import LoginForm from "./components/LoginForm";
import { fetchGameSessions } from "./AppUtils";
import LogoutForm from './components/LogoutForm';
import RegisterPage from './components/RegisterPage';
import { GoodplaysUser } from './models/GoodplaysUser';

function App() {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("goodplaysUser") !== null);
  const [goodplaysUser, setGoodplaysUser] = useState<GoodplaysUser>({ _id: "", userName: "", email: "", discordUserId: "" });

  useEffect(() => {
    const goodplaysUserFromLocalStorage = localStorage.getItem("goodplaysUser");
    if (goodplaysUserFromLocalStorage) {
      const goodplaysUser = JSON.parse(goodplaysUserFromLocalStorage);
      const storedTimestamp = goodplaysUser.timestamp;
      const sessionDuration = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
      const isSessionExpired = new Date().getTime() - storedTimestamp > sessionDuration;
      if (isSessionExpired) {
        localStorage.removeItem("goodplaysUser");
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setGoodplaysUser(goodplaysUser.goodplaysUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (goodplaysUser) {
        setGameSessions(await fetchGameSessions(goodplaysUser.discordUserId));
      }
    };

    fetchData();
  }, [goodplaysUser]);

  return (
    <GoodplaysContext.Provider value={{ gameSessions, setGameSessions, isLoggedIn, setIsLoggedIn, goodplaysUser, setGoodplaysUser }}>
      <Router>
        <div className="app">
          <Navigation />

          <Routes>
            <Route path="/" element={ isLoggedIn ? (<HomePage />) : (<Navigate to="/login" replace={true} />) }/> 

            <Route path="/charts" element={isLoggedIn ? (<ChartNavigation />) : (<Navigate to="/login" replace={true} />)} />
            <Route path="/charts/pie" element={isLoggedIn ? (<GamePieChartPage />) : (<Navigate to="/login" replace={true} />)} />
            <Route path="/charts/treemap" element={ isLoggedIn? (<GameTreeMapChartPage />) : (<Navigate to="/login" replace={true} />)} />

            <Route path="/settings" element={isLoggedIn ? (<SettingsPage />) : (<Navigate to="/login" replace={true} />)} />
            <Route path="/register" element={<RegisterPage />} />
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
