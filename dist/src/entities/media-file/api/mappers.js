const MEDIA_PUBLIC_BASE_URL = 'https://localhost:7026/media-files';
const isPublicUrl = (value) => {
    return /^https?:\/\//i.test(value) || value.startsWith('blob:') || value.startsWith('data:');
};
const normalizeMediaFilePath = (rawPath) => {
    if (!rawPath) {
        return '';
    }
    if (isPublicUrl(rawPath)) {
        return rawPath;
    }
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const fileName = normalizedPath.split('/').pop();
    if (!fileName) {
        return '';
    }
    return `${MEDIA_PUBLIC_BASE_URL}/${encodeURIComponent(fileName)}`;
};
export const extractMediaFiles = (response) => {
    var _a;
    return ((_a = response === null || response === void 0 ? void 0 : response.content.groups.map((group) => normalizeMediaFile(group.mediaFiles, group.categories))) !== null && _a !== void 0 ? _a : []);
};
const normalizeMediaFile = (file, groupCategories) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return ({
        id: (_a = file.id) !== null && _a !== void 0 ? _a : '',
        name: (_b = file.name) !== null && _b !== void 0 ? _b : '',
        originalName: (_c = file.originalName) !== null && _c !== void 0 ? _c : '',
        filePath: normalizeMediaFilePath(file.filePath),
        duration: (_d = file.duration) !== null && _d !== void 0 ? _d : 0,
        size: (_e = file.size) !== null && _e !== void 0 ? _e : 0,
        mimeType: (_f = file.mimeType) !== null && _f !== void 0 ? _f : 'video/mp4',
        thumbnailUrl: file.thumbnailUrl,
        createdAt: (_g = file.createdAt) !== null && _g !== void 0 ? _g : '',
        updatedAt: (_j = (_h = file.updatedAt) !== null && _h !== void 0 ? _h : file.createdAt) !== null && _j !== void 0 ? _j : '',
        description: (_k = file.description) !== null && _k !== void 0 ? _k : '',
        categories: (_m = (_l = file.categories) !== null && _l !== void 0 ? _l : groupCategories === null || groupCategories === void 0 ? void 0 : groupCategories.map((category) => ({
            id: category.categoryId,
            name: category.categoryName,
        }))) !== null && _m !== void 0 ? _m : [],
    });
};
export const normalizeMediaFilesResponse = (response) => (Object.assign(Object.assign({}, response), { content: Object.assign(Object.assign({}, response.content), { groups: response.content.groups.map((group) => {
            var _a;
            return (Object.assign(Object.assign({}, group), { mediaFiles: normalizeMediaFile(group.mediaFiles, group.categories), categories: (_a = group.categories) !== null && _a !== void 0 ? _a : [] }));
        }) }) }));
