import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
import { VideoCategoryForm } from '@/features/upsert-video-category/ui/VideoCategoryFrom';
import styles from './videoCategoriesListForm.module.css';
export const VideoCatrgoriesListForm = () => {
    const { data: categories, isLoading, isError } = useGetVideocategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState();
    return (_jsxs("div", { className: styles.form, children: [_jsxs("div", { className: styles.categories, children: [_jsx("h3", { children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), isLoading ? (_jsx("div", { className: styles.empty, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439..." })) : isError ? (_jsx("div", { className: styles.empty, children: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438." })) : categories.content.length === 0 ? (_jsx("div", { className: styles.empty, children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u044B." })) : (_jsx("ul", { className: styles.list, children: categories.content.map((category) => (_jsx("li", { children: _jsx("button", { type: "button", className: (selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.id) === category.id
                                    ? `${styles.categoryButton} ${styles.categoryButtonActive}`
                                    : styles.categoryButton, onClick: () => setSelectedCategory(category), children: category.name }) }, category.id))) }))] }), _jsx(VideoCategoryForm, { initialData: selectedCategory, onSuccess: () => setSelectedCategory(undefined) })] }));
};
