import mongoose  from "mongoose";
import Review    from "@/models/Review";
import {IReview} from "@/interfaces/Review";
import { connectMongoDb, disconnectMongoDb } from "@/db/database";

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

  async getAllReviews(): Promise<mongoose.Document<{}, IReview>[]> {
      await connectMongoDb()

      const foundReviews: 
        mongoose.Document< {}, IReview >[] = await Review.find() 

      await disconnectMongoDb()

      return foundReviews
  }

  async getReviewById(id: string): 
    Promise<mongoose.Document<unknown, {}, IReview> | null> {
      await connectMongoDb()

      const foundReviews : 
        mongoose.Document<unknown, {}, IReview> | null = await Review.findOne({ _id: id }) 

      await disconnectMongoDb()

      return foundReviews 
  }

  async updateReview(newReviewData: IReview): 
    Promise<mongoose.Document<unknown, {}, IReview> | null> {
      const id = newReviewData.id as string;

      await connectMongoDb()

      await Review.updateOne(
        { _id: id },
        {
          $set: { ...newReviewData }
        }
      ) 

      const updatedReview: 
        mongoose.Document<unknown, {}, IReview> | null = await this.getReviewById(id)

      await disconnectMongoDb()

      return updatedReview;
  }

  async deleteReview(id: string) {
    try {
      await connectMongoDb()
    
      await Review.deleteOne({ _id: id })
  
      await disconnectMongoDb()
    } catch (err) {
      throw new Error("Failed to deleted review")
    }
  }
};