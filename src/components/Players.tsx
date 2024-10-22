// import PdfPlayer from "@/components/PdfPlayer";
import dynamic from "next/dynamic";
import React from "react";

const SunbirdPdfPlayer = dynamic(
  () => import("@/components/SunbirdPdfPlayer"),
  {
    ssr: false,
  }
);

interface playerProps {
  playerConfig: any;
}
const players = ({ playerConfig }: playerProps) => {
  return <SunbirdPdfPlayer playerConfig={playerConfig} />;
};

export default players;
