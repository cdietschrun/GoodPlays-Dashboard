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

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  const handleAddGameSession = async () => {
    if (gameName) {
      const userId = "131989430171992064";
      const response = await fetch(
        `/manual_game_log?userId=${userId}&gameName=${gameName}&isGameStart=true`,
        { method: "POST" }
      );
      if (!response.ok)
        console.error(
          "Failed to add game session:",
          response.status,
          response.statusText
        );
    }

    setShowModal(false);
    onCloseModal();
  };

  const handleOnCloseModal = async () => {
    setShowModal(false);
    onCloseModal();
  };

  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Game Session</h2>
            <input
              type="text"
              value={gameName}
              onChange={handleGameNameChange}
            />
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
