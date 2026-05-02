import React from "react";
import type { ChapterProps } from "../../interfaces/ChapterProps";
import VideoPlayerThumb from "../VideoPlayerThumb/VideoPlayerThumb";

import "./VideoPlayerChapter.css";

const VideoPlayerChapter = ({ chapter, active }: ChapterProps) => {
  return (
    <div className="video-player-chapter">
      <div className="seen"></div>
      {/*<VideoPlayerThumb />*/}
      <div className="unseen"></div>
      <div className="tooltip"></div>
    </div>
  );
};

export default VideoPlayerChapter;
