"use client";
import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css"; // Import Quill.js styles
import Quill from "quill";
import "../../css/calendar.css"; // Ensure this file is updated with styles for the notes section

export function NoteSection() {
    const quillRef = useRef(null);

    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill("#editor-container", {
                theme: "snow",
                modules: {
                    toolbar: {
                        container: [
                            [{ font: [] }], // Font dropdown on a separate line
                            ["bold", "italic", "underline"], // Bold, Italic, Underline
                            [{ list: "ordered" }, { list: "bullet" }], // Ordered and Bullet list
                        ],
                    },
                },
            });
        }
    }, []);

    return (
        <div className="note-section">
            <h3 className="note-header">Notes</h3>
            <div id="toolbar" className="note-toolbar"></div>
            <div className="editor">
                <div id="editor-container" className="note-editor"></div>
            </div>
        </div>
    );
}

export default NoteSection;
