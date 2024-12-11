import "reflect-metadata";
import React, { useEffect } from "react";
import { useRef } from "react";
import { getTelemetryEvents, handleExitEvent } from "@/utils/Helper";

interface PlayerConfigProps {
  playerConfig: any;
}

const SunbirdEpubPlayer = ({ playerConfig }: PlayerConfigProps) => {
  const sunbirdEpubPlayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically load the Sunbird EPUB Player script and CSS from CDN
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-epub-player-web-component@1.4.0/sunbird-epub-player.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-epub-player-web-component@1.4.0/styles.css";
    link.className = "sunbird-epub-player-styles"; // Add a class for identification
    document.head.appendChild(link);

    const playerElement = sunbirdEpubPlayerRef.current;

    const handlePlayerEvent = (event: any) => {
      console.log("Player Event", event.detail);
      if (event?.detail?.edata?.type === "EXIT") {
        handleExitEvent();
      }
    };
    const handleTelemetryEvent = (event: any) => {
      console.log("Telemetry Event", event.detail);
      getTelemetryEvents(event.detail, "epub");
    };

    // Ensure the script has loaded before adding event listeners
    script.onload = () => {
      playerElement?.addEventListener("playerEvent", handlePlayerEvent);
      playerElement?.addEventListener("telemetryEvent", handleTelemetryEvent);
    };

    return () => {
      // Cleanup event listeners
      playerElement?.removeEventListener("playerEvent", handlePlayerEvent);
      playerElement?.removeEventListener(
        "telemetryEvent",
        handleTelemetryEvent
      );

      // Remove the script element
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }

      // Remove the stylesheet
      const styleLink = document.head.querySelector(
        ".sunbird-epub-player-styles"
      ) as HTMLLinkElement;
      if (styleLink) {
        document.head.removeChild(styleLink);
      }
    };
  }, []);

  return (
    <div className="player-grid">
      <sunbird-epub-player
        player-config={JSON.stringify(playerConfig)}
        ref={sunbirdEpubPlayerRef}
      ></sunbird-epub-player>
    </div>
  );
};

export default SunbirdEpubPlayer;
