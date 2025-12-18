import { z } from "zod";

export const productSchema = z.object({
    name : z.string().min(3),
    description : z.string(),
    price: z.number().positive(),
    stock : z.number().int().nonnegative(),
    imageUrl : z.string().url().optional(),
});
