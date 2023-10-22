import { useState } from "react";
import { Navigate } from "react-router-dom";

interface LoginFormProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginPage: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setUserLoggedIn] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/login/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();
      console.log(`logging in, user: ${data.user}`);
      if (data.redirectUri === "/") {
        console.log("logged in");
        setIsLoggedIn(true);
        setUserLoggedIn(true);
      }

      // redirect(data.redirectUri);
      //window.history.pushState({}, "", data.redirectUri);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {loggedIn && <Navigate to="/" replace={true} />}

      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            autoFocus
            onChange={handleUsernameChange}
          />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            onChange={handlePasswordChange}
          />
        </section>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default LoginPage;
