import { z } from "zod";
import { SleepStageSchema } from "./sleep-stage.type";
import { TimeSeriesSchema } from "./time-series.type";

export const SleepSessionSchema = z.object({
  /**
   * The id of the interval
   */
  id: z.coerce.string({
    required_error: "id is required",
  }),
  userId: z.coerce.string({
    required_error: "userId is required",
  }),
  /**
   * Time the session starts in ISO 8601 format
   */
  ts: z.string({
    required_error: "id is required",
  }),
  /**
   * The sleep score of the session (min 0, max 100)
   */
  score: z.number().min(0).max(100),
  /**
   * The sleep stages of the session
   */
  stages: SleepStageSchema.array(),
  /**
   * Collection of timeseries data
   */
  timeseries: TimeSeriesSchema,
});

export type SleepSession = z.infer<typeof SleepSessionSchema>;
