import React from "react";

const mbtiTypes = [
  { code: 'INTJ', name: 'Architect', desc: 'Strategic, logical, imaginative thinkers.', link: 'https://www.16personalities.com/intj-personality' },
  { code: 'INTP', name: 'Logician', desc: 'Analytical, abstract inventors.', link: 'https://www.16personalities.com/intp-personality' },
  { code: 'ENTJ', name: 'Commander', desc: 'Bold, imaginative leaders.', link: 'https://www.16personalities.com/entj-personality' },
  { code: 'ENTP', name: 'Debater', desc: 'Curious, agile thinkers.', link: 'https://www.16personalities.com/entp-personality' },
  { code: 'INFJ', name: 'Advocate', desc: 'Insightful, idealistic advisors.', link: 'https://www.16personalities.com/infj-personality' },
  { code: 'INFP', name: 'Mediator', desc: 'Empathetic, creative, values-driven.', link: 'https://www.16personalities.com/infp-personality' },
  { code: 'ENFJ', name: 'Protagonist', desc: 'Charismatic, inspiring.', link: 'https://www.16personalities.com/enfj-personality' },
  { code: 'ENFP', name: 'Campaigner', desc: 'Enthusiastic and sociable.', link: 'https://www.16personalities.com/enfp-personality' },
  { code: 'ISTJ', name: 'Logistician', desc: 'Responsible, organized, dependable.', link: 'https://www.16personalities.com/istj-personality' },
  { code: 'ISFJ', name: 'Defender', desc: 'Warm, protective, committed.', link: 'https://www.16personalities.com/isfj-personality' },
  { code: 'ESTJ', name: 'Executive', desc: 'Pragmatic, decisive.', link: 'https://www.16personalities.com/estj-personality' },
  { code: 'ESFJ', name: 'Consul', desc: 'Caring, attentive to others.', link: 'https://www.16personalities.com/esfj-personality' },
  { code: 'ISTP', name: 'Virtuoso', desc: 'Bold, practical, creative.', link: 'https://www.16personalities.com/istp-personality' },
  { code: 'ISFP', name: 'Adventurer', desc: 'Flexible, charming, sensitive.', link: 'https://www.16personalities.com/isfp-personality' },
  { code: 'ESTP', name: 'Entrepreneur', desc: 'Energetic, practical, risk-taker.', link: 'https://www.16personalities.com/estp-personality' },
  { code: 'ESFP', name: 'Entertainer', desc: 'Spontaneous, energetic.', link: 'https://www.16personalities.com/esfp-personality' }
];

// Re-defining the style object for the tile to be applied to the <a> tag
const tileStyle = {
    background: '#f6fbfe',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(60, 161, 250, 0.2)',
    minWidth: 200,
    maxWidth: 240,
    padding: '20px 16px',
    flex: '1 1 220px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    textDecoration: 'none', // Remove default link underline
    color: 'inherit', // Ensure text colors are inherited or set explicitly below
    display: 'block' // Make the anchor tag behave like the div it replaced
};

export default function Types() {
  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '25px',
      justifyContent: 'center'
    }}>
      {mbtiTypes.map(t => (
        // Changed outer element from <div> to <a>
        <a 
          key={t.code} 
          href={t.link} // Set the link here
          target="_blank" 
          rel="noopener noreferrer"
          style={tileStyle} // Apply the styles to the new <a> tag
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(60, 161, 250, 0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(60, 161, 250, 0.2)';
          }}
        >
          <div style={{ color: '#3ca1fa', fontWeight: 700, fontSize: 20 }}>{t.code}</div>
          <div 
            // This div now represents the name, and we apply its specific styling here
            style={{ color: '#234', margin: '8px 0 4px 0', fontWeight: 700, fontSize: 18 }}
          >
            {t.name}
          </div>
          <div style={{ fontSize: 14, color: '#244B63', lineHeight: 1.4 }}>{t.desc}</div>
        </a>
      ))}
    </div>
  );
}