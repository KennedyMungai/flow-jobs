import { z } from "zod";

export const jobsFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type jobsFilterValues = z.infer<typeof jobsFilterSchema>;
