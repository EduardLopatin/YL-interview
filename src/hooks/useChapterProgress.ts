import { useMemo } from "react";
import { calculateChapterProgress } from "../utils/player.utils";
import type { Chapter } from "../interfaces/VideoMetaData";

export function useChapterProgress(
  chapter: Chapter,
  currentTime: number,
): number {
  return useMemo(() => {
    if (currentTime < chapter.start) {
      return 0;
    }

    if (currentTime > chapter.end) {
      return 100;
    }

    return calculateChapterProgress(chapter.start, chapter.end, currentTime);
  }, [chapter, currentTime]);
}
