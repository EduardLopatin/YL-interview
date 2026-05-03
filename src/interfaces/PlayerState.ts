import type Hls from "hls.js";
import type { Chapter, VideoMetaData } from "./VideoMetaData";

export interface PlayerState {
  isPlaying: boolean;
  chapters: Array<Chapter> | null;
  currentChapter: number | null;
  currentTime: number;
  duration: number;

  videoElement: HTMLVideoElement | null;
  hlsInstance: Hls | null;

  setCurrentTime: (time: number) => void;

  seek: (time: number) => void;
  play: () => void;
  pause: () => void;

  initState: (data: Pick<VideoMetaData, "videoLength" | "chapters">) => void;
  dropState: () => void;
}
