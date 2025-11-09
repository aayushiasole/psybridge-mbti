import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import PatientForm from "./pages/PatientForm";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage";
import Types from "./pages/Types";
import History from "./pages/History";

export default function App() {
  const [responses, setResponses] = useState([]);
  const [patient, setPatient] = useState({});

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Pass setPatient to PatientForm */}
        <Route path="/patient" element={<PatientForm setPatient={setPatient} />} />
        <Route path="/quiz" element={<QuestionsPage setResponses={setResponses} />} />
        <Route path="/result" element={<ResultPage responses={responses} />} />
        <Route path="/types" element={<Types />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}
