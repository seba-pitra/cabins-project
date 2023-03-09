import mongoose from "mongoose";
import Review from "@/models/Review";
import { connectMongoDb, disconnectMongoDb } from "@/db/database";
import { IReview } from "@/interfaces/Review";

export default class ReviewService {
  async createReview( {message, starsQuantity, title, visitorName}: IReview ): Promise<void> {
    await connectMongoDb()

    const newReview: mongoose.Document = new Review({ 
      message, 
      starsQuantity, 
      title, 
      visitorName 
    })

    newReview.save()

    await disconnectMongoDb()
  }

  async getAllReviews() {
    
  }

  updateReview() {}

  deleteReview() {}
};