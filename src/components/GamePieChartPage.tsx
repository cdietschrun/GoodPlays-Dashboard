import React from "react";
import GamePieChart from "./GamePieChart";
import ChartNavigation from "./ChartsNavigation";

const GamePieChartsPage: React.FC = () => {
  return (
    <div>
      <ChartNavigation />
      <h2>Games Played in the Last Month</h2>
      <GamePieChart />
    </div>
  );
};

export default GamePieChartsPage;
