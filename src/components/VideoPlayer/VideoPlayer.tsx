import React, { useCallback, useEffect, useRef } from "react";
import type { VideoMetaData } from "../../interfaces/VideoMetaData";
import VideoPlayerTimeline from "../VideoPlayerTimeline/VideoPlayerTimeline";
import useHlsSource from "../../hooks/useHlsSource";
import usePlayerStore from "../../store/player.store";

import "./VideoPlayer.css";
import { useShallow } from "zustand/shallow";
import type VideoPlayerProps from "../../interfaces/VideoPlayerProps";

const VideoPlayer = ({ data }: VideoPlayerProps) => {
  const [setVideoElement, setCurrentTime, initState, dropState] =
    usePlayerStore(
      useShallow((state) => [
        state.setVideoElement,
        state.setCurrentTime,
        state.initState,
        state.dropState,
      ]),
    );

  useEffect(() => {
    dropState();
    initState({ videoLength: data.videoLength, chapters: data.chapters });
  }, [data, dropState, initState]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) =>
    setCurrentTime(e?.currentTarget?.currentTime);

  return (
    <div className="video-player-container">
      <div className="border-wrapper">
        <video
          ref={(el) => setVideoElement(el, data.hlsPlaylistUrl)}
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          autoPlay
          muted
        />
      </div>
      <div className="controls">
        <VideoPlayerTimeline chapters={data?.chapters || null} />
        <div style={{ height: "50px" }}>{/*play button placeholder*/}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
