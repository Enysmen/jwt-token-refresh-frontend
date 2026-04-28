export interface PagedResponseDto<T> {
    items: T[];
    totalCount: number; // Total number of items in DB
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean; // we have a next page 
    hasPreviousPage: boolean; // we have a previous page
}