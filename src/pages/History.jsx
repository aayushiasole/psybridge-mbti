import React from "react";

export default function History() {
  const history = JSON.parse(sessionStorage.getItem("history") || "[]");
  if (!history.length) {
    return <div className="quiz-card">No sessions yet.</div>;
  }
  return (
    <div style={{maxWidth:900, margin:'28px auto', display:'flex', flexWrap:'wrap', gap:'18px', justifyContent:'center'}}>
      {history.map((s, i) => (
        <div key={i} style={{
          background:'#fff',
          borderRadius:13,
          boxShadow:'0 2px 14px #b3cdf4a0',
          minWidth:230, maxWidth:320,
          padding:'16px 18px', flex:'1 0 230px'
        }}>
          <div style={{fontWeight:600, color:'#145'}}>Session {i+1}</div>
          <div style={{fontSize:13, color:'#888'}}>{s.date}</div>
          <div><b>Patient:</b> {s.patient?.name} ({s.patient?.age}, {s.patient?.gender})</div>
          <div><b>MBTI:</b> {s.mbti}</div>
          <details style={{marginTop:8, fontSize:12}}>
            <summary>View Answers</summary>
            <div style={{maxHeight:70, overflow:'auto'}}>
              {s.responses.map((a,j)=>(<span key={j}>{a}{j<s.responses.length-1?", ":""}</span>))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
