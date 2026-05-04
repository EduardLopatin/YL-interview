import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { VideoPlayerTimeline, VideoPlayerControls } from "../index";
import type VideoPlayerProps from "../../interfaces/VideoPlayerProps";
import usePlayerStore from "../../store/player.store";

import "./VideoPlayer.css";

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
      <div className="panel">
        <VideoPlayerTimeline chapters={data?.chapters || null} />
        <VideoPlayerControls />
      </div>
    </div>
  );
};

export default VideoPlayer;
