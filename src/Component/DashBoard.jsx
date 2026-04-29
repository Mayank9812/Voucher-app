import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🎨 Styles (same file)
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #6a85f1, #8d9eff)"
    },
    card: {
      width: "360px",
      background: "#fff",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
      textAlign: "center"
    },
    title: {
      marginBottom: "15px",
      color: "#333"
    },
    info: {
      background: "#f7f8fc",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "15px",
      fontSize: "14px",
      color: "#444"
    },
    label: {
      fontWeight: "bold"
    },
    btn: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer",
      marginBottom: "10px",
      transition: "0.2s"
    },
    voucherBtn: {
      background: "#4caf50"
    },
    logoutBtn: {
      background: "#e74c3c"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>Dashboard</h2>

        <div style={styles.info}>
          <p>
            <span style={styles.label}>Welcome:</span> {user?.username}
          </p>
          <p>
            <span style={styles.label}>Role:</span> {user?.role}
          </p>
        </div>

        <button
          style={{ ...styles.btn, ...styles.voucherBtn }}
          onClick={() => navigate("/vouchers")}
        >
          Go to Vouchers
        </button>

        <button
          style={{ ...styles.btn, ...styles.logoutBtn }}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}