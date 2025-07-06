import React from "react";
import "./IntroHeader.css";

interface IntroHeaderProps {
  title: React.ReactNode;
  tagline?: string;
  icon?: React.ReactNode;
  className?: string;
}

const IntroHeader: React.FC<IntroHeaderProps> = ({ 
  title, 
  tagline, 
  icon, 
  className = "" 
}) => {
  return (
    <section className={`intro-header ${className}`}>
      <div className="intro-bg" />
      <div className="intro-content">
        <h1>
          {icon && <span className="intro-icon">{icon}</span>}
          <span className="intro-title">{title}</span>
          {tagline && <span className="intro-tagline">{tagline}</span>}
        </h1>
      </div>
    </section>
  );
};

export default IntroHeader; 