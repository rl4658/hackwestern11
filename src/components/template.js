import React from 'react';
import '../css/templates-integrations.css'; // Importing the CSS

const templates = ["Project Timeline", "Meeting Planner", "Goal Tracker", "Habit Builder"];
const integrations = ["Google Workspace", "Slack", "Trello", "Zoom"];

const TemplatesIntegrations = () => {
  return (
    <section className="templates-section">
      <div className="container">
        <h2 className="templates-title">Uses & Integrations</h2>
        <div className="templates-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Use Purpose</h3>
            </div>
            <div className="card-content">
              <ul className="list">
                {templates.map((template, index) => (
                  <li key={index} className="list-item">{template}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Popular Integrations</h3>
            </div>
            <div className="card-content">
              <ul className="list">
                {integrations.map((integration, index) => (
                  <li key={index} className="list-item">{integration}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TemplatesIntegrations;
