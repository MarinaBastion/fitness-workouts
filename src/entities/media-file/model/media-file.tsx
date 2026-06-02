export interface MediaFileCategory {
  id: string;
  name: string;
}

export interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  filePath: string;
  duration: number;        // в секундах
  size: number;           // в байтах
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  categories: MediaFileCategory[];
  shortVideoUrl: string;
  thumbnailUrl : string;
}
export interface MediaFileUploadRequest {
  file: File;
  name?: string;
}

export interface MediaFileUploadResponse {
  mediaFile: MediaFile;
  uploadProgress?: number;
}
