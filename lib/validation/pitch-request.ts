import { z } from "zod";

export const PitchRequestSchema = z.object({
  confession: z
    .string()
    .trim()
    .min(1, { message: "Even delusion needs a business idea. Confess something first." })
    .max(1000, { message: "Your delusion is too ambitious. Please limit your confession to 1,000 characters." }),
});

export type PitchRequest = z.infer<typeof PitchRequestSchema>;
