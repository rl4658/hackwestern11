import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { GraduationCap, Briefcase } from "lucide-react";

import "../css/individualSolutions.css";  // Import the CSS file

const individualSolutions = [
  { icon: GraduationCap, title: "Students", description: "Keep track of classes, assignments, and study sessions with our customizable calendar." },
  { icon: Briefcase, title: "Freelancers", description: "Manage client meetings, project deadlines, and personal tasks all in one place." },
];

export function IndividualSolutions() {
  return (
    <section className="individual-solutions-section py-20 bg-gray-50">
      <div className="individual-solutions-container container mx-auto px-4">
        <h2 className="individual-solutions-title text-3xl font-bold text-center mb-12">Individual Solutions</h2>
        <div className="individual-solutions-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {individualSolutions.map((solution, index) => (
            <Card key={index} className="individual-solution-card feature-card" variant="outlined">
              <CardHeader
                avatar={
                  <solution.icon className="individual-solution-card-icon feature-card-icon w-10 h-10 mb-2 text-primary" />
                }
                title={
                  <Typography className="individual-solution-card-title feature-card-title">
                    {solution.title}
                  </Typography>
                }
                className="individual-solution-card-header feature-card-header"
              />
              <CardContent className="individual-solution-card-content feature-card-content">
                <Typography className="individual-solution-card-description feature-card-description">
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

export default IndividualSolutions;