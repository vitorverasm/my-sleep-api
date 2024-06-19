import { z } from "zod";

export const SleepStageSchema = z.object({
  /**
   * Each stage can be any of "awake" (in bed, awake), "out" (out of bed), "light" (in light sleep), "deep" (in deep sleep)
   */
  stage: z.enum(["awake", "out", "light", "deep"]),
  /**
   * Duration of the stage in seconds
   */
  duration: z.number().int().min(0),
});

export type SleepStage = z.infer<typeof SleepStageSchema>;
