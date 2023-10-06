import React from "react";
import GameSessionList from "./GameSessionList";

const Home: React.FC = () => {
  const handleLogin = () => {
    const redirectUri =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_REDIRECT_URI_DEV
        : process.env.REACT_APP_REDIRECT_URI_PROD;

    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
  };

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

  return (
    <div>
      <h1>Game Sessions</h1>
      <GameSessionList />
    </div>
  );
};

export default Home;
