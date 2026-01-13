import React from "react";
import "./ValuesOfWaitlist.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ValuesOfWaitlist = () => {
  const navigate = useNavigate();

  return (
    <section className="values-section">
      {/* Top Left SCOUT */}
      <div className="top-left-brand">SCOUT</div>

      {/* Top Right Link */}
      <div className="top-right-link">
        <p>Product of <button onClick={() => navigate('/explore-nomad')}>Explore Nomad</button></p>
      </div>

      {/* Center Content */}
      <div className="values-content">
        <h3 className="values-subheading">Values Of Waitlist</h3>

        {/* Big Heading */}
        <div className="values-heading">
          <p>Early Member Access</p>
          <p>Unique Explorer Number</p>
          <p>Features Feedback</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container2">
          <span className="progress-value2">765</span>
          <div className="progress-bar2">
            <div className="progress-fill2" style={{ width: "76%" }}></div>
          </div>
          <span className="progress-value2">1000</span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/join-waitlist")}
          className="values-button"
        >
          <ArrowRight size={18} />
          Join waitlist
        </button>

        {/* Hashtag */}
        <p className="values-hashtag">#AntiChaosNomads</p>
      </div>
    </section>
  );
};

export default ValuesOfWaitlist;
