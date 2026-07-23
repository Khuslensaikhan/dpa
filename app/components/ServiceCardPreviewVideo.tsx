"use client";

import { useEffect, useRef, useState } from "react";

export function ServiceCardPreviewVideo({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !hasLoaded || !isPreviewing) {
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {
      // Keep the static poster visible if the browser cannot start playback.
    });
  }, [hasLoaded, isPreviewing]);

  const startPreview = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    setHasLoaded(true);
    setIsPreviewing(true);
  };

  const stopPreview = () => {
    setIsPreviewing(false);

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    if (video.readyState > 0) {
      video.currentTime = 0;
    }
  };

  return (
    <div
      className="service-card-video-trigger"
      onPointerEnter={startPreview}
      onPointerLeave={stopPreview}
    >
      <video
        ref={videoRef}
        className="service-card-video"
        src={hasLoaded ? videoSrc : undefined}
        muted
        loop
        playsInline
        preload="none"
        data-ready={isReady}
        onCanPlay={() => setIsReady(true)}
        aria-hidden="true"
      />
    </div>
  );
}
