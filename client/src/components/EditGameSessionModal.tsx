import React, { useContext, useState } from "react";
import { GameSession } from "../models/GameSession";
import { GoodplaysContext } from "../models/GoodplaysContextType";
import { fetchGameSessions } from "../AppUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

interface EditGameSessionModalProps {
  session: GameSession;
  onClose: () => void;
}

const EditGameSessionModal: React.FC<EditGameSessionModalProps> = ({
  session,
  onClose,
}) => {
  const { setGameSessions, goodplaysUser } = useContext(GoodplaysContext);
  const [gameName, setGameName] = useState(session.gameName);
  const startDate = new Date(session.startTimestamp);
  const endDate = new Date(session.endTimestamp);
  const [startTimestamp, setStartTimestamp] = useState(
    new Date(startDate.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
      .toISOString()
      .slice(0, 19)
  );

  const [endTimestamp, setEndTimestamp] = useState(
    new Date(endDate.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
      .toISOString()
      .slice(0, 19)
  );

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  const handleStartTimestampChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTimestamp(event.target.value);
  };

  const handleEndTimestampChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEndTimestamp(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedSession = {
      ...session,
      gameName,
      startTimestamp,
      endTimestamp,
    };

    const response = await fetch(`/game_sessions/${session._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSession),
    });

    if (response.ok) {
      setGameSessions(await fetchGameSessions(goodplaysUser.discordUserId));
    } else {
      console.error(
        "Failed to edit game session:",
        response.status,
        response.statusText
      );
    }

    onClose();
  };

  return (
    <div>
      <h2>Edit Game Session</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gameName">Game Name: </label>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={handleGameNameChange}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time: </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTimestamp}
            onChange={handleStartTimestampChange}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time: </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTimestamp}
            onChange={handleEndTimestampChange}
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon icon={faSave} /> Save Changes
        </button>
        <button type="button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} /> Cancel
        </button>
      </form>
    </div>
  );
};

export default EditGameSessionModal;
