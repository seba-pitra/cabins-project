import methods          from "micro-method-router"
import ReviewService    from "@/services/ReviewService";
import ReviewController from "@/controllers/ReviewController";
import type { NextApiRequest, NextApiResponse } from "next";

const reviewService = new ReviewService()
const reviewController = new ReviewController(reviewService)

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  return await reviewController.createReview(req, res)
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  return await reviewController.getAllReviews(req, res)
}

export default methods({ post, get });
