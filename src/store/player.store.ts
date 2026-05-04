import { create } from "zustand";
import type { PlayerState } from "../interfaces/PlayerState";
import { findChapterIndexByTime } from "../utils/player.utils";
import type { VideoMetaData } from "../interfaces/VideoMetaData";
import Hls from "hls.js";

const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: true,
  isMuted: true,
  chapters: null,
  currentChapter: 0,
  currentTime: 0,
  duration: 0,
  levels: [],
  currentLevel: -1,

  initState(data: Pick<VideoMetaData, "videoLength" | "chapters">) {
    set({
      isPlaying: true,
      isMuted: true,
      currentChapter: 0,
      currentTime: 0,
      duration: data.videoLength || 0,
      chapters: data.chapters || null,
      currentLevel: -1,
    });
  },

  dropState() {
    set({
      isPlaying: true,
      isMuted: true,
      currentChapter: 0,
      currentTime: 0,
      duration: 0,
      chapters: null,
      currentLevel: -1,
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

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const availableLevels = data.levels.map((level, index) => ({
          index: index,
          label: level.height + "p",
        }));

        set({ levels: [{ index: -1, label: "Auto" }, ...availableLevels] });
      });

      set({
        videoElement: el,
        hlsInstance: hls,
        isPlaying: el.autoplay,
        isMuted: el.muted,
        currentLevel: -1,
      });
    } else {
      set({ videoElement: null, hlsInstance: null });
    }
  },

  seek: (time) => {
    const { videoElement } = get();
    if (videoElement) videoElement.currentTime = time;
  },

  play() {
    const { videoElement } = get();

    videoElement?.play();

    set({ isPlaying: true });
  },

  pause() {
    const { videoElement } = get();

    videoElement?.pause();

    set({ isPlaying: false });
  },

  mute() {
    const { videoElement } = get();
    if (videoElement) {
      videoElement.muted = true;
    }
    set({ isMuted: true });
  },

  unmute() {
    const { videoElement } = get();
    if (videoElement) {
      videoElement.muted = false;
    }
    set({ isMuted: false });
  },

  setCurrentLevel: (index: number) => {
    const { hlsInstance } = get();
    if (hlsInstance) {
      hlsInstance.currentLevel = index;
    }
    set({ currentLevel: index });
  },
}));

export default usePlayerStore;
