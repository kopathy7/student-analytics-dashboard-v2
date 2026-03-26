import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './InPageNav.css';

export default function InPageNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const handleScroll = () => {
      let current = activeSection;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <div className="inpage-nav-container">
      <div className="inpage-nav-scroll">
        {sections.map(section => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`inpage-link ${isActive ? 'active' : ''}`}
            >
              {section.icon}
              <span>{section.label}</span>
              {isActive && <motion.div layoutId="inpage-indicator" className="inpage-indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
