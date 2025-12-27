import React from 'react';
import './Visionarium.css';
import Featured from '../components/Featured';

// You can find and place your icon images in the `public/images` folder.
const techIcons = [
  { name: 'React', src: '/images/react-icon.svg' },
  { name: 'JavaScript', src: '/images/javascript-icon.svg' },
  { name: 'Node.js', src: '/images/nodedotjs-icon.svg' },
  { name: 'Python', src: '/images/python-icon.svg' },
  { name: 'TensorFlow', src: '/images/tensorflow-icon.svg' },
  { name: 'MongoDB', src: '/images/mongodb-icon.svg' },
];

const Visionarium = () => {
  return (
    <div className="visionarium-wrapper">
      <header className="visionarium-header animate-fade-in-down">
        <h1 className="visionarium-title">Our Work</h1>
        <p className="visionarium-subtitle">A glimpse into our world of innovation and creation.</p>
      </header>

      <main className="visionarium-horizontal-container">
        <div className="project-showcase-card animate-fade-in-up">
          <div className="project-image-container">
            <img src="/images/baldsphere.png" alt="Baldsphere" className="project-image" />
          </div>
          <div className="project-content">
            <h2 className="project-title">Baldsphere</h2>
            <p className="project-description">An AI-powered chat platform for seamless communication and collaboration.</p>
            <div className="project-tags">
              <span className="project-tag">AI</span>
              <span className="project-tag">Web App</span>
              <span className="project-tag">React</span>
            </div>
            <a href="https://baldsphere.vercel.app/home" className="project-link" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>

        <div className="project-showcase-card animate-fade-in-up animation-delay-200">
          <div className="project-image-container">
            <img src="/images/baldgame.png" alt="Brain Game" className="project-image" />
          </div>
          <div className="project-content">
            <h2 className="project-title">Brain Game</h2>
            <p className="project-description">A neuroscience-based game designed to challenge and improve cognitive functions.</p>
            <div className="project-tags">
              <span className="project-tag">Game</span>
              <span className="project-tag">Neuroscience</span>
              <span className="project-tag">Unity</span>
            </div>
            <a href="https://baldgame-alpha.vercel.app/" className="project-link" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
      </main>

      <section className="tech-stack-section animate-fade-in-up animation-delay-400">
        <h2 className="tech-stack-title">Our Technology Stack</h2>
        <div className="tech-icons-container">
          {techIcons.map((tech, index) => (
            <div key={index} className="tech-icon-wrapper">
              <img src={tech.src} alt={tech.name} className="tech-icon" />
              <span className="tech-icon-tooltip">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="philosophy-section animate-fade-in-up animation-delay-400">
        <h2 className="philosophy-title">Our Philosophy</h2>
        <p className="philosophy-text">
          We believe in the power of technology to extend the boundaries of human potential. Our work is driven by a passion for discovery, a commitment to ethical innovation, and the pursuit of creating tools that empower and inspire.
        </p>
      </section>

      <section className="visionarium-featured-wrapper">
        <Featured />
      </section>
    </div>
  );
};

export default Visionarium;
