import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Users, Briefcase, Megaphone } from 'lucide-react';

import "../css/teamSolutions.css";  // Import the CSS file

const teamSolutions = [
  { icon: Users, title: "Product Management", description: "Streamline your product roadmap and sprint planning with our collaborative calendar." },
  { icon: Megaphone, title: "Marketing", description: "Plan and execute marketing campaigns with ease using our intuitive calendar features." },
  { icon: Briefcase, title: "Human Resources", description: "Manage employee schedules, time off, and company events all in one place." },
];

export function TeamSolutions() {
  return (
    <section className="team-solutions-section py-20">
      <div className="team-solutions-container container mx-auto px-4">
        <h2 className="team-solutions-title text-3xl font-bold text-center mb-12">Team Solutions</h2>
        <div className="team-solutions-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamSolutions.map((solution, index) => (
            <Card key={index} className="team-solution-card feature-card" variant="outlined">
              <CardHeader
                avatar={
                  <solution.icon className="team-solution-card-icon feature-card-icon w-10 h-10 mb-2 text-primary" />
                }
                title={
                  <Typography className="team-solution-card-title feature-card-title">
                    {solution.title}
                  </Typography>
                }
                className="team-solution-card-header feature-card-header"
              />
              <CardContent className="team-solution-card-content feature-card-content">
                <Typography className="team-solution-card-description feature-card-description">
                  {solution.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSolutions;
