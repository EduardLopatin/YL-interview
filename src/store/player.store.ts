import { create } from "zustand";
import type { PlayerState } from "../interfaces/PlayerState";
import { findChapterIndexByTime } from "../utils/player.utils";
import type { VideoMetaData } from "../interfaces/VideoMetaData";
import Hls from "hls.js";

const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  chapters: null,
  currentChapter: 0,
  currentTime: 0,
  duration: 0,

  initState(data: Pick<VideoMetaData, "videoLength" | "chapters">) {
    set({
      isPlaying: false,
      currentChapter: 0,
      currentTime: 0,
      duration: data.videoLength || 0,
      chapters: data.chapters || null,
    });
  },

  dropState() {
    set({
      isPlaying: false,
      currentChapter: 0,
      currentTime: 0,
      duration: 0,
      chapters: null,
    });
  },
  setCurrentTime(time: number) {
    const { chapters, currentChapter, currentTime } = get();

    const newTime: number = Math.floor(time);

    if (currentTime === newTime) {
      return;
    }

    if (!chapters) {
      set({ currentTime: newTime });
      return;
    }

    const chapterIndex = findChapterIndexByTime(
      time,
      chapters,
      currentChapter || 0,
    );

    set({ currentTime: newTime, currentChapter: chapterIndex });
  },

  setIsPlaying(isPlaying: boolean) {
    set({ isPlaying });
  },

  videoElement: null,
  hlsInstance: null,

  setVideoElement: (el: HTMLVideoElement | null, url: string) => {
    if (get().videoElement === el) return;

    if (get().hlsInstance) {
      get().hlsInstance?.destroy();
    }

    if (el) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(el);
      set({ videoElement: el, hlsInstance: hls });
    } else {
      set({ videoElement: null, hlsInstance: null });
    }
  },

  seek: (time) => {
    const { videoElement } = get();
    if (videoElement) videoElement.currentTime = time;
  },

  play() {
    set({ isPlaying: true });
  },

  pause() {
    set({ isPlaying: false });
  },
}));

export default usePlayerStore;
