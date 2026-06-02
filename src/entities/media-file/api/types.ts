import { MediaFile } from '../model/media-file';

export interface PagingInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface MediaFilesGroupCategory {
  categoryId: string;
  categoryName: string;
}

export interface MediaFilesGroup {
  mediaFiles: MediaFile;
  categories: MediaFilesGroupCategory[];
}
//TODO: unify this interface
export interface MediaFilesContent {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  groups: MediaFilesGroup[];
}

export interface GetMediaFilesResponse {
  success: boolean;
  error: string | null;
  status: number;
  paging: PagingInfo;
  content: MediaFilesContent;
}

export interface GetMediaFilesParams {
  Search?: string;
  CategoryIds?: string[];
  PageNumber?: number;
  PageSize?: number;
}
