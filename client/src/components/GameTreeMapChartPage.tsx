import React from "react";
import GameTreeMapChart from "./GameTreeMapChart";
import ChartNavigation from "./ChartsNavigation";

const GameTreeMapChartsPage: React.FC = () => {
  return (
    <div>
      <ChartNavigation />
      <h2>Games Played</h2>
      <GameTreeMapChart />
    </div>
  );
};

export default GameTreeMapChartsPage;
