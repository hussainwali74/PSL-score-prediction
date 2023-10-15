import { Schema, model, models } from "mongoose";

export interface FilterInterface {
  _id?: string;
  // filter_type: string;
  topic: string;
  sub_topic: string;
  grade: string;
  date?: Date;
}

export const filterSchema = new Schema<FilterInterface>({
  // filter_type: {
  //   type: String,
  // },
  grade: {
    type: String,
  },
  topic: {
    type: String,
  },
  sub_topic: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const FilterModel = models.Filter2 || model<FilterInterface>('Filter2',filterSchema)
export default FilterModel 