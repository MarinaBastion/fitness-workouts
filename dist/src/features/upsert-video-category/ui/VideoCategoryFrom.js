import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormProvider, useWatch } from 'react-hook-form';
import { InputForm } from '@/shared/ui/Input/InputForm';
import { Button } from '@/shared/ui/Button/Button';
import { useVideoCategoryForm } from '../model/useVideoCategoryForm';
import styles from './videoCategoryForm.module.css';
export const VideoCategoryForm = ({ initialData, onSuccess, }) => {
    var _a, _b;
    const { form, onSubmit, isEdit, isSubmitting, } = useVideoCategoryForm({ initialData, onSuccess });
    const { register, formState: { errors }, } = form;
    const nameValue = useWatch({
        control: form.control,
        name: 'name',
        defaultValue: (_a = initialData === null || initialData === void 0 ? void 0 : initialData.name) !== null && _a !== void 0 ? _a : '',
    });
    return (_jsx(FormProvider, Object.assign({}, form, { children: _jsxs("form", { className: styles.form, onSubmit: onSubmit, children: [_jsx("div", { className: styles.headerRow, children: _jsx("h2", { children: isEdit
                            ? 'Редактировать категорию'
                            : 'Создать категорию' }) }), _jsx(InputForm, Object.assign({ label: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", value: nameValue !== null && nameValue !== void 0 ? nameValue : '' }, register('name', {
                    required: 'Введите наименование категории',
                    minLength: {
                        value: 2,
                        message: 'Минимум 2 символа',
                    },
                }), { error: (_b = errors.name) === null || _b === void 0 ? void 0 : _b.message })), _jsx(Button, { className: styles.actionButton, type: "submit", disabled: isSubmitting, children: isEdit ? 'Сохранить' : 'Создать' }), isEdit ? _jsx(Button, { disabled: isSubmitting, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" }) : ""] }) })));
};
