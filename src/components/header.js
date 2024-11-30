import React from 'react';
import { Button, Avatar } from "@mui/material";
import { FolderSync } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">AI Scheduler</h1>
      <div className="flex items-center space-x-4">
        <Button variant="outlined" size="small">
          <FolderSync className="h-4 w-4" />
        </Button>
        <Avatar alt="@shadcn" src="https://github.com/shadcn.png" />
      </div>
    </header>
  );
}
