import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    const ok = login(username, password);

    if (ok) {
      navigate("/dashboard");
    } else {
      alert("Wrong username or password");
    }
  }

  // 🎨 Styles (same file)
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #6a85f1, #8d9eff)"
    },
    box: {
      width: "320px",
      background: "white",
      padding: "25px",
      borderRadius: "8px",
      boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333"
    },
    inputGroup: {
      marginBottom: "15px"
    },
    input: {
      width: "100%",
      padding: "8px",
      marginTop: "5px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      outline: "none"
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    hint: {
      marginTop: "15px",
      fontSize: "12px",
      color: "gray",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <h2 style={styles.title}>Login</h2>

        <div style={styles.inputGroup}>
          <label>Username</label>
          <input
            style={styles.input}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.hint}>
          admin / admin123 <br />
          staff / staff123
        </p>

      </div>
    </div>
  );
}