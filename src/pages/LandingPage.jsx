import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- NEW COLOR PALETTE CONSTANTS ---
const PRIMARY_COLOR = "#008080"; // Teal
const DARK_ACCENT = "#004d4d"; // Dark Teal for headers
const TEXT_COLOR = "#263238"; // Deep Gray/Blue
const LIGHT_BG = "#f0f8f8"; // Soft Mint/Gray Background
const CARD_BG_LIGHT = "#ffffff";
const CARD_BG_ALTERNATE = "#e6f2f2"; // Very light teal

// --- FONT FAMILY CONSTANTS ---
const HEADING_FONT = "'Playfair Display', serif"; // For elegant headings
const BODY_FONT = "'Lato', sans-serif";           // For clean body text

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.55 }
  }),
};

// --- DATA (Skipping for brevity, content is unchanged) ---
const infoTiles = [
  {
    title: "1. What is MBTI?",
    icon: "🧑‍🔬",
    desc: (
      <>
        <p>
          MBTI, or the <strong>Myers-Briggs Type Indicator</strong>, is a self-report questionnaire that categorizes individuals into one of 16 personality types based on their preferences in four dichotomies: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving. Created by Isabel Myers and her mother Katharine Briggs from Carl Jung's theories, the MBTI is designed to provide insights into personality, strengths, and potential career paths.
        </p>
        <p>
          Its purpose is to help people understand themselves and their interactions with others. It's a widely used tool for <strong>personal development</strong> and for identifying career paths that align with one's innate personality.
        </p>
      </>
    ),
  },
  {
    title: "2. History of the MBTI",
    icon: "📚",
    desc: (
      <>
        <p>
          The MBTI was created by <strong>Isabel Briggs Myers</strong> and her mother, <strong>Katharine Cook Briggs</strong>, during World War II, inspired by Carl Jung's theory of psychological types. Their goal was to help people understand their own preferences and find careers that suited them, particularly as women entered the workforce to support the war effort.
        </p>
        <p>
          The MBTI is based on Jung's theory that variations in human behavior stem from fundamental differences in how people prefer to engage their minds and the world. The goal was to make Jung's complex theory more accessible and help individuals understand their <strong>"preferences"</strong> to improve career satisfaction and relationships.
        </p>
      </>
    ),
  },
  {
    title: "3. How does the MBTI Assessment Work?",
    icon: "🧮",
    desc: (
      <>
        <p>
          The MBTI questionnaire consists of statements rated on a Likert scale (typically from 1 to 5). Each question is tied to one of the four dimensions:
        </p>
        <ul>
          <li><strong>Extraversion (E) vs. Introversion (I):</strong> Outward energy vs. inner thoughts.</li>
          <li><strong>Sensing (S) vs. Intuition (N):</strong> Concrete facts vs. possibilities.</li>
          <li><strong>Thinking (T) vs. Feeling (F):</strong> Logic vs. values.</li>
          <li><strong>Judging (J) vs. Perceiving (P):</strong> Planned structure vs. flexibility.</li>
        </ul>
        <p>
          Each response adds points toward one side of a dichotomy. At the end, the higher score determines your preference for that pair, resulting in your unique four-letter type.
        </p>
      </>
    ),
  },
];

const mbtiTypes = [
  { code: "INTJ", name: "Architect", desc: "Strategic, logical, imaginative thinkers." },
  { code: "INTP", name: "Logician", desc: "Analytical and abstract inventors." },
  { code: "ENTJ", name: "Commander", desc: "Bold, imaginative leaders." },
  { code: "ENTP", name: "Debater", desc: "Curious, agile thinkers." },
  { code: "INFJ", name: "Advocate", desc: "Insightful, idealistic advisors." },
  { code: "INFP", name: "Mediator", desc: "Empathetic, creative, values-driven." },
  { code: "ENFJ", name: "Protagonist", desc: "Charismatic, inspiring, collaborative." },
  { code: "ENFP", name: "Campaigner", desc: "Enthusiastic and sociable free spirits." },
  { code: "ISTJ", name: "Logistician", desc: "Practical, fact-minded, reliable." },
  { code: "ISFJ", name: "Defender", desc: "Protective, warm, meticulous." },
  { code: "ESTJ", name: "Executive", desc: "Decisive, orderly, traditional leaders." },
  { code: "ESFJ", name: "Consul", desc: "Supportive, outgoing, attentive." },
  { code: "ISTP", name: "Virtuoso", desc: "Bold, practical, creative." },
  { code: "ISFP", name: "Adventurer", desc: "Flexible, charming, artistic." },
  { code: "ESTP", name: "Entrepreneur", desc: "Energetic, direct, perceptive." },
  { code: "ESFP", name: "Entertainer", desc: "Enthusiastic, fun-loving, spontaneous." }
];

const testimonials = [
  {
    quote: "The personalized analysis helped me greatly with career direction. It's a key tool for professional growth in India's competitive landscape.",
    author: "Rohan Sharma, Bangalore-based Product Manager",
    icon: "💬"
  },
  {
    quote: "I finally understand the underlying motivations behind my decision-making process. A truly revealing and accurate assessment.",
    author: "Priya Rao, Mumbai-based Startup Founder",
    icon: "🧠"
  }
];

const keyFeatures = [
  {
    title: "4. Validated Method",
    icon: "✅",
    desc: "Based on decades of continuous research in psychological types and Jungian theory."
  },
  {
    title: "Detailed Report",
    icon: "📄",
    desc: "Receive a comprehensive, personalized 10-page analysis of your unique type preferences."
  },
  {
    title: "Confidential Results",
    icon: "🔒",
    desc: "Your assessment data and results are kept private and secure."
  }
];

// --- COMPONENT START ---
export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: "ease-in-out"
    });
    document.body.style.backgroundColor = LIGHT_BG;
    // Set a default body font for general consistency
    document.body.style.fontFamily = BODY_FONT; 
  }, []);

  const cardHoverStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };
  
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = `0 8px 25px ${PRIMARY_COLOR}33`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = e.currentTarget.classList.contains('mbti-type-card') 
      ? '0 2px 8px rgba(0,0,0,0.05)' 
      : `0 3px 16px ${PRIMARY_COLOR}22`;
  };

  return (
    <div>
      {/* 🌟 HERO/Intro Section 🌟 */}
      <Container 
        fluid 
        className="py-5 d-flex justify-content-center" 
        data-aos="fade-up"
        style={{
          background: `linear-gradient(135deg, ${CARD_BG_ALTERNATE} 0%, #ffffff 100%)`, 
          borderBottom: `4px solid ${PRIMARY_COLOR}`,
          paddingTop: '8rem', 
          paddingBottom: '8rem'
        }}
      >
        <div className="section-box text-center" style={{ maxWidth: 900 }}>
          <h1 
            style={{ 
              fontSize: '3.5rem', 
              marginBottom: '0.5rem', 
              color: TEXT_COLOR, 
              fontFamily: HEADING_FONT
            }}
          >
            Unlocking Potential through <strong>Personalised Insights</strong>
          </h1>
          <h4 className="mb-4 text-muted" style={{ fontWeight: 400, color: '#5a7896', fontFamily: BODY_FONT }}>
            Discover the scientific framework for understanding your personality preferences and innate strengths.
          </h4>
        </div>
      </Container>

      {/* 📚 INFO TILES Section (1, 2, 3) - REVERTED TO STANDARD GRID */}
      <Container className="my-5 pt-4" style={{maxWidth:1100}}> {/* Reverted to max-width container */}
        <h2 className="text-center mb-5" style={{color: DARK_ACCENT, fontWeight: 700, fontFamily: HEADING_FONT}}>Understanding the MBTI Framework</h2>
        
        {/* REVERTED: Removed horizontal scroll styles. Using standard Row/Col. */}
        <Row className="g-5 d-flex align-items-stretch justify-content-center"> 
          {infoTiles.map((t, i) => (
            <Col md={4} key={i}> {/* Reverted to Col md=4 for three tiles per row */}
              <motion.div 
                custom={i} 
                initial="hidden" 
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once:true }}
                className="h-100"
              >
                <Card 
                  className="mbti-tile-card text-center p-3 h-100"
                  style={{
                    ...cardHoverStyle,
                    borderRadius:"15px",
                    border:"none",
                    background: CARD_BG_LIGHT,
                    boxShadow:`0 3px 16px ${PRIMARY_COLOR}15`,
                    minHeight:380,
                    display:"flex", 
                    flexDirection:"column", 
                    justifyContent:"flex-start"
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={{fontSize:38, margin:"4px 0", color: PRIMARY_COLOR}}>{t.icon}</div>
                  <Card.Body style={{ flexGrow: 1 }}>
                    <Card.Title style={{fontSize:22, fontWeight:700, color:DARK_ACCENT, marginBottom:'10px', fontFamily: HEADING_FONT}}>
                      {t.title}
                    </Card.Title>
                    <Card.Text style={{fontSize:15, color:TEXT_COLOR, fontFamily: BODY_FONT}}>
                        {t.desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ✅ Key Features Section - Standard Grid Layout Retained */}
      <Container className="py-5" style={{maxWidth:1100}}>
        <h2 className="text-center mb-5" style={{color: DARK_ACCENT, fontWeight: 700, fontFamily: HEADING_FONT}}>4. Why Choose Our Assessment?</h2>
        <Row className="g-4 justify-content-center d-flex align-items-stretch">
          {keyFeatures.map((f, i) => (
            <Col md={4} key={i}>
              <motion.div 
                custom={i} 
                initial="hidden" 
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once:true }}
                className="h-100"
              >
                <Card className="text-center p-4 h-100" style={{
                  borderRadius:"15px",
                  border:`1px solid ${CARD_BG_ALTERNATE}`,
                  background:CARD_BG_LIGHT,
                  boxShadow:"0 5px 20px rgba(0, 0, 0, 0.05)",
                  minHeight:220,
                }}>
                  <div style={{fontSize:38, margin:"0 auto 10px", color: PRIMARY_COLOR}}>{f.icon}</div>
                  <Card.Body className="p-0">
                    <Card.Title style={{fontSize:20, fontWeight:600, color:TEXT_COLOR, marginBottom:'8px', fontFamily: HEADING_FONT}}>
                      {i === 0 ? f.title.substring(3) : f.title}
                    </Card.Title>
                    <Card.Text style={{fontSize:15, color:'#4a6b8e', fontFamily: BODY_FONT}}>{f.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      
      
      {/* --- Section Divider --- */}
      <div style={{ height: 1, backgroundColor: '#c0d0d0', maxWidth: 1000, margin: '40px auto' }} />

      {/* 🧩 MBTI Types Grid (Section 6) - REVERTED TO STANDARD GRID */}
      <Container className="py-5" data-aos="fade-up" style={{maxWidth:1100}}> {/* Reverted to max-width container */}
        <h2 className="text-center mb-5" style={{fontWeight: 700, color: DARK_ACCENT, fontFamily: HEADING_FONT}}>5. The 16 Archetypes of Personality</h2>
        
        {/* REVERTED: Removed horizontal scroll styles. Using standard Row/Col. */}
        <Row className="g-4 d-flex align-items-stretch justify-content-center">
          {mbtiTypes.map((t,i) => (
            <Col sm={12} md={6} lg={3} key={t.code}> {/* Reverted to standard responsive columns */}
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true, amount: 0.1 }}
                className="h-100"
              >
                <Card 
                  className="mbti-type-card text-center p-3 h-100" 
                  style={{
                    background: i % 2 === 0 ? CARD_BG_ALTERNATE : CARD_BG_LIGHT, 
                    border:`1px solid ${CARD_BG_ALTERNATE}`, 
                    borderRadius:14,
                    boxShadow:'0 2px 8px rgba(0,0,0,0.05)', 
                    ...cardHoverStyle,
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Card.Body>
                    <Card.Title style={{
                      color:PRIMARY_COLOR,
                      fontWeight:700,
                      letterSpacing:'3px', 
                      fontSize:"1.6em", 
                      marginBottom: '4px',
                      fontFamily: HEADING_FONT
                    }}>{t.code}</Card.Title>
                    <Card.Subtitle style={{
                      color:DARK_ACCENT, 
                      fontWeight:600,
                      marginBottom: '8px', 
                      fontSize: '1.1em',
                      fontFamily: HEADING_FONT
                    }} className="mb-2">{t.name}</Card.Subtitle>
                    <Card.Text style={{fontSize:14, color:TEXT_COLOR, fontFamily: BODY_FONT}}>{t.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
       
      {/* --- Section Divider --- */}
      <div style={{ height: 1, backgroundColor: '#c0d0d0', maxWidth: 1000, margin: '40px auto' }} />
      {/* 🎯 Call to Action (Section 7) 🎯 */}
      <Container className="py-5" data-aos="zoom-in">
        <div 
          className="section-box text-center p-5 mx-auto" 
          style={{
            maxWidth: 700,
            background: CARD_BG_LIGHT, 
            borderRadius: "20px",
            boxShadow: `0 10px 30px ${PRIMARY_COLOR}15`, 
            border: `1px solid ${CARD_BG_ALTERNATE}` 
          }}
        >
          <h3 style={{ color: PRIMARY_COLOR, fontSize: '2rem', fontFamily: HEADING_FONT }}>Ready to Take the Next Step?</h3>
          <p className="small-muted mb-4" style={{fontSize: '1.1rem', color: '#5a7896', fontFamily: BODY_FONT}}>
            Start your brief assessment and receive your <strong>confidential report</strong> instantly.
          </p>
          <Button
            style={{ 
              background: PRIMARY_COLOR, 
              border: "none", 
              padding: "15px 40px", 
              fontSize: "1.3rem",
              fontWeight: 600,
              fontFamily: BODY_FONT
            }}
            size="lg"
            onClick={() => navigate("/patient")}
          >
            Access Assessment Now
          </Button>
        </div>
      </Container>

      {/* Footer */}
      <footer style={{ background: CARD_BG_ALTERNATE, padding: 18, marginTop: 40, color: DARK_ACCENT, textAlign: "center", fontSize: '0.9rem', fontFamily: BODY_FONT }}>
        © {new Date().getFullYear()} MBTI Assessment — Designed for <strong>Self-Awareness and Development</strong> only.
      </footer>
    </div>
  );
}