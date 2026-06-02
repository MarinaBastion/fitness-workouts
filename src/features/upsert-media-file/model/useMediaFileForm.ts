import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '@/app/hooks';
import { updateUploadedMediaFile } from '@/features/file-upload/model/fileUploadSlice';
import { MediaFile } from '@/entities/media-file/model/media-file';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
import { mediaFileSchema } from './mediaFileSchema';
import { MediaFileFormValues } from './types';

type Props = {
  initialData?: MediaFile;
  onSuccess?: () => void;
};

export const useMediaFileForm = ({
  initialData,
  onSuccess,
}: Props) => {
  const dispatch = useAppDispatch();
  const { data: categoriesResponse } = useGetVideocategoriesQuery();

  const categoriesById = useMemo(() => {
    const map = new Map<string, string>();
    const categories = categoriesResponse?.content ?? [];

    for (const category of categories) {
      map.set(category.id, category.name);
    }

    return map;
  }, [categoriesResponse?.content]);

  const form = useForm<MediaFileFormValues>({
    resolver: zodResolver(mediaFileSchema, { async: true }),
    mode: 'onSubmit',
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      categoryIds:
        initialData?.categories?.map((c) => c.id) ?? [],
      shortVideo: null,
      thumbnail: null,
    },
  });

  const { handleSubmit, formState, reset, control } = form;

  // 👉 даём доступ к файлам (для UI)
  const shortVideo = useWatch({ control, name: 'shortVideo' });
  const thumbnail = useWatch({ control, name: 'thumbnail' });

  useEffect(() => {
    reset({
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      categoryIds:
        initialData?.categories?.map((c) => c.id) ?? [],
      shortVideo: null,
      thumbnail: null,
    });
  }, [
    reset,
    initialData?.id,
    initialData?.name,
    initialData?.description,
    initialData?.categories,
  ]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (initialData) {
        dispatch(
          updateUploadedMediaFile({
            ...initialData,
            name: values.name,
            description: values.description,
            shortVideoUrl: values.shortVideo
              ? URL.createObjectURL(values.shortVideo)
              : initialData.shortVideoUrl,
            thumbnailUrl: values.thumbnail
              ? URL.createObjectURL(values.thumbnail)
              : initialData.thumbnailUrl,
            updatedAt: new Date().toISOString(),
            categories:
              values.categoryIds.map((id) => ({
                id,
                name: categoriesById.get(id) ?? '',
              })),
          })
        );
      }

      onSuccess?.();

      reset({
        name: '',
        description: '',
        categoryIds: [],
        shortVideo: null,
        thumbnail: null,
      });
    } catch (e) {
      console.error(e);
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: formState.isSubmitting,

    // 👉 отдаём наружу для превью
    shortVideo,
    thumbnail,
  };
};
