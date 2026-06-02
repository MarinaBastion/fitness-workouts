var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/hooks';
import { updateUploadedMediaFile } from '@/features/file-upload/model/fileUploadSlice';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
// --- helper
const getVideoDuration = (file) => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(video.duration);
        video.src = URL.createObjectURL(file);
    });
};
// --- schema
const mediaFileSchema = z.object({
    name: z.string().min(2, 'Минимум 2 символа'),
    description: z.string().min(1, 'Описание обязательно'),
    categoryIds: z.array(z.string()).min(1, 'Выберите категорию'),
    shortVideo: z
        .any()
        .refine((file) => file instanceof File, 'Загрузите видео')
        .refine((file) => __awaiter(void 0, void 0, void 0, function* () {
        const duration = yield getVideoDuration(file);
        return duration <= 3;
    }), 'Видео ≤ 3 секунд'),
    thumbnail: z
        .any()
        .refine((file) => file instanceof File, 'Загрузите thumbnail'),
});
export const useMediaFileForm = ({ initialData, onSuccess, }) => {
    var _a, _b, _c, _d;
    const dispatch = useAppDispatch();
    const { data: categoriesResponse } = useGetVideocategoriesQuery();
    const categoriesById = useMemo(() => {
        var _a;
        const map = new Map();
        const categories = (_a = categoriesResponse === null || categoriesResponse === void 0 ? void 0 : categoriesResponse.content) !== null && _a !== void 0 ? _a : [];
        for (const category of categories) {
            map.set(category.id, category.name);
        }
        return map;
    }, [categoriesResponse === null || categoriesResponse === void 0 ? void 0 : categoriesResponse.content]);
    const form = useForm({
        resolver: zodResolver(mediaFileSchema, { async: true }),
        mode: 'onSubmit',
        defaultValues: {
            name: (_a = initialData === null || initialData === void 0 ? void 0 : initialData.name) !== null && _a !== void 0 ? _a : '',
            description: (_b = initialData === null || initialData === void 0 ? void 0 : initialData.description) !== null && _b !== void 0 ? _b : '',
            categoryIds: (_d = (_c = initialData === null || initialData === void 0 ? void 0 : initialData.categories) === null || _c === void 0 ? void 0 : _c.map((c) => c.id)) !== null && _d !== void 0 ? _d : [],
            shortVideo: null,
            thumbnail: null,
        },
    });
    const { handleSubmit, formState, reset, control } = form;
    // 👉 даём доступ к файлам (для UI)
    const shortVideo = useWatch({ control, name: 'shortVideo' });
    const thumbnail = useWatch({ control, name: 'thumbnail' });
    useEffect(() => {
        var _a, _b, _c, _d;
        reset({
            name: (_a = initialData === null || initialData === void 0 ? void 0 : initialData.name) !== null && _a !== void 0 ? _a : '',
            description: (_b = initialData === null || initialData === void 0 ? void 0 : initialData.description) !== null && _b !== void 0 ? _b : '',
            categoryIds: (_d = (_c = initialData === null || initialData === void 0 ? void 0 : initialData.categories) === null || _c === void 0 ? void 0 : _c.map((c) => c.id)) !== null && _d !== void 0 ? _d : [],
            shortVideo: null,
            thumbnail: null,
        });
    }, [
        reset,
        initialData === null || initialData === void 0 ? void 0 : initialData.id,
        initialData === null || initialData === void 0 ? void 0 : initialData.name,
        initialData === null || initialData === void 0 ? void 0 : initialData.description,
        initialData === null || initialData === void 0 ? void 0 : initialData.categories,
    ]);
    const onSubmit = handleSubmit((values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            values.categoryIds.forEach((id) => formData.append('categoryIds', id));
            if (values.shortVideo) {
                formData.append('shortVideo', values.shortVideo);
            }
            if (values.thumbnail) {
                formData.append('thumbnail', values.thumbnail);
            }
            // await api...
            if (initialData) {
                dispatch(updateUploadedMediaFile(Object.assign(Object.assign({}, initialData), { name: values.name, description: values.description, categories: values.categoryIds.map((id) => {
                        var _a;
                        return ({
                            id,
                            name: (_a = categoriesById.get(id)) !== null && _a !== void 0 ? _a : '',
                        });
                    }), updatedAt: new Date().toISOString() })));
            }
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            reset({
                name: '',
                description: '',
                categoryIds: [],
                shortVideo: null,
                thumbnail: null,
            });
        }
        catch (e) {
            console.error(e);
        }
    }));
    return {
        form,
        onSubmit,
        isSubmitting: formState.isSubmitting,
        // 👉 отдаём наружу для превью
        shortVideo,
        thumbnail,
    };
};
