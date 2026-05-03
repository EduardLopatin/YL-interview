import type { Chapter } from "../interfaces/VideoMetaData";

export function findChapterIndexByTime(
  time: number,
  chapters: Array<Chapter>,
  lastIndex: number = 0,
): number {
  const current = chapters[lastIndex];
  if (current && time >= current.start && time < current.end) {
    return lastIndex;
  }

  const next = chapters[lastIndex + 1] ?? null;
  if (next && time >= next.start && time < next.end) {
    return lastIndex + 1;
  }

  return chapters.findIndex((ch) => time >= ch.start && time < ch.end);
}

export function calculateChapterProgress(
  chapterStart: number,
  chapterEnd: number,
  currentTime: number,
): number {
  const elapsed: number = currentTime - chapterStart;
  const duration: number = chapterEnd - chapterStart;
  return (elapsed / duration) * 100;
}

export const calculateTimeFromClick = (
  event: React.MouseEvent<HTMLElement>,
  chapter: { start: number; end: number },
): number => {
  const rect = event.currentTarget.getBoundingClientRect();

  const clickX = event.clientX - rect.left;

  const width = rect.width;

  const percentage = Math.max(0, Math.min(1, clickX / width));

  const chapterDuration = chapter.end - chapter.start;
  const seekTime = chapter.start + percentage * chapterDuration;

  return seekTime;
};

export const convertSecondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours > 0 ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};
