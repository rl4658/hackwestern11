import React from "react";
import { Button } from "@mui/material";
import { Apple, Smartphone, Laptop } from 'lucide-react';

import "../css/downloadOptions.css";  // Import the CSS file

const downloadOptions = [
  { icon: Apple, text: "iOS App" },
  { icon: Smartphone, text: "Android App" },
  { icon: Laptop, text: "Desktop App" },
];

export function DownloadOptions() {
  return (
    <section className="download-options-section py-20">
      <div className="download-options-container container mx-auto px-4">
        <h2 className="download-options-title text-3xl font-bold text-center mb-12">Download Our App</h2>
        <div className="download-options-grid flex flex-wrap justify-center gap-4">
          {downloadOptions.map((option, index) => (
            <Button key={index} size="large" variant="contained" className="download-option-button flex items-center">
              <option.icon className="download-option-icon w-5 h-5 mr-2" />
              {option.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DownloadOptions;
