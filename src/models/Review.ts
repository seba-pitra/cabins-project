import { Model, model, models, Schema } from "mongoose";
import { IReview } from "@/interfaces/Review";

const reviewSchema = new Schema<IReview>({
  message:       { type: String, required: true },
  starsQuantity: { type: Number, required: true },
  title:         { type: String, required: true },
  visitorName:   { type: String, required: true },
});

const Review: Model<IReview> =
  models.Review || model<IReview>("Review", reviewSchema);

export default Review;
