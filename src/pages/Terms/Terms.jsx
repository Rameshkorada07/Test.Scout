import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Terms.css"
import Footer from "../../components/Footer/Footer"

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "1",
      title: "Purpose of the Waitlist",
      content: "The waitlist is intended to provide early access updates, product announcements, and invitations related to the development and launch of Scout. Joining the waitlist does not guarantee access to the product, early access, or any specific features."
    },
    {
      id: "2",
      title: "No Obligation or Payment",
      content: "Joining the waitlist is free and does not require any payment. You are under no obligation to purchase any product or service in the future."
    },
    {
      id: "3",
      title: "Information Collected",
      content: "When you join the waitlist, we may collect limited personal information such as your name and email address. This information will only be used for communication related to Scout, including updates, launch notifications, and relevant product information."
    },
    {
      id: "4",
      title: "Communication",
      content: "By joining the waitlist, you consent to receive emails from ExploreNomad related to Scout. You may unsubscribe at any time by using the unsubscribe link in our emails."
    },
    {
      id: "5",
      title: "No Professional Advice",
      content: "Content, tools, or information shared with waitlist members are for general informational purposes only. They do not constitute legal, financial, medical, or professional advice. Users are responsible for making their own decisions."
    },
    {
      id: "6",
      title: "Product Development Changes",
      content: "Scout is an evolving product. Features, timelines, availability, and functionality may change, be delayed, or be discontinued at any time without prior notice."
    },
    {
      id: "7",
      title: "Intellectual Property",
      content: "All content, branding, concepts, and materials related to Scout and ExploreNomad remain the intellectual property of ExploreNomad. You may not copy, reproduce, or distribute any materials without prior written permission."
    },
    {
      id: "8",
      title: "Limitation of Liability",
      content: "ExploreNomad shall not be liable for any loss, damage, or inconvenience arising from participation in the waitlist or reliance on information shared with waitlist members."
    },
    {
      id: "9",
      title: "Termination",
      content: "We reserve the right to remove any individual from the waitlist at our discretion, including for misuse, abuse, or violation of these terms."
    },
    {
      id: "10",
      title: "Changes to These Terms",
      content: "These Terms and Conditions may be updated from time to time. Continued participation in the waitlist constitutes acceptance of any changes."
    },
    {
      id: "11",
      title: "Contact",
      content: "If you have any questions regarding these Terms and Conditions, please contact us at: hello@explorenomad.com"
    }
  ];

  return (
    <div>
    <div className="terms-page">
    <header className="terms-header">
    <span className="terms-logo" onClick={() => navigate('/')}>SCOUT.</span>
    {/* Title moved out of here */}
    <button className="terms-menu-btn" onClick={() => navigate('/menu')}>MENU</button>
  </header>

  <main className="terms-container">
    <div className="terms-title-block">
      {/* Title moved here */}
      <h1 className="terms-main-title">SCOUT TERMS AND CONDITIONS</h1>
      <p className="terms-intro-text">
        By joining the waitlist for Scout, operated by ExploreNomad, you agree to the following terms and conditions.
      </p>
    </div>

        <div className="terms-content-list">
          {sections.map((section) => (
            <section key={section.id} className="terms-section">
              <h2 className="terms-section-title">
                {section.id}. {section.title}
              </h2>
              <p className="terms-section-body">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
    <Footer/>
    </div>
  );
};

export default Terms;