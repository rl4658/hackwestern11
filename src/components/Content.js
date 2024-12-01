import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Calendar, Tag, Bell, Zap } from "lucide-react";

import "../css/key1.css";  // Import the CSS file

const features = [
  { icon: Calendar, title: "Intuitive Calendar", description: "Easily view and manage your schedule with our user-friendly calendar interface." },
  { icon: Tag, title: "Custom Tags", description: "Organize your events with customizable tags for easy categorization and filtering." },
  { icon: Bell, title: "Smart Reminders", description: "Never miss an important event with our intelligent reminder system." },
  { icon: Zap, title: "Integrations", description: "Connect with your favorite tools and services for seamless productivity." },
];

const Content = () => {
  return (
    <div className="content-wrapper">
      {/* New Features Section */}
      <section className="key-features-section">
        <div className="content-container container mx-auto px-4">
          <h2 className="key-features-title">Key Features</h2>
          <div className="key-features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="key-feature-card feature-card" variant="outlined">
                <CardHeader
                  avatar={
                    <feature.icon className="key-feature-card-icon feature-card-icon" />
                  }
                  title={
                    <Typography className="key-feature-card-title feature-card-title">
                      {feature.title}
                    </Typography>
                  }
                  className="key-feature-card-header feature-card-header"
                />
                <CardContent className="key-feature-card-content feature-card-content">
                  <Typography className="key-feature-card-description feature-card-description">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
