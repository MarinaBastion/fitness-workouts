import { FormProvider,useWatch } from 'react-hook-form';
import { InputForm } from '@/shared/ui/Input/InputForm';
import { Button } from '@/shared/ui/Button/Button';
import { VideoCategory } from '@/entities/video-category';
import { useVideoCategoryForm } from '../model/useVideoCategoryForm';
import styles from './videoCategoryForm.module.css';

type Props = {
  initialData?: VideoCategory;
  onSuccess?: () => void;
};

export const VideoCategoryForm = ({
  initialData,
  onSuccess,
}: Props) => {
  const {
    form,
    onSubmit,
    isEdit,
    isSubmitting,
  } = useVideoCategoryForm({ initialData, onSuccess });

  const {
    register,
    formState: { errors },
  } = form;
   const nameValue = useWatch({
    control: form.control,
    name: 'name',
    defaultValue: initialData?.name ?? '',
  });

  return (
    <FormProvider {...form}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.headerRow}>
          <h2>
            {isEdit
              ? 'Редактировать категорию'
              : 'Создать категорию'}
          </h2>
        </div>

        <InputForm
          label="Наименование категории"
          value={nameValue ?? ''}
          {...register('name', {
            required: 'Введите наименование категории',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа',
            },
          })}
          error={errors.name?.message}
        />

        <Button className={styles.actionButton} type="submit" disabled={isSubmitting}>
          {isEdit ? 'Сохранить' : 'Создать'}
        </Button>
        {isEdit ?<Button disabled={isSubmitting}>
         Отменить
        </Button> : ""}
      </form>
    </FormProvider>
  );
};
