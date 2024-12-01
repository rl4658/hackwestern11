import React, { useEffect } from "react";

export default function VoiceFlowChat() {
    useEffect(() => {
        // Dynamically load the VoiceFlow script
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
        script.onload = () => {
            if (window.voiceflow && window.voiceflow.chat) {
                window.voiceflow.chat.load({
                    verify: { projectID: "674b5a8d1f89e3926fa8530e" }, // Replace with your actual Project ID
                    url: "https://general-runtime.voiceflow.com/",
                    versionID: "production",
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script when the component unmounts
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="voiceflow-chat" style={{ height: "400px", width: "100%" }}>
            {/* This div is where the chat widget will appear */}
        </div>
    );
}
