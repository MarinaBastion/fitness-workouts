import React from 'react';
import { FormProvider, useWatch } from 'react-hook-form';

import { useObjectUrl } from '@/shared/hooks/use-onbject-url/index';

import { MediaFile } from '@/entities/media-file/model/media-file';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';

import { useMediaFileForm } from '../model/useMediaFileForm';
import { FormErrorAlert } from './components/FormErrorAlert';
import { MainVideoPreview } from './components/MainVideoPreview';
import { NameField } from './components/NameField';
import { DescriptionField } from './components/DescriptionField';
import { CategoryField } from './components/CategoryField';
import { ShortVideoField } from './components/ShortVideoField';
import { ShortVideoPreview } from './components/ShortVideoPreview';
import { ThumbnailField } from './components/ThumbnailField';
import { ThumbnailPreview } from './components/ThumbnailPreview';
import { FormActions } from './components/FormActions';
import styles from './MediaFileForm.module.css';

type Props = {
  initialData: MediaFile;
  onSuccess?: () => void;
};

export const MediaFileForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const { data: categoriesResponse } = useGetVideocategoriesQuery();
  const categories = categoriesResponse?.content ?? [];

  const { form, onSubmit, isSubmitting } = useMediaFileForm({
    initialData,
    onSuccess,
  });

  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = form;

  // --- значения формы
  const nameValue = useWatch({ control, name: 'name' });
  const descriptionValue = useWatch({ control, name: 'description' });
  const selectedCategoryIds = useWatch({ control, name: 'categoryIds' }) ?? [];

  const shortVideo = useWatch({ control, name: 'shortVideo' });
  const thumbnail = useWatch({ control, name: 'thumbnail' });

  const videoPreviewUrl = useObjectUrl(shortVideo);
  const thumbnailPreviewUrl = useObjectUrl(thumbnail);

  const selectedCategoryNames = selectedCategoryIds
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <FormProvider {...form}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Редактировать видеофайл</h2>
        <FormErrorAlert errors={errors} />
        <MainVideoPreview filePath={initialData.filePath} />
        <div className={styles.descr}>
          <NameField
            register={register}
            value={nameValue ?? ''}
            hasError={Boolean(errors.name)}
            errorMessage={errors.name?.message}
          />
          <DescriptionField
            register={register}
            value={descriptionValue ?? ''}
            hasError={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
          <CategoryField
            control={control}
            categories={categories}
            selectedCategoryNames={selectedCategoryNames}
            hasError={Boolean(errors.categoryIds)}
            errorMessage={errors.categoryIds?.message as string | undefined}
          />
          <ShortVideoField
            control={control}
            trigger={trigger}
            hasError={Boolean(errors.shortVideo)}
            errorMessage={errors.shortVideo?.message}
          />
          <ShortVideoPreview url={videoPreviewUrl} hasError={Boolean(errors.shortVideo)} />
          <ThumbnailField
            control={control}
            hasError={Boolean(errors.thumbnail)}
            errorMessage={errors.thumbnail?.message}
          />
          <ThumbnailPreview url={thumbnailPreviewUrl} />
          <FormActions isSubmitting={isSubmitting} onCancel={onSuccess} />
        </div>
      </form>
    </FormProvider>
  );
};
