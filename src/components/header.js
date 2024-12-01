import React from "react";
import Button from "./ui/button"; // Fixed Button import path
import { Avatar } from "./ui/avatar"; // Fixed Avatar import path
import { FolderSync } from "lucide-react"; // Ensure lucide-react is installed
import "../css/calendar.css";

export default function Header() {
  // Changed to default export for easier imports
  return (
    <header className="header-container">
      <h1 className="header-title">AI Scheduler</h1>
      <div className="header-actions">
        <Button variant="outline" size="icon">
          <FolderSync className="header-icon" />
        </Button>
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
      </div>
    </header>
  );
}
