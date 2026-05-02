import React from "react";
import "./VideoPlayerThumb.css";

const VideoPlayerThumb = ({ classNames }: { classNames?: string }) => {
  return <div className={`video-player-thumb ${classNames}`}></div>;
};

export default VideoPlayerThumb;
