import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import styles from './videoEditorCategoriesWidget.module.css';
export const VideoEditorCategoriesWidget = ({ categories, selectedCategoryIds, isLoading, isError, onToggleCategory, }) => {
    const [search, setSearch] = useState('');
    const filteredCategories = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) {
            return categories;
        }
        return categories.filter((category) => category.name.toLowerCase().includes(term));
    }, [categories, search]);
    return (_jsxs("section", { className: styles.section, children: [_jsx("h2", { className: styles.title, children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), _jsx("input", { type: "text", value: search, onChange: (event) => setSearch(event.target.value), className: styles.searchInput, placeholder: "\u041F\u043E\u0438\u0441\u043A \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), isLoading ? (_jsx("div", { className: styles.state, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439..." })) : isError ? (_jsx("div", { className: styles.state, children: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" })) : filteredCategories.length === 0 ? (_jsx("div", { className: styles.state, children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" })) : (_jsx("div", { className: styles.chipsGrid, children: filteredCategories.map((category) => {
                    const isChecked = selectedCategoryIds.includes(category.id);
                    return (_jsxs("button", { type: "button", role: "checkbox", "aria-checked": isChecked, onClick: () => onToggleCategory(category.id), className: styles.chip, children: [_jsx("span", { className: isChecked ? `${styles.check} ${styles.checkActive}` : styles.check, children: isChecked ? '✓' : '' }), _jsx("span", { className: styles.label, children: category.name })] }, category.id));
                }) }))] }));
};
