export type MediaFileFormValues = {
  name: string;
  description: string;
  categoryIds: string[];
  shortVideo: File | null;
  thumbnail: File | null;
};
