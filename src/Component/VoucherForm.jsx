import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VoucherForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [voucherType, setVoucherType] = useState("Payment");
  const [narration, setNarration] = useState("On Account");

  const [rows, setRows] = useState([
    { account: "", amount: "", tdsApplicable: "No", tdsType: "" }
  ]);

  useEffect(() => {
    if (id) {
      const data = JSON.parse(localStorage.getItem("vouchers")) || [];
      const found = data.find((item) => item.id === Number(id));

      if (found) {
        setVoucherType(found.type);
        setNarration(found.narration);
      }
    }
  }, [id]);

  function handleChange(index, field, value) {
    const copy = [...rows];
    copy[index][field] = value;

    if (field === "tdsApplicable" && value === "No") {
      copy[index].tdsType = "";
    }

    setRows(copy);
  }

  function addRow() {
    setRows([
      ...rows,
      { account: "", amount: "", tdsApplicable: "No", tdsType: "" }
    ]);
  }

  function deleteRow(index) {
    setRows(rows.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    let total = 0;
    rows.forEach((item) => {
      total += Number(item.amount || 0);
    });

    let data = JSON.parse(localStorage.getItem("vouchers")) || [];

    if (id) {
      const updated = data.map((item) => {
        if (item.id === Number(id)) {
          return {
            ...item,
            type: voucherType,
            narration: narration,
            totalDebit: voucherType === "Payment" ? total : 0,
            totalCredit: voucherType === "Received" ? total : 0
          };
        }
        return item;
      });

      localStorage.setItem("vouchers", JSON.stringify(updated));
      alert("Voucher updated successfully");
    } else {
      const newVoucher = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: voucherType,
        narration: narration,
        totalDebit: voucherType === "Payment" ? total : 0,
        totalCredit: voucherType === "Received" ? total : 0
      };

      localStorage.setItem("vouchers", JSON.stringify([...data, newVoucher]));
      alert("Voucher created successfully");
    }

    navigate("/vouchers");
  }

  // 🎨 UI STYLES (same file)
  const styles = {
    container: {
      maxWidth: "900px",
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
    title: {
      textAlign: "center",
      marginBottom: "20px"
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "5px"
    },
    table: {
      width: "100%",
      marginTop: "15px",
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
    btn: {
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      color: "white"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>
          {id ? "Edit Voucher" : "Create Voucher"}
        </h2>

        {/* Voucher Type */}
        <div style={{ marginBottom: "10px" }}>
          <label>Voucher Type</label>
          <select
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
            style={styles.input}
          >
            <option>Payment</option>
            <option>Received</option>
          </select>
        </div>

        {/* Narration */}
        <div style={{ marginBottom: "15px" }}>
          <label>Narration</label>
          <input
            value={narration}
            onFocus={() => setNarration("")}
            onChange={(e) => setNarration(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Account</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>TDS</th>
              <th style={styles.th}>TDS Type</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={row.account}
                    onChange={(e)=>handleChange(index,"account",e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Cash</option>
                    <option>Bank</option>
                  </select>
                </td>

                <td style={styles.td}>
                  <input
                    type="number"
                    style={styles.input}
                    value={row.amount}
                    onChange={(e)=>handleChange(index,"amount",e.target.value)}
                  />
                </td>

                <td style={styles.td}>
                  <select
                    style={styles.input}
                    value={row.tdsApplicable}
                    onChange={(e)=>handleChange(index,"tdsApplicable",e.target.value)}
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </td>

                <td style={styles.td}>
                  {row.tdsApplicable === "Yes" && (
                    <select
                      style={styles.input}
                      value={row.tdsType}
                      onChange={(e)=>handleChange(index,"tdsType",e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>Type A</option>
                      <option>Type B</option>
                    </select>
                  )}
                </td>

                <td style={styles.td}>
                  <button
                    style={{ ...styles.btn, background: "#3498db", marginRight: "5px" }}
                    onClick={addRow}
                  >
                    +
                  </button>

                  {rows.length > 1 && (
                    <button
                      style={{ ...styles.btn, background: "#e74c3c" }}
                      onClick={() => deleteRow(index)}
                    >
                      x
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>

      </div>
    </div>
  );
}