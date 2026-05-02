import React, { useCallback } from "react";
import type { VideoMetaData } from "../../interfaces/VideoMetaData";
import VideoPlayerTimeline from "../VideoPlayerTimeline/VideoPlayerTimeline";
import useHlsSource from "../../hooks/useHlsSource";
import usePlayerStore from "../../store/player.store";

import "./VideoPlayer.css";

const VideoPlayer = ({
  hlsPlaylistUrl,
  videoLength,
  chapters,
}: VideoMetaData) => {
  const videoRef = useHlsSource(hlsPlaylistUrl);
  const { activeChapter } = usePlayerStore();

  return (
    <div className="video-player-container">
      <video ref={videoRef} controls={false} />
      <div className="controls">
        <VideoPlayerTimeline chapters={chapters} />
        <div style={{ height: "50px" }}>{/*play button placeholder*/}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
