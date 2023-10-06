import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Callback from "./components/Callback";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import { GameSessionsContext } from "./models/GameSessionContext";
import ChartNavigation from "./components/ChartsNavigation";
import { GameSession } from "./models/GameSession";
import GamePieChartPage from "./components/GamePieChartPage";
import GameTreeMapChartPage from "./components/GameTreeMapChartPage";

function App() {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const userId = "131989430171992064";
  const apiUrl = `https://goodplays.azurewebsites.net/data?userId=${userId}`;

  useEffect(() => {
    // Function to fetch game sessions from the API
    const fetchGameSessions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }

        const data = await response.json();
        setGameSessions(data); // Update the state with the fetched game sessions
      } catch (error) {
        console.error("Error fetching game sessions:", error);
      }
    };

    // Call the function to fetch game sessions when the component mounts
    fetchGameSessions();
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  return (
    <GameSessionsContext.Provider value={{ gameSessions, setGameSessions }}>
      <Router>
        <div className="app">
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<ChartNavigation />} />
            <Route path="/charts/pie" element={<GamePieChartPage />} />
            <Route path="/charts/treemap" element={<GameTreeMapChartPage />} />
          </Routes>
        </div>
      </Router>
    </GameSessionsContext.Provider>
  );
}

<Route path="/callback" element={<Callback />} />;

export default App;
