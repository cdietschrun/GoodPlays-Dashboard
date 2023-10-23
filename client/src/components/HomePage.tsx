import React from "react";
import GameSessionList from "./GameSessionList";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Game Sessions</h1>
      <GameSessionList />
    </div>
  );
};

export default HomePage;
