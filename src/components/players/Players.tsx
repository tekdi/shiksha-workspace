import dynamic from "next/dynamic";
import React from "react";

const SunbirdPdfPlayer = dynamic(
  () => import("@/components/SunbirdPdfPlayer"),
  {
    ssr: false,
  }
);

const SunbirdVideoPlayer = dynamic(
  () => import("@/components/SunbirdVideoPlayer"),
  {
    ssr: false,
  }
);

interface PlayerProps {
  playerConfig: any;
}

const Players = ({ playerConfig }: PlayerProps) => {
  const mimeType = playerConfig.metadata.mimeType;
  switch (mimeType) {
    case "application/pdf":
      return <SunbirdPdfPlayer playerConfig={playerConfig} />;
    case "video/mp4":
      return <SunbirdVideoPlayer playerConfig={playerConfig} />;
    default:
      return <div>Unsupported media type</div>;
  }
};

export default Players;
