import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Vouchers() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("vouchers")) || []
  );

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    let data = JSON.parse(localStorage.getItem("vouchers")) || [];
    const updated = data.filter((item) => item.id !== id);

    localStorage.setItem("vouchers", JSON.stringify(updated));
    setList(updated);

    alert("Deleted successfully");
  }

  // 🎨 Styles (same file)
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "auto",
      padding: "20px",
      background: "#f4f6fb",
      minHeight: "100vh"
    },
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px"
    },
    button: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      color: "white"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    th: {
      background: "#6c7ae0",
      color: "white",
      padding: "10px"
    },
    td: {
      padding: "8px",
      borderBottom: "1px solid #ddd"
    },
    actionBtn: {
      padding: "5px 8px",
      marginRight: "5px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h2>Voucher List</h2>

          <button
            onClick={() => navigate("/create-voucher")}
            style={{ ...styles.button, background: "#4CAF50" }}
          >
            + Create
          </button>
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Narration</th>
              <th style={styles.th}>Total Debit</th>
              <th style={styles.th}>Total Credit</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "15px", color: "red" }}>
                  No Data Found
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.date}</td>
                  <td style={styles.td}>{item.type}</td>
                  <td style={styles.td}>{item.narration}</td>
                  <td style={styles.td}>{item.totalDebit}</td>
                  <td style={styles.td}>{item.totalCredit}</td>

                  <td style={styles.td}>
                    <button
                      style={{ ...styles.actionBtn, background: "#3498db", color: "white" }}
                    >
                      Read
                    </button>

                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={() => navigate(`/edit-voucher/${item.id}`)}
                          style={{ ...styles.actionBtn, background: "#f39c12", color: "white" }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{ ...styles.actionBtn, background: "#e74c3c", color: "white" }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}