import React from "react";
const options = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];
export default function LikertScale({ value, onChange, name }) {
  return (
    <>
      {options.map(opt => (
        <span className="likert-option" key={opt.value}>
          <label>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <div style={{fontSize:11}}>{opt.value}</div>
            <div style={{fontSize:9, color:"#b2babd"}}>{opt.label.split(" ")[1]}</div>
          </label>
        </span>
      ))}
    </>
  );
}
