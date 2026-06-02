var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormProvider, Controller, useWatch } from 'react-hook-form';
import { Combobox, Option } from '@fluentui/react-components';
import { Button } from '@/shared/ui/Button/Button';
import { useObjectUrl } from '@/shared/hooks/use-onbject-url/index';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
import { useMediaFileForm } from '../model/useMediaFileForm';
import styles from './MediaFileForm.module.css';
export const MediaFileForm = ({ initialData, onSuccess }) => {
    var _a, _b;
    const { data: categoriesResponse } = useGetVideocategoriesQuery();
    const categories = (_a = categoriesResponse === null || categoriesResponse === void 0 ? void 0 : categoriesResponse.content) !== null && _a !== void 0 ? _a : [];
    const { form, onSubmit, isSubmitting } = useMediaFileForm({
        initialData,
        onSuccess,
    });
    const { register, control, trigger, formState: { errors }, } = form;
    // --- значения формы
    const nameValue = useWatch({ control, name: 'name' });
    const descriptionValue = useWatch({ control, name: 'description' });
    const selectedCategoryIds = (_b = useWatch({ control, name: 'categoryIds' })) !== null && _b !== void 0 ? _b : [];
    const shortVideo = useWatch({ control, name: 'shortVideo' });
    const thumbnail = useWatch({ control, name: 'thumbnail' });
    // --- preview URL (с авто очисткой!)
    const videoPreviewUrl = useObjectUrl(shortVideo);
    const thumbnailPreviewUrl = useObjectUrl(thumbnail);
    const selectedCategoryNames = selectedCategoryIds
        .map((id) => { var _a; return (_a = categories.find((c) => c.id === id)) === null || _a === void 0 ? void 0 : _a.name; })
        .filter((name) => Boolean(name));
    const errorEntries = Object.entries(errors).filter(([, value]) => Boolean(value === null || value === void 0 ? void 0 : value.message));
    const hasFormErrors = errorEntries.length > 0;
    const fieldTitles = {
        name: 'Название',
        description: 'Описание',
        categoryIds: 'Категория',
        shortVideo: 'Короткое видео',
        thumbnail: 'Thumbnail',
    };
    return (_jsx(FormProvider, Object.assign({}, form, { children: _jsxs("form", { className: styles.form, onSubmit: onSubmit, children: [_jsx("h2", { className: styles.title, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0438\u0434\u0435\u043E\u0444\u0430\u0439\u043B" }), hasFormErrors && (_jsxs("div", { className: styles.errorAlert, children: [_jsxs("div", { className: styles.errorAlertHeader, children: [_jsx("span", { className: styles.errorAlertIcon, children: "!" }), _jsx("strong", { children: "\u041F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u044B \u043E\u0448\u0438\u0431\u043A\u0438:" })] }), _jsx("ul", { className: styles.errorList, children: errorEntries.map(([field, value]) => {
                                var _a;
                                return (_jsxs("li", { children: [_jsxs("span", { className: styles.errorFieldName, children: [(_a = fieldTitles[field]) !== null && _a !== void 0 ? _a : field, ":"] }), ' ', value === null || value === void 0 ? void 0 : value.message] }, field));
                            }) })] })), _jsx("div", { className: styles.preview, children: _jsx("video", { className: styles.previewVideo, src: initialData.filePath, controls: true }) }), videoPreviewUrl && (_jsxs("div", { className: styles.preview, children: [_jsx("label", { children: "\u041F\u0440\u0435\u0432\u044C\u044E \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0433\u043E \u0432\u0438\u0434\u0435\u043E" }), _jsx("video", { className: styles.previewVideo, src: videoPreviewUrl, controls: true })] })), thumbnailPreviewUrl && (_jsxs("div", { className: styles.preview, children: [_jsx("label", { children: "Preview thumbnail" }), _jsx("img", { src: thumbnailPreviewUrl, className: styles.previewImage })] })), _jsxs("div", { className: styles.descr, children: [_jsxs("div", { className: styles.field, children: [_jsx("label", { className: styles.label, children: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u0430*" }), _jsx("input", Object.assign({ type: "text", className: errors.name ? styles.inputError : styles.input, value: nameValue !== null && nameValue !== void 0 ? nameValue : '' }, register('name'))), errors.name && (_jsx("span", { className: styles.error, children: errors.name.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { className: styles.label, children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435*" }), _jsx("input", Object.assign({ type: "text", className: errors.description ? styles.inputError : styles.input, value: descriptionValue !== null && descriptionValue !== void 0 ? descriptionValue : '' }, register('description'))), errors.description && (_jsx("span", { className: styles.error, children: errors.description.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { className: styles.label, children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" }), _jsx(Controller, { name: "categoryIds", control: control, render: ({ field }) => {
                                        var _a;
                                        return (_jsx(Combobox, { placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E", className: errors.categoryIds ? styles.comboError : styles.combo, multiselect: true, selectedOptions: (_a = field.value) !== null && _a !== void 0 ? _a : [], value: selectedCategoryNames.join(', '), onOptionSelect: (_, data) => { var _a; return field.onChange((_a = data.selectedOptions) !== null && _a !== void 0 ? _a : []); }, children: categories.map((category) => (_jsx(Option, { value: category.id, children: category.name }, category.id))) }));
                                    } }), errors.categoryIds && (_jsx("span", { className: styles.error, children: errors.categoryIds.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { className: styles.label, children: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0432\u0438\u0434\u0435\u043E (\u0434\u043E 3 \u0441\u0435\u043A\u0443\u043D\u0434)" }), _jsx(Controller, { name: "shortVideo", control: control, render: ({ field }) => (_jsx("input", { type: "file", accept: "video/*", className: errors.shortVideo ? styles.fileInputError : styles.fileInput, onChange: (e) => __awaiter(void 0, void 0, void 0, function* () {
                                            var _a, _b;
                                            const file = (_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
                                            field.onChange(file);
                                            if (file) {
                                                yield trigger('shortVideo');
                                            }
                                        }) })) }), errors.shortVideo && (_jsx("span", { className: styles.error, children: errors.shortVideo.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { className: styles.label, children: "Thumbnail" }), _jsx(Controller, { name: "thumbnail", control: control, render: ({ field }) => (_jsx("input", { type: "file", accept: "image/*", className: errors.thumbnail ? styles.fileInputError : styles.fileInput, onChange: (e) => { var _a, _b; return field.onChange((_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null); } })) }), errors.thumbnail && (_jsx("span", { className: styles.error, children: errors.thumbnail.message }))] }), _jsxs("div", { className: styles.actions, children: [_jsx(Button, { type: "submit", disabled: isSubmitting, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }), _jsx(Button, { type: "button", variant: "secondary", onClick: onSuccess, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" })] })] })] }) })));
};
