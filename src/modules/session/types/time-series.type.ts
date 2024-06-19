import { z } from "zod";

export const TimeSeriesSchema = z.object({
  /**
   * Short for "toss and turns"
   *
   * Datapoint of the timeseries, in the format [time, value]
   */
  tnt: z.tuple([z.string().datetime(), z.number().int().min(0)]).array(),
  /**
   * Ambient room temperature, in celsius
   */
  tempRoomC: z.tuple([z.string().datetime(), z.number()]).array(),
  /**
   * Bed temperature, celsius
   */
  tempBedC: z.tuple([z.string().datetime(), z.number()]).array(),
  /**
   * Respiratory rate
   *
   * Measured in "breaths per minute"
   */
  respiratoryRate: z.tuple([z.string().datetime(), z.number()]).array(),
  /**
   * Heart rate
   *
   * Measured in "beats per minute"
   */
  heartRate: z.tuple([z.string().datetime(), z.number()]).array(),
  /**
   * Heating
   *
   * Ignore this
   */
  heating: z.tuple([z.string().datetime(), z.number()]).array().optional(),
});

export type TimeSeries = z.infer<typeof TimeSeriesSchema>;
