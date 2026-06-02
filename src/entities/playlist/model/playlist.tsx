export interface Playlist {
  id: string;
  name: string;
  items: PlaylistItem[];
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlaylistItem {
  id: string;
  mediaFileId: string;
  order: number;
  startTime?: number;     // время начала в файле
  endTime?: number;       // время окончания в файле
}