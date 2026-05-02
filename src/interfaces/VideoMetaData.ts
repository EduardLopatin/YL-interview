export interface Chapter {
  title: string;
  start: number;
  end: number;
}

export interface VideoMetaData {
  hlsPlaylistUrl: string;
  videoLength: number;
  chapters: Chapter[];
}
