import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PRIMARY_COLOR = "#007BFF";
const SUCCESS_COLOR = "#28A745";
const TEXT_COLOR = "#343A40";

const apiUrl = "https://psybridge-backend-production.up.railway.app";

export default function ResultPage() {
  const [currentResponses, setCurrentResponses] = useState([]);
  const [mbti, setMbti] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patient, setPatient] = useState({});
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get patient info
    const patientData = JSON.parse(sessionStorage.getItem("patient") || "{}");
    setPatient(patientData);

    // Restore answers: prefer router state, fallback to sessionStorage
    let answers = location.state?.responses;
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      const backup = sessionStorage.getItem("last_answers");
      if (backup) {
        try { answers = JSON.parse(backup); } catch { answers = []; }
      }
    }
    setCurrentResponses(Array.isArray(answers) ? answers : []);
  }, [location.state]);

  useEffect(() => {
    if (!currentResponses || currentResponses.length === 0) {
      setLoading(false);
      setError("Assessment data missing.");
      setMbti("");
      return;
    }

    fetch(`${apiUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: currentResponses })
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          console.log("HTTP errorText:", errorText);
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }
        let data;
        try {
          data = await res.json();
        } catch (e) {
          console.log("JSON parse error");
          throw new Error("Backend response not valid JSON.");
        }
        console.log("Backend data received:", data);
        if (!data.mbti_type) {
          throw new Error(data.error || "No MBTI type from backend.");
        }
        setMbti(data.mbti_type);
        setError(""); // Clear old errors
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError(err.message || "Could not connect to backend or response invalid.");
        setMbti(""); // Clear MBTI on error
        setLoading(false);
      });
  }, [currentResponses]);

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Field,Value\r\n";
    csvContent += `Name,${patient.name}\r\n`;
    csvContent += `Age,${patient.age}\r\n`;
    csvContent += `Gender,${patient.gender}\r\n`;
    csvContent += `MBTI Type,${mbti}\r\n`;
    currentResponses.forEach((r, i) => (csvContent += `Q${i + 1},${r}\r\n`));
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MBTI_Report_${patient.name || "Result"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // UI
  if (loading)
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Calculating MBTI...</div>;
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Result Error 🛑</h2>
        <p>{error}</p>
        <button onClick={() => nav("/")}>← Return Home</button>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center"
      }}
    >
      <h2 style={{ color: PRIMARY_COLOR }}>Assessment Complete 🎉</h2>
      <div style={{ fontSize: "16px", margin: "10px 0 30px" }}>
        Patient: {patient.name} ({patient.age}, {patient.gender})
      </div>
      <div
        style={{
          padding: "25px",
          border: `2px solid ${PRIMARY_COLOR}`,
          borderRadius: "10px",
          marginBottom: "40px",
          backgroundColor: "#E7F5FF"
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: 600 }}>Your MBTI Type:</span>
        <div style={{
          fontSize: "48px",
          fontWeight: 900,
          color: PRIMARY_COLOR,
          marginTop: "10px"
        }}>
          {mbti}
        </div>
      </div>
      <button
        style={{
          margin: "10px",
          padding: "12px 25px",
          backgroundColor: SUCCESS_COLOR,
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
        onClick={downloadCSV}
      >
        📥 Download Full Report (.CSV)
      </button>
      <button
        style={{
          margin: "10px",
          padding: "12px 25px",
          backgroundColor: "#f4f6f9",
          color: TEXT_COLOR,
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
        onClick={() => nav("/")}
      >
        Start New Assessment
      </button>
    </div>
  );
}
