import React, { useContext, useState } from "react";
import { GoodplaysContext } from "../models/GoodplaysContextType";

const SettingsPage: React.FC = () => {
  const { goodplaysUser, setGoodplaysUser } = useContext(GoodplaysContext);
  const [discordUserId, setDiscordUserId] = useState(
    goodplaysUser?.discordUserId || ""
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleDiscordUserIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscordUserId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/user/${goodplaysUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discordUserId: discordUserId }),
      });

      const data = await response.json();
      console.log("settings data: ", data);
      if (response.status === 200) {
        setGoodplaysUser({
          ...goodplaysUser,
          discordUserId: discordUserId,
        });

        setErrorMessage("Settings saved!");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>Goodplays user ID: {goodplaysUser?._id}</label>
        <br />
        <label>Email Address: {goodplaysUser?.email}</label>
        <br />
        <label>
          Discord User ID:
          <input
            type="text"
            value={discordUserId}
            onChange={handleDiscordUserIdChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;
