import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { VideoCategory } from '@/entities/video-category';
import { useCreateVideoCategoryMutation, useUpdateVideoCategoryMutation } from '@/entities/video-category/api/videoCategoryApi';

export type VideoCategoryFormValues = {
  name: string;
};

type Props = {
  initialData?: VideoCategory;
  onSuccess?: () => void;
};

export const useVideoCategoryForm = ({
  initialData,
  onSuccess
}: Props) => {
  const [createVideoCategory] = useCreateVideoCategoryMutation();
  const [updateVideoCategory] = useUpdateVideoCategoryMutation();
  const form = useForm<VideoCategoryFormValues>({
    defaultValues: {
      name: initialData?.name ?? '',
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, formState } = form;

  useEffect(() => {
    form.reset({ name: initialData?.name ?? '' });
  }, [form, initialData?.id, initialData?.name]);

  const onSubmit = handleSubmit(async (values) => {
    if (initialData) {
      await updateVideoCategory({
        id: initialData.id,
        name: values.name,
      }).unwrap();
    } else {
      await createVideoCategory({
        name: values.name,
      }).unwrap();
    }

    form.reset({ name: '' });
    onSuccess?.();
  });

  return {
    form,
    onSubmit,
    isEdit: Boolean(initialData),
    isSubmitting: formState.isSubmitting,
  };
};
