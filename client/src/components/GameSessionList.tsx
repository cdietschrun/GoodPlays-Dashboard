import "../styles/GameSessionList.css";

import React, { useContext, useState } from "react";
import GameSessionCard from "./GameSessionCard";
import { GameSessionsContext } from "../models/GameSessionContext";
import AddGameSessionModal from "./AddGameSessionModal";
import { fetchGameSessions } from "../AppUtils";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameSessionList: React.FC = () => {
  const { gameSessions, setGameSessions } = useContext(GameSessionsContext);

  const gamesPerPage = 5;
  const totalPages = Math.ceil(gameSessions.length / gamesPerPage);

  const paginate = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    return gameSessions.slice(startIndex, endIndex);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCloseAddGameSessionModal = async () => {
    setCurrentPage(1);
    setGameSessions(await fetchGameSessions());
  };

  const handleGoToPage = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      setCurrentPage(inputPage);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setGameSessions(await fetchGameSessions());
    setIsLoading(false);
  };

  const currentGameSessions = paginate(currentPage);

  return (
    <div className="game-session-list">
      <div className="game-session-card-container">
        <AddGameSessionModal onCloseModal={handleCloseAddGameSessionModal} />
        <button onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? (
            <FontAwesomeIcon icon={faSync} spin />
          ) : (
            <span>
              <FontAwesomeIcon icon={faSync} /> Refresh Game Sessions
            </span>
          )}
        </button>
        <br />

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
