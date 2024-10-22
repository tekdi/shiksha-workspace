interface Window {
  GA_INITIALIZED: boolean;
}

declare namespace JSX {
  interface IntrinsicElements {
    "sunbird-pdf-player": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      "player-config"?: string;
    };
  }
}
