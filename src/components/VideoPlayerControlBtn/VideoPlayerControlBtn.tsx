import React from "react";

import "./VideoPlayerControlBtn.css";

const VideoPlayerControlBtn = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => {
  return (
    <button className="video-player-control-btn" onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default VideoPlayerControlBtn;
