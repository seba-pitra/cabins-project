import mongoose from "mongoose";
import Review from "@/models/Review";
import { connectMongoDb, disconnectMongoDb } from "@/db/database";
import { IReview } from "@/interfaces/Review";

export default class ReviewService {
  async createReview(params: IReview): Promise<mongoose.Document> {
    await connectMongoDb()

    const newReview: mongoose.Document = new Review({ 
      message: params.message, 
      starsQuantity: params.starsQuantity, 
      title: params.title, 
      visitorName: params.visitorName 
    })

    newReview.save()

    await disconnectMongoDb()

    return newReview;
  }

  async getAllReviews() {
    await connectMongoDb()

    const foundReviews = await Review.find() 

    await disconnectMongoDb()

    return foundReviews
  }

  updateReview() {}

  deleteReview() {}
};