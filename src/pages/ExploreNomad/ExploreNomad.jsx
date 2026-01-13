import React from "react";
import "./ExploreNomad.css";
import { ArrowRight } from "lucide-react"; // arrow icon
import { useNavigate } from "react-router-dom";

const ExploreNomad = () => {
  const navigate = useNavigate();
  return (
    <section className="explore-section">
      {/* Top Left SCOUT */}
      <div className="top-left-brand">SCOUT</div>

      {/* Top Right Link */}
      <div className="top-right-link">
        <a onClick={() => navigate('/values-of-waitlist')}>Values of waitlist</a>
      </div>

      {/* Center Content */}
      <div className="explore-content">
        <h3 className="explore-subheading">Product Of</h3>

        <div className="heading-container">
          <img src="/explore-nomad-img.png" alt="image" />
          <h1 className="explore-heading">Explore Nomad</h1>
        </div>
        

        <p className="explore-text">
          Scout exists because chaos has stolen too much from nomads. What
          should feel like freedom has been turned into noise — endless tabs,
          scattered tools, no clarity.
        </p>

        <p className="explore-text">
          This is our stand. It may not be perfect. It may only be a beginning.
          But beginnings are where movements are born.
        </p>

        <p className="explore-text">
          With your trust and your voice, Scout can grow into more than a
          product. It can become the calm that carries every journey forward.
          This is the Anti-Chaos Movement. And it starts with us — and you.
        </p>

        <p className="explore-text">
          And by joining the waitlist, you’re not just signing up. You’re
          helping create the calm every nomad deserves.
        </p>

        {/* Progress Bar */}
        <div className="progress-container">
          <span className="progress-value">765</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "76%" }}></div>
          </div>
          <span className="progress-value">1000</span>
        </div>

        {/* Join Button */}
        
          <button onClick={() => navigate('/join-waitlist')} className="explore-button">
          <ArrowRight size={18} />
          Join waitlist
        </button>
       
        

        {/* Hashtag */}
        <p className="explore-hashtag">#AntiChaosNomads</p>
      </div>
    </section>
  );
};

export default ExploreNomad;
