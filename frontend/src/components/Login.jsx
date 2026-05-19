import {
  useState,
} from "react";

import axios from "axios";

export default function Login({
  onLoginSuccess,
}) {
  const [email, setEmail] =
    useState("");

  const [
    accessCode,
    setAccessCode,
  ] = useState("");

  const [error, setError] =
    useState("");

  const handleLogin =
    async () => {
      try {
        setError("");

        const res =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
              email,
              accessCode,
            }
          );

        if (
          res.data.success
        ) {
          localStorage.setItem(
            "swingai_access",
            "true"
          );

          onLoginSuccess();
        }
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div
      style={{
        display: "flex",
        flexDirection:
          "column",
        gap: "10px",
        maxWidth: "300px",
        margin: "100px auto",
      }}
    >
      <h2>
        SwingAI Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="text"
        placeholder="Access Code"
        value={accessCode}
        onChange={(e) =>
          setAccessCode(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleLogin
        }
      >
        Login
      </button>

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}