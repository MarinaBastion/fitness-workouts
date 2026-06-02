export const getPlaylistItemById = (playlistItems, itemId) => {
    return playlistItems.find(item => item.id === itemId);
};
