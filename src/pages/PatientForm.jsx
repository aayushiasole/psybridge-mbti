import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientForm({ setPatient }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const pdata = { name, age, gender };
    setPatient(pdata);
    sessionStorage.setItem("patient", JSON.stringify(pdata));
    sessionStorage.removeItem("last_answers"); // reset previous session
    navigate("/quiz");
  };

  return (
    <div className="quiz-card">
      <h2>Patient Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:<br/>
          <input required value={name} onChange={(e) => setName(e.target.value)} />
        </label><br/><br/>
        <label>Age:<br/>
          <input required type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label><br/><br/>
        <label>Gender:<br/>
          <select required value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label><br/><br/>
        <button className="control-btn" type="submit">Continue</button>
      </form>
    </div>
  );
}
