import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function useHlsSource(
  hlsPlaylistUrl: string,
): React.RefObject<HTMLVideoElement | null> {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const hls: Hls = new Hls();
      hls.loadSource(hlsPlaylistUrl);
      hls.attachMedia(videoRef.current);
    }
  }, [hlsPlaylistUrl]);

  return videoRef;
}
