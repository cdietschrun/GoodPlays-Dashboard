import React, { useEffect, useState } from "react";
import GameSessionList from "./GameSessionList";
import { GameSession } from "../models/GameSession";

const Home: React.FC = () => {
  const handleLogin = () => {
    const redirectUri =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_REDIRECT_URI_DEV
        : process.env.REACT_APP_REDIRECT_URI_PROD;

    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
  };

  //const [data, setData] = useState({});

  // useEffect(() => {
  //   fetch("https://goodplays.azurewebsites.net/data?userId=131989430171992064")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success fetching data:", data);
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // return (
  //   <div>
  //     <h1>Welcome to app</h1>
  //     {process.env.NODE_ENV === "development" ? (
  //       <p>Development environment</p>
  //     ) : (
  //       <p>Production environment</p>
  //     )}
  //     <button onClick={handleLogin}>Login with Discord</button>
  //     ssssssssss {JSON.stringify(data)}
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>Welcome to My Discord OAuth App</h1>
  //     <button onClick={handleLogin}>Login with Discord</button>
  //   </div>
  // );

  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const userId = "131989430171992064";
  const apiUrl = `https://goodplays.azurewebsites.net/data?userId=${userId}`;

  useEffect(() => {
    // Function to fetch game sessions from the API
    const fetchGameSessions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }

        const data = await response.json();
        setGameSessions(data); // Update the state with the fetched game sessions
      } catch (error) {
        console.error("Error fetching game sessions:", error);
      }
    };

    // Call the function to fetch game sessions when the component mounts
    fetchGameSessions();
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  return (
    <div>
      <h1>Game Sessions</h1>
      <GameSessionList gameSessions={gameSessions} />
    </div>
  );
};

export default Home;
