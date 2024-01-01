import "../styles/GameSessionList.css";

import React, { useContext, useEffect, useState } from "react";
import GameSessionCard from "./GameSessionCard";
import { GoodplaysContext } from "../models/GoodplaysContextType";
import AddGameSessionModal from "./AddGameSessionModal";
import { fetchGameSessions } from "../AppUtils";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";

const GameSessionList: React.FC = () => {
  const { gameSessions, setGameSessions, goodplaysUser } =
    useContext(GoodplaysContext);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(gameSessions);


  useEffect(() => {
    const fuseOptions = {
      keys: ['gameName'],
      includeScore: true,
      threshold: 0.3,
    };
    const fuse = new Fuse(gameSessions, fuseOptions);

    if (search === '') {
      setSearchResults(gameSessions);
    } else {
      const result = fuse.search(search);
      const sortedResults = result.map(({ item }) => item).sort((a, b) => {
        // Assuming endTimestamp is a Date object
        return new Date(b.endTimestamp).getTime() - new Date(a.endTimestamp).getTime();
      });
      setSearchResults(sortedResults);
    }
  }, [search, gameSessions]);

  const gamesPerPage = 5;
  const totalPages = Math.ceil(searchResults.length / gamesPerPage);

  const paginate = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    return searchResults.slice(startIndex, endIndex);
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
    setGameSessions(await fetchGameSessions(goodplaysUser.discordUserId));
  };

  const handleGoToPage = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      setCurrentPage(inputPage);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setGameSessions(await fetchGameSessions(goodplaysUser.discordUserId));
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

        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search game sessions, e.g. 'craft' for StarCraft, Warcraft, and World of Warcraft"
        style={{ width: '500px' }} // Adjust the width as needed
        />
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
