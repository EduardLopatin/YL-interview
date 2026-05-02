import { create } from "zustand";

const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentChapter: 0,
}));

export default usePlayerStore;
