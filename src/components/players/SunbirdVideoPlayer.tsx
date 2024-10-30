import { Height } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";

interface PlayerConfigProps {
  playerConfig: any;
}
const SunbirdVideoPlayer = ({ playerConfig }: PlayerConfigProps) => {
  const sunbirdVideoPlayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically load the Sunbird PDF Player script from CDN

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-video-player-web-component@1.2.5/sunbird-video-player.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-video-player-web-component@1.2.5/styles.css";
    document.head.appendChild(link);

    const playerElement = sunbirdVideoPlayerRef.current;

    const handlePlayerEvent = (event: any) => {
      console.log("Player Event", event.detail);
      if (event?.detail?.type === "EXIT") {
        const previousPage = sessionStorage.getItem("previousPage");
        if (previousPage) {
          window.location.href = previousPage;
        } else {
          window.history.go(-1);
        }
      }
    };

    const handleTelemetryEvent = (event: any) => {
      console.log("Telemetry Event", event.detail);
    };

    // Ensure the script ha s loaded before adding event listeners
    script.onload = () => {
      playerElement?.addEventListener("playerEvent", handlePlayerEvent);
      playerElement?.addEventListener("telemetryEvent", handleTelemetryEvent);
    };

    return () => {
      playerElement?.removeEventListener("playerEvent", handlePlayerEvent);
      playerElement?.removeEventListener(
        "telemetryEvent",
        handleTelemetryEvent
      );
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="player" style={{ height: "auto" }}>
      <sunbird-video-player
        player-config={JSON.stringify(playerConfig)}
        ref={sunbirdVideoPlayerRef}
      ></sunbird-video-player>
    </div>
  );
};

export default SunbirdVideoPlayer;
