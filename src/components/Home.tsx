import React from 'react';

const Home: React.FC = () => {
  const handleLogin = () => {
    // Implement OAuth login logic here
  };

  return (
    <div>
      <h1>Welcome to My Discord OAuth App</h1>
      <button onClick={handleLogin}>Login with Discord</button>
    </div>
  );
};

export default Home;
