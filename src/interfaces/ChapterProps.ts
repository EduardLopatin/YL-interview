import type { Chapter } from "./VideoMetaData";

export interface ChapterProps {
  chapter: Chapter;
  currentTime: number;
  active: boolean;
}
