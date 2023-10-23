import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoodplaysContext } from "../models/GoodplaysContextType";

const LoginPage: React.FC = () => {
  const { setIsLoggedIn, setGoodplaysUser } = useContext(GoodplaysContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      console.log("logging in, data: ", data);
      // set email/username, maybe one GoodPlaysUser object
      if (data.email) {
        console.log("logged in");
        setIsLoggedIn(true);
        setGoodplaysUser({
          _id: data._id,
          userName: data.username,
          email: data.email,
          discordUserId: data.discordUserId,
        });
        navigate("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          onChange={(event) => setUsername(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
        />
      </section>
      <button type="submit">Sign in</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default LoginPage;
