import "reflect-metadata";
import React, { useEffect } from "react";
// import { playerConfig } from "../libs/sunbird-pdf-player/pdf-player.js";
import "../libs/sunbird-pdf-player/pdf-player";
import { useRef } from "react";

interface PlayerConfigProps {
  playerConfig: any;
}

const SunbirdPdfPlayer = ({ playerConfig }: PlayerConfigProps) => {
  const sunbirdPdfPlayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const playerElement = sunbirdPdfPlayerRef.current;
    const handlePlayerEvent = (event: any) => {
      console.log("Player Event", event.detail);
    };
    const handleTelemetryEvent = (event: any) => {
      console.log("Telemetry Event", event.detail);
    };
    playerElement?.addEventListener("playerEvent", handlePlayerEvent);
    playerElement?.addEventListener("telemetryEvent", handleTelemetryEvent);

    return () => {
      playerElement?.removeEventListener("playerEvent", handlePlayerEvent);
      playerElement?.removeEventListener(
        "telemetryEvent",
        handleTelemetryEvent
      );
    };
  }, []);

  return (
    <div className="player-grid">
      <sunbird-pdf-player
        player-config={JSON.stringify(playerConfig)}
        ref={sunbirdPdfPlayerRef}
      ></sunbird-pdf-player>
    </div>
  );
};

export default SunbirdPdfPlayer;
