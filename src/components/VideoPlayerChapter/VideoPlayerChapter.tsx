import React, { useMemo } from "react";
import type { ChapterProps } from "../../interfaces/ChapterProps";
import VideoPlayerThumb from "../VideoPlayerThumb/VideoPlayerThumb";

import "./VideoPlayerChapter.css";
import { useChapterProgress } from "../../hooks/useChapterProgress";
import usePlayerStore from "../../store/player.store";
import {
  calculateTimeFromClick,
  convertSecondsToTime,
} from "../../utils/player.utils";

const VideoPlayerChapter = ({ chapter, currentTime, active }: ChapterProps) => {
  const [tooltipTime, setTooltipTime] = React.useState<number | null>(null);
  const chapterProgress: number = useChapterProgress(chapter, currentTime);
  const seek = usePlayerStore((state) => state.seek);

  const formatedTooltipTime = useMemo(() => {
    return tooltipTime !== null ? convertSecondsToTime(tooltipTime) : null;
  }, [tooltipTime]);

  const handleCurrentTimeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const time: number = calculateTimeFromClick(e, chapter);
    seek(time);
  };

  const handleTooltipTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const time: number = calculateTimeFromClick(e, chapter);
    setTooltipTime(Math.ceil(time));
  };

  return (
    <div
      className="video-player-chapter"
      onClick={handleCurrentTimeChange}
      onMouseMove={handleTooltipTime}
    >
      {chapterProgress > 0 && (
        <div className="seen" style={{ width: `${chapterProgress}%` }}></div>
      )}
      {active && <VideoPlayerThumb />}

      <div className="tooltip">
        {chapter.title}
        <br />
        {formatedTooltipTime}
      </div>
    </div>
  );
};

export default VideoPlayerChapter;
