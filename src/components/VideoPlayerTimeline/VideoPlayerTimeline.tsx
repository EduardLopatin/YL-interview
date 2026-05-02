import React from "react";
import VideoPlayerChapter from "../VideoPlayerChapter/VideoPlayerChapter";
import type { TimelineProps } from "../../interfaces/TimelineProps";

import "./VideoPlayerTimeline.css";

const VideoPlayerTimeline = ({ chapters }: TimelineProps) => {
  return (
    <div className="video-player-timeline">
      {chapters.map((chapter, index) => (
        <VideoPlayerChapter key={index} chapter={chapter} />
      ))}
    </div>
  );
};

export default VideoPlayerTimeline;
