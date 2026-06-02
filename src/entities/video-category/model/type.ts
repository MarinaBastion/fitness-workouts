export interface VideoCategory{
    id: string;
    name: string;

}
export interface ResponseWrapper<T> {
    success: boolean,
    error?: string,
    status: number,
    paging?: string,
    content: T
}
export type CreateVideoCategoryRequest = {
  name: string;
};
export type UpdateVideoCategoryRequest = {
  id: string;
  name: string;
};
export type GetVideoCategoryRequest = {
  Search?: string;
};