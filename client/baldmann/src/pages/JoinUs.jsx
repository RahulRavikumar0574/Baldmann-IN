import React from 'react';
import './JoinUs.css';
import Lottie from 'lottie-react';
import teamAnimation from './7Pv6j1Yppi.json';
import { 
  Cpu, 
  Laptop, 
  FlaskConical, 
  CircuitBoard, 
  Smartphone, 
  BarChart3, 
  PenTool, 
  Users 
} from 'lucide-react';

const JoinUs = () => {
  const teamRoles = [
  { title: "Machine Learning Specialist", icon: <Cpu size={28} /> },
  { title: "Web Developer", icon: <Laptop size={28} /> },
  { title: "RnD (Biotech & Biomedical)", icon: <FlaskConical size={28} /> },
  { title: "Electronics Engineer", icon: <CircuitBoard size={28} /> },
  { title: "PCB Designer", icon: <Smartphone size={28} /> },
  { title: "App Developer", icon: <BarChart3 size={28} /> },
  { title: "XR Developer", icon: <PenTool size={28} /> },
  { title: "Support Team", icon: <Users size={28} /> }
];


  return (
    <div className="team-page">
      <div className="diagonal-background"></div>

      <div className="content-container">
        <div className="content-grid">
          <div className="left-section">
            <div className="header-section">
              <h1 className="main-title">Join Us</h1>
              <div className="title-underline"></div>
            </div>

            <div className="welcome-section">
              <h2 className="section-title">Be a part of our team!</h2>
              <div className="roles-grid">
                {teamRoles.map((role, index) => (
                  <div
                    key={role.title}
                    className="role-card"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="role-content">
                      <div className="role-icon">{role.icon}</div>
                      <div>
                        <h3 className="role-title">{role.title}</h3>
                      </div>
                    </div>
                    <div className="role-hover-effect"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-section">
              <button className="cta-button">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfkinSIR9idu1jbroemkSrwHtfwW8iKTLeI7mtiOinlhgJosQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </a>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>

          {/* Right Content - Lottie Animation Space */}
          <div className="right-section">
            <div className="animation-container">
              <div className="placeholder-content">
                <div className="placeholder-icon-wrapper">
                  <div className="glow-effect"></div>
                  {/* <div className="placeholder-icon">👋</div> */}
                </div>
                <p className="placeholder-text">
                  <Lottie 
                        animationData={teamAnimation} 
                        loop={true} 
                    />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinUs;
