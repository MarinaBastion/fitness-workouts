import { MediaFile } from '../model/media-file';
import { GetMediaFilesResponse } from './types';

const MEDIA_PUBLIC_BASE_URL = 'https://localhost:7026/media-files';

const isPublicUrl = (value: string): boolean => {
  return /^https?:\/\//i.test(value) || value.startsWith('blob:') || value.startsWith('data:');
};

const normalizeMediaFilePath = (rawPath?: string): string => {
  if (!rawPath) {
    return '';
  }

  if (isPublicUrl(rawPath)) {
    return rawPath;
  }

  const normalizedPath = rawPath.replace(/\\/g, '/');
  const fileName = normalizedPath.split('/').pop();

  if (!fileName) {
    return '';
  }

  return `${MEDIA_PUBLIC_BASE_URL}/${encodeURIComponent(fileName)}`;
};

export const extractMediaFiles = (response?: GetMediaFilesResponse): MediaFile[] => {
  return (
    response?.content.groups.map((group) =>
      normalizeMediaFile(group.mediaFiles, group.categories)
    ) ?? []
  );
};

const normalizeMediaFile = (
  file: Partial<MediaFile>,
  groupCategories?: Array<{ categoryId: string; categoryName: string }>
): MediaFile => ({
  id: file.id ?? '',
  name: file.name ?? '',
  originalName: file.originalName ?? '',
  filePath: normalizeMediaFilePath(file.filePath),
  shortVideoUrl: normalizeMediaFilePath(file.shortVideoUrl ?? (file as { shortVideoPath?: string }).shortVideoPath),
  duration: file.duration ?? 0,
  size: file.size ?? 0,
  mimeType: file.mimeType ?? 'video/mp4',
  thumbnailUrl: normalizeMediaFilePath(file.thumbnailUrl),
  createdAt: file.createdAt ?? '',
  updatedAt: file.updatedAt ?? file.createdAt ?? '',
  description: file.description ?? '',
  categories:
    file.categories ??
    groupCategories?.map((category) => ({
      id: category.categoryId,
      name: category.categoryName,
    })) ??
    [],
});

export const normalizeMediaFilesResponse = (
  response: GetMediaFilesResponse
): GetMediaFilesResponse => ({
  ...response,
  content: {
    ...response.content,
    groups: response.content.groups.map((group) => ({
      ...group,
      mediaFiles: normalizeMediaFile(group.mediaFiles, group.categories),
      categories: group.categories ?? [],
    })),
  },
});

export const normalizeSingleMediaFile = (file: Partial<MediaFile>): MediaFile =>
  normalizeMediaFile(file, []);
