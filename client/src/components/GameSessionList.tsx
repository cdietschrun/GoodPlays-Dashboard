import "../styles/GameSessionList.css";

import React, { useContext } from "react";
import GameSessionCard from "./GameSessionCard";
import { GameSessionsContext } from "../models/GameSessionContext";
import AddGameSessionModal from "./AddGameSessionModal";

const GameSessionList: React.FC = () => {
  const { gameSessions } = useContext(GameSessionsContext);

  const gamesPerPage = 5;
  const totalPages = Math.ceil(gameSessions.length / gamesPerPage);

  const paginate = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    return gameSessions.slice(startIndex, endIndex);
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const [inputPage, setInputPage] = React.useState(currentPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value, 10);

    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      setInputPage(newPage);
    }
  };

  const handleCloseAddGameSessionModal = () => {
    setCurrentPage(1);
  };

  const handleGoToPage = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      setCurrentPage(inputPage);
    }
  };

  const currentGameSessions = paginate(currentPage);

  return (
    <div className="game-session-list">
      <div className="game-session-card-container">
        <AddGameSessionModal onCloseModal={handleCloseAddGameSessionModal} />

        {currentGameSessions.map((session, index) => (
          <GameSessionCard key={index} session={session} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          min={1}
          max={totalPages}
        />
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={handleGoToPage}>Go</button>
      </div>
    </div>
  );
};

export default GameSessionList;
