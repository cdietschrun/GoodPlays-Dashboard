import { useState } from "react";
import { useNavigate } from "react-router-dom";

// type RegistrationFormProps = {
//   onSubmit: (name: string, email: string, password: string) => void;
// };

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/signup/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.status === 409) {
        setErrorMessage(data.message);
      } else {
        console.log("signup response: ", data);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <label>
          Username:{" "}
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            required
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </section>
      <section>
        <label>
          Email:{" "}
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            required
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </section>
      <section>
        <label>
          Password:{" "}
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            required
            autoFocus
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </section>
      <button type="submit">Register</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default RegisterPage;
