import mongoose      from "mongoose";
import ReviewService from "@/services/ReviewService";
import { IReview }   from "@/interfaces/Review";
import { NextApiRequest, NextApiResponse } from "next";

export default class ReviewController {
  private reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService
  }

  async createReview (req: NextApiRequest, res: NextApiResponse): Promise<void> {
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
  
  async getAllReviews (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const allReviews: mongoose.Document[] = await this.reviewService.getAllReviews()
  
      if(!allReviews.length) throw new Error("No Reviews Found")

      res.status(200).json({ msg: "Reviews found", data: allReviews})
    } catch (err: any) {
      res.status(400).json({msg: err.message})
    }
  }

  async getReviewById (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const id = req.query.id as string

      const foundReview: mongoose.Document<unknown, {}, IReview> | null = 
        await this.reviewService.getReviewById(id)

      if (!foundReview) throw new Error("No Review Found")

      res.status(400).json({ msg: "Review found successfully", data: foundReview })
    } catch (err: any) {
      res.status(404).json({msg: err.message})
    }
  }

  async updateReview (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const id = req.query.id as string
      const { message, starsQuantity, title, visitorName } = req.body
  
      if (!message || !starsQuantity || !title || !visitorName) {
        throw new Error("There are missing values")
      }

      const foundReview: mongoose.Document<unknown, {}, IReview> | null = 
        await this.reviewService.getReviewById(id)

      if(!foundReview) throw new Error("No Review found")

      const updatedReview: mongoose.Document<unknown, {}, IReview> | null = 
        await this.reviewService.updateReview({ id, message, starsQuantity, title, visitorName } )

      res.status(200).json({msg: "Review updated successfuly", data: updatedReview})
    } catch (err: any) {
      res.status(400).json({msg: err.message})
    }
  }

  async deleteReview (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const id = req.query.id as string

      const foundReview: mongoose.Document<unknown, {}, IReview> | null = 
        await this.reviewService.getReviewById(id)

      if(!foundReview) throw new Error("No Review found")

      await this.reviewService.deleteReview(id)

      res.status(400).json({ msg: "Deleted successfully" })
    } catch (err:any) {
      res.status(400).json({ msg: err.message })
    }
  }
};