import ReviewService from "@/services/ReviewService";
import { NextApiRequest, NextApiResponse } from "next";

export default class ReviewController {
  private reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService
  }

  async createReview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { message, starsQuantity, title, visitorName } = req.body
  
      if(!message || !starsQuantity || !title || !visitorName) {
        throw new Error("There are missing values")
      }

      await this.reviewService.createReview({ message, starsQuantity, title, visitorName })

      res.status(201).json({ msg: "Review created successfully" })
    }
    catch (err:any) {
      res.status(400).json({ msg: err.message })
    }
  }
  
  async getReview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    
  }

  updateReview() {}

  deleteReview() {}
};