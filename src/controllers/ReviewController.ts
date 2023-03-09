import { IReview } from "@/interfaces/Review";
import ReviewService from "@/services/ReviewService";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default class ReviewController {
  private reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService
  }

  async createReview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { message, starsQuantity, title, visitorName } = req.body
  
      if (!message || !starsQuantity || !title || !visitorName) {
        throw new Error("There are missing values")
      }

      const newReview = await this.reviewService.createReview({ message, starsQuantity, title, visitorName })

      res.status(201).json({ msg: "Review created successfully", data: newReview })
    }
    catch (err:any) {
      res.status(400).json({ msg: err.message })
    }
  }
  
  async getReview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const allReviews: mongoose.Document[] = await this.reviewService.getAllReviews()
  
      if(!allReviews.length) throw new Error("No Reviews Found")

      res.status(200).json({ msg: "Reviews found", data: allReviews})
    } catch (err: any) {
      res.status(400).json({msg: err.message})
    }
  }

  async getReviewById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const id = req.query.id as string

      const foundReview: mongoose.Document< {}, IReview >[] = await this.reviewService.getReviewById(id)

      if (!foundReview.length) throw new Error("No Review Found")

      res.status(400).json({ msg: "Review found successfully", data: foundReview })
    } catch (err: any) {
      res.status(404).json({msg: err.message})
    }
  }

  updateReview() {}

  deleteReview() {}
};