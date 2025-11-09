import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{
      width: '100%',
      background: '#000000ff',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 700,
      padding: '12px 0',
      position: 'relative'
    }}>
      <Link
        to="/"
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: 20,
          marginLeft: 28,
          flex: '0 0 auto'
        }}
      >
        MBTI Assessment
      </Link>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '28px',
          fontSize: 15,
        }}
      >
        <Link to="/patient" style={{ color: '#fff', textDecoration: 'none' }}>Patient</Link>
        <Link to="/quiz" style={{ color: '#fff', textDecoration: 'none' }}>Questionnaire</Link>
        <Link to="/types" style={{ color: '#fff', textDecoration: 'none' }}>MBTI Types</Link>
      </div>
    </nav>
  );
}
