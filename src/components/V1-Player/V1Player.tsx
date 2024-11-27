import React, { useRef, useEffect } from 'react';

interface PlayerProps {
  playerConfig: any;
}

const V1Player = ({ playerConfig }: PlayerProps) => {
  const previewRef = useRef(null);

  useEffect(() => {
    const preview: any = previewRef.current;
    if (preview) {
      const originalSrc = preview.src;
      preview.src = '';
      preview.src = originalSrc;

      const handleLoad = () => {
        setTimeout(() => {
          if (preview.contentWindow && preview.contentWindow.initializePreview) {
            preview.contentWindow.initializePreview(playerConfig);
          }
          preview.contentWindow.addEventListener('message', (event: any) => { // NOSONAR
            console.log('V1 player event', event);
          });
        }, 100);
      };

      preview.addEventListener('load', handleLoad);

      return () => {
        preview.removeEventListener('load', handleLoad);
      };
    }
  }, [playerConfig]);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        ref={previewRef}
        id="contentPlayer"
        title="Content Player"
        src="/content/preview/preview.html?webview=true"
        aria-label="Content Player"
        style={{ width: '100%', height: '600px', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default V1Player;
