var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateVideoCategoryMutation, useUpdateVideoCategoryMutation } from '@/entities/video-category/api/videoCategoryApi';
export const useVideoCategoryForm = ({ initialData, onSuccess }) => {
    var _a;
    const [createVideoCategory] = useCreateVideoCategoryMutation();
    const [updateVideoCategory] = useUpdateVideoCategoryMutation();
    const form = useForm({
        defaultValues: {
            name: (_a = initialData === null || initialData === void 0 ? void 0 : initialData.name) !== null && _a !== void 0 ? _a : '',
        },
        mode: 'onSubmit',
    });
    const { handleSubmit, formState } = form;
    useEffect(() => {
        var _a;
        form.reset({ name: (_a = initialData === null || initialData === void 0 ? void 0 : initialData.name) !== null && _a !== void 0 ? _a : '' });
    }, [form, initialData === null || initialData === void 0 ? void 0 : initialData.id, initialData === null || initialData === void 0 ? void 0 : initialData.name]);
    const onSubmit = handleSubmit((values) => __awaiter(void 0, void 0, void 0, function* () {
        if (initialData) {
            yield updateVideoCategory({
                id: initialData.id,
                name: values.name,
            }).unwrap();
        }
        else {
            yield createVideoCategory({
                name: values.name,
            }).unwrap();
        }
        form.reset({ name: '' });
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
    }));
    return {
        form,
        onSubmit,
        isEdit: Boolean(initialData),
        isSubmitting: formState.isSubmitting,
    };
};
