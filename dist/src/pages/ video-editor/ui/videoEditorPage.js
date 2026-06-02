import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
import { VideoEditorCategoriesWidget } from '@/widgets/video-editor-categories';
import { VideoEditorMediaListWidget } from '@/widgets/video-editor-media-list';
import styles from './videoEditorPage.module.css';
export const VideoEditorPage = () => {
    var _a;
    const { data: categoriesResponse, isLoading, isError } = useGetVideocategoriesQuery();
    const categories = (_a = categoriesResponse === null || categoriesResponse === void 0 ? void 0 : categoriesResponse.content) !== null && _a !== void 0 ? _a : [];
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    useEffect(() => {
        if (categories.length === 0) {
            return;
        }
        setSelectedCategoryIds((prev) => {
            if (prev.length > 0) {
                return prev;
            }
            return categories.map((category) => category.id);
        });
    }, [categories]);
    const selectedCategoriesKey = useMemo(() => {
        return selectedCategoryIds.slice().sort().join(',');
    }, [selectedCategoryIds]);
    const handleToggleCategory = (categoryId) => {
        setSelectedCategoryIds((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter((id) => id !== categoryId);
            }
            return [...prev, categoryId];
        });
    };
    return (_jsxs("div", { className: styles.page, children: [_jsx(VideoEditorCategoriesWidget, { categories: categories, selectedCategoryIds: selectedCategoryIds, isLoading: isLoading, isError: isError, onToggleCategory: handleToggleCategory }), _jsx(VideoEditorMediaListWidget, { categoryIds: selectedCategoryIds, isReady: !isLoading && !isError }, selectedCategoriesKey || 'no-categories')] }));
};
