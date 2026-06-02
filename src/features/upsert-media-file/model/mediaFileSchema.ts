import { z } from 'zod';

// Reads metadata to validate uploaded short video duration.
const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute('src');
      video.load();
    };

    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const duration = Number(video.duration);
      cleanup();
      resolve(duration);
    };
    video.onerror = () => {
      cleanup();
      reject(new Error('Не удалось прочитать длительность видео'));
    };
    video.src = objectUrl;
  });
};

export const mediaFileSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  description: z.string().min(1, 'Описание обязательно'),
  categoryIds: z.array(z.string()).min(1, 'Выберите категорию'),
  shortVideo: z
    .any()
    .superRefine(async (file, ctx) => {
      if (!(file instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Загрузите видео',
        });
        return;
      }

      try {
        const duration = await getVideoDuration(file);
        if (!Number.isFinite(duration) || duration > 4) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Видео ≤ 4 секунд',
          });
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Не удалось проверить длительность видео',
        });
      }
    }),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, 'Загрузите thumbnail'),
});
