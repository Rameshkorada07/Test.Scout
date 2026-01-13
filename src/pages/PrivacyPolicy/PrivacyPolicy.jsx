import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PrivacyPolicy.css";
import Footer from "../../components/Footer/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "1",
      title: "Who we are",
      content: "ExploreNomad is building tools to help digital nomads and aspiring digital nomads gain clarity and reduce information overload."
    },
    {
      id: "2",
      title: "What information we collect",
      content: "When you join the ExploreNomad waitlist, we may collect:\n• Your email address\n• Optional information you choose to share (for example, interests or stage of your journey)\n\nWe do not collect:\n• payment information\n• sensitive personal data\n• location tracking data"
    },
    {
      id: "3",
      title: "Why we collect this information",
      content: "We collect your information only to:\n• Notify you about product updates, early access, or launch announcements\n• Understand general interest in ExploreNomad features\n• Improve what we are building\n\nWe do not sell your data.\nWe do not rent your data.\nWe do not use your data for advertising networks."
    },
    {
      id: "4",
      title: "How we store and protect your data",
      content: "• Your data is stored securely using reputable third-party tools (such as email or form services)\n• We take reasonable steps to protect your information from unauthorized access\n• Access to waitlist data is limited to the ExploreNomad team"
    },
    {
      id: "5",
      title: "How long we keep your data",
      content: "We keep your information only as long as it is needed to:\n• operate the waitlist\n• communicate about ExploreNomad\n\nYou can ask us to remove your data at any time."
    },
    {
      id: "6",
      title: "Sharing your information",
      content: "We do not share your personal information with third parties, except:\n• service providers that help us run the waitlist (for example, email tools)\n• if required by law\n\nThose providers are only allowed to use your data to perform their services."
    },
    {
      id: "7",
      title: "Your rights",
      content: "Depending on your location (including the UK and EU), you have the right to:\n• access the data we hold about you\n• request correction or deletion of your data\n• withdraw consent at any time\n\nYou can exercise these rights by contacting us."
    },
    {
      id: "8",
      title: "Emails and communication",
      content: "If you join our waitlist, you may receive emails about:\n• early access\n• product updates\n• launch announcements\n\nYou can unsubscribe at any time using the link in our emails."
    },
    {
      id: "9",
      title: "Changes to this policy",
      content: "We may update this privacy policy as ExploreNomad evolves. If changes are significant, we will update the date at the top of this page."
    },
    {
      id: "10",
      title: "Contact us",
      content: "If you have questions about this privacy policy or your data, contact us at: hello@explorenomad.com\nCompany: ExploreNomad"
    }
  ];

  return (
    <div>
      <div className="policy-page">
      <header className="policy-header">
    <span className="policy-logo" onClick={() => navigate('/')}>SCOUT.</span>
    {/* Title moved out of here */}
    <button className="policy-menu-btn" onClick={() => navigate('/menu')}>MENU</button>
  </header>

  <main className="policy-container">
    <div className="policy-title-block">
      {/* Title moved here */}
      <h1 className="policy-main-title">SCOUT PRIVACY POLICY</h1>
      <p className="policy-intro-text">
        This privacy policy explains how we collect and use information when you join our waitlist.
      </p>
    </div>

          <div className="policy-content-list">
            {sections.map((section) => (
              <section key={section.id} className="policy-section">
                <h2 className="policy-section-title">
                  {section.id}. {section.title}
                </h2>
                <div className="policy-section-body">
                  {section.content.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;