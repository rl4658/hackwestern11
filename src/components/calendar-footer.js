import React from "react";
import Button from "./ui/button";
import "../css/calendar.css";

export function Footer() {
  const generateSchedule = () => {
    // Implement AI schedule generation logic
    console.log("Generating schedule...");
  };

  const clearSchedule = () => {
    // Implement schedule clearing logic
    console.log("Clearing schedule...");
  };

  const exportSchedule = () => {
    // Implement schedule export logic
    console.log("Exporting schedule...");
  };

  return (
    <footer>
      <Button onClick={generateSchedule}>Generate Schedule</Button>
      <Button onClick={clearSchedule} variant="outline">
        Clear Schedule
      </Button>
      <Button onClick={exportSchedule} variant="outline">
        Export
      </Button>
    </footer>
  );
}

export default Footer;
