import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { GameSession } from "../models/GameSession";
import { GoodplaysContext } from "../models/GoodplaysContextType";
import Fuse from "fuse.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data2 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Plays",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const GamePieChart: React.FC = () => {
  const { gameSessions } = useContext(GoodplaysContext);
  const [search, setSearch] = useState('');

  const fuseOptions = {
    keys: ['gameName'],
    includeScore: true,
    threshold: 0.3
  };

  const fuse = new Fuse(gameSessions, fuseOptions);
  
  function dataToChartData(
    gameSessions: GameSession[]
  ): ChartData<"pie", number[], unknown> {
    let filteredSessions;
    if (search) {
      const result = fuse.search(search);
      filteredSessions = result.map(({ item }) => item);
    } else {
      filteredSessions = gameSessions;
    }
    const gameNames = [
      ...new Set(filteredSessions.map((session) => session.gameName)),
    ];
    const data = gameNames.map(
      (gameName) =>
        gameSessions.filter((session) => session.gameName === gameName).length
    );
    const backgroundColor = gameNames.map(
      () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.2)`
    );

    return {
      labels: gameNames,
      datasets: [
        {
          label: "# of Plays",
          data,
          backgroundColor,
          borderColor: backgroundColor.map((color) =>
            color.replace("0.2", "1")
          ),
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div>
        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search game sessions, e.g. 'craft' for StarCraft, Warcraft, and World of Warcraft"
        style={{ width: '500px' }}
        />
        <br />

        <Pie data={dataToChartData(gameSessions)} />;
    </div>
  );
};

export default GamePieChart;
