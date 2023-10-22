import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddGameSessionModalProps {
  onCloseModal: () => void;
}

const AddGameSessionModal: React.FC<AddGameSessionModalProps> = ({
  onCloseModal,
}) => {
  const [gameName, setGameName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState(
    new Date(new Date().getTime() + new Date().getTimezoneOffset() * -60 * 1000)
      .toISOString()
      .slice(0, 19)
  );

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  const resetFields = () => {
    setGameName("");
    setStartTimestamp("");
    setEndTimestamp(
      new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * -60 * 1000
      )
        .toISOString()
        .slice(0, 19)
    );
  };

  const handleAddGameSession = async () => {
    if (gameName) {
      const userId = "131989430171992064";

      const gameSession = {
        userId: userId,
        gameName: gameName,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp,
      };

      const response = await fetch(`/game_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameSession),
      });

      if (!response.ok)
        console.error(
          "Failed to add game session:",
          response.status,
          response.statusText
        );
    }

    setShowModal(false);
    resetFields();
    onCloseModal();
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

  const handleOnCloseModal = async () => {
    setShowModal(false);
    resetFields();
    onCloseModal();
  };

  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Game Session</h2>
            <label htmlFor="gameName">Game Name: </label>
            <input
              id="gameName"
              type="text"
              value={gameName}
              onChange={handleGameNameChange}
            />
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
            <button onClick={handleAddGameSession}>Add</button>
            <button onClick={handleOnCloseModal}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Game Session
          </button>{" "}
        </div>
      )}
    </>
  );
};

export default AddGameSessionModal;
