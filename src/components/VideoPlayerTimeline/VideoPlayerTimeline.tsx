import React from "react";
import VideoPlayerChapter from "../VideoPlayerChapter/VideoPlayerChapter";
import type { TimelineProps } from "../../interfaces/TimelineProps";
import usePlayerStore from "../../store/player.store";

import "./VideoPlayerTimeline.css";
import { useShallow } from "zustand/shallow";

const VideoPlayerTimeline = ({ chapters }: TimelineProps) => {
  const [currentChapter, currentTime] = usePlayerStore(
    useShallow((state) => [state.currentChapter, state.currentTime]),
  );

  return (
    <div className="video-player-timeline">
      {chapters &&
        chapters.map((chapter, index) => (
          <VideoPlayerChapter
            key={index}
            chapter={chapter}
            currentTime={currentTime}
            active={index === currentChapter}
          />
        ))}
    </div>
  );
};

export default VideoPlayerTimeline;
