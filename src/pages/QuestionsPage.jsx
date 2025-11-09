import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions.json";

const PER_PAGE = 6;
const PRIMARY_COLOR = "#009688";
const TEXT_COLOR = "#34495e";

const LikertScale = ({ name, value, onChange }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "350px",
      margin: "0 auto",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "5px",
        color: "#95a5a6",
        fontSize: "13px",
        fontWeight: "500",
      }}
    >
      <span style={{ color: "#e74c3c", fontWeight: 700 }}>DISAGREE</span>
      <span>NEUTRAL</span>
      <span style={{ color: PRIMARY_COLOR, fontWeight: 700 }}>AGREE</span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      {["1", "2", "3", "4", "5"].map((v) => (
        <label
          key={v}
          style={{
            fontSize: "14px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name={name}
            value={v}
            checked={value === Number(v)}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{
              appearance: "none",
              border: value === Number(v) ? "2px solid #fff" : "1px solid #ccc",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              margin: "0 auto 4px",
              display: "block",
              backgroundColor: value === Number(v) ? PRIMARY_COLOR : "#fff",
              boxShadow:
                value === Number(v) ? `0 0 0 2px ${PRIMARY_COLOR}` : "none",
              transition: "all 0.2s",
            }}
          />
          {v}
        </label>
      ))}
    </div>
  </div>
);

export default function QuestionsPage({ setResponses }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [page, setPage] = useState(0);
  const [patient, setPatient] = useState({});
  const navigate = useNavigate();
  const numPages = Math.ceil(questions.length / PER_PAGE);

  // --- Load patient and last answers ---
  useEffect(() => {
    const patientSession = JSON.parse(sessionStorage.getItem("patient") || "{}");
    setPatient(patientSession);

    const lastAnswers = JSON.parse(sessionStorage.getItem("last_answers") || "null");
    if (lastAnswers && lastAnswers.length === questions.length) {
      setAnswers(lastAnswers);
    }
    window.scrollTo(0, 0);
  }, [page]);

  const start = page * PER_PAGE;
  const end = Math.min(start + PER_PAGE, questions.length);
  const currentAnswers = answers.slice(start, end);
  const canNext = currentAnswers.every((a) => a !== null);
  const isComplete = answers.every((a) => a !== null);

  const handleChange = (idx, val) => {
    const arr = [...answers];
    arr[idx] = val;
    setAnswers(arr);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (page < numPages - 1 && canNext) setPage(page + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (page > 0) setPage(page - 1);
  };

  // ✅ Fixed: pass responses via router + session storage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    setResponses(answers);
    sessionStorage.setItem("last_answers", JSON.stringify(answers));
    navigate("/result", { state: { responses: answers } }); // ✅ Correct data transfer
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7f9",
        padding: "20px 0 120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "30px 40px",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: PRIMARY_COLOR,
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Patient: {patient.name || "N/A"}
            {patient.age && ` (${patient.age}, ${patient.gender})`}
          </div>
          <h3 style={{ color: TEXT_COLOR, margin: 0 }}>
            MBTI Personality Assessment
          </h3>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <div
            style={{
              color: TEXT_COLOR,
              fontWeight: 600,
              fontSize: "15px",
              marginBottom: "8px",
            }}
          >
            Overall Progress: {progress}% Complete
          </div>
          <div
            style={{
              height: "10px",
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: PRIMARY_COLOR,
                transition: "width 0.5s",
              }}
            />
          </div>
        </div>

        <form>
          {questions.slice(start, end).map((q, idx) => {
            const globalIdx = start + idx;
            const isAnswered = answers[globalIdx] !== null;
            return (
              <div
                key={globalIdx}
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  borderLeft: `5px solid ${
                    isAnswered ? PRIMARY_COLOR : "#ccc"
                  }`,
                  backgroundColor: isAnswered ? "#f0fff5" : "#f9fbfb",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: TEXT_COLOR,
                    marginBottom: "20px",
                    lineHeight: "1.5",
                  }}
                >
                  <span
                    style={{
                      color: PRIMARY_COLOR,
                      fontWeight: 700,
                      marginRight: "8px",
                    }}
                  >
                    {globalIdx + 1}.
                  </span>{" "}
                  {q}
                </div>
                <LikertScale
                  name={`q${globalIdx}`}
                  value={answers[globalIdx]}
                  onChange={(val) => handleChange(globalIdx, val)}
                />
              </div>
            );
          })}
        </form>

        <div
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#7f8c8d",
            fontWeight: 500,
            marginBottom: "20px",
          }}
        >
          Viewing Section {page + 1} of {numPages} — {answeredCount} /{" "}
          {questions.length} answered
        </div>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "1px solid #eee",
            padding: "15px 40px",
            boxShadow: "0 -5px 20px rgba(0,0,0,0.05)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleBack}
            disabled={page === 0}
            style={{
              minWidth: "150px",
              padding: "12px 25px",
              marginRight: "20px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: page === 0 ? "not-allowed" : "pointer",
              backgroundColor: "#e6edfb",
              color: TEXT_COLOR,
              border: "none",
            }}
          >
            ← Previous Section
          </button>

          {page < numPages - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canNext}
              style={{
                minWidth: "150px",
                padding: "12px 25px",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: !canNext ? "not-allowed" : "pointer",
                backgroundColor: PRIMARY_COLOR,
                color: "#fff",
                border: "none",
              }}
            >
              Next Section →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              style={{
                minWidth: "150px",
                padding: "12px 25px",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: !isComplete ? "not-allowed" : "pointer",
                backgroundColor: PRIMARY_COLOR,
                color: "#fff",
                border: "none",
              }}
            >
              Submit & See Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
