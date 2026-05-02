import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const hls = new Hls();
      hls.loadSource(
        "https://vz-50e60d70-540.b-cdn.net/b87ac5f4-2cf0-42d1-acc8-32a89d3c71c7/playlist.m3u8",
      );
      hls.attachMedia(videoRef.current);
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
};

export default VideoPlayer;
