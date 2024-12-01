import React from "react";
import Button from "./ui/button"; // Fixed Button import path
import { Avatar } from "./ui/avatar"; // Fixed Avatar import path
import { FolderSync } from "lucide-react"; // Ensure lucide-react is installed
import { format } from "date-fns"; // Import date-fns for formatting
import "../../css/calendar.css";

export default function Header() {
  // Get current date
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM d, yyyy").toUpperCase(); // Format: Day, Month Date, Year

  return (
    <header className="header-container">
      <h1 className="header-title">{formattedDate}</h1> {/* Display formatted date */}
      <div className="header-actions">
        <Button variant="outline" size="icon">
          <FolderSync className="header-icon" />
        </Button>
      </div>
    </header>
  );
}
