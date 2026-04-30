import {z} from "zod";

export const PagedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
    items: z.array(itemSchema),
    totalCount: z.number().min(0),
    pageNumber: z.number().min(1),
    pageSize: z.number().min(1),
    totalPages: z.number().min(0),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
});

export type PagedResponseDto<T> = {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}






    