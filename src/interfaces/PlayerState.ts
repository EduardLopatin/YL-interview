import type Hls from "hls.js";
import type { Chapter, VideoMetaData } from "./VideoMetaData";

export interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  chapters: Array<Chapter> | null;
  currentChapter: number | null;
  currentTime: number;
  duration: number;
  levels: Array<{ index: number; label: string }>;
  currentLevel: number;

  videoElement: HTMLVideoElement | null;
  hlsInstance: Hls | null;

  setCurrentTime: (time: number) => void;
  setVideoElement: (videoElement: HTMLVideoElement | null, url: string) => void;

  seek: (time: number) => void;
  play: () => void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  setCurrentLevel: (index: number) => void;

  initState: (data: Pick<VideoMetaData, "videoLength" | "chapters">) => void;
  dropState: () => void;
}
