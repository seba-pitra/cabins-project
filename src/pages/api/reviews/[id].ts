import methods          from "micro-method-router"
import ReviewService    from "@/services/ReviewService";
import ReviewController from "@/controllers/ReviewController";
import type { NextApiRequest, NextApiResponse } from "next";

const reviewService = new ReviewService()
const reviewController = new ReviewController(reviewService)

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  return await reviewController.getReviewById(req, res)
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  return await reviewController.updateReview(req, res)
}

const deleteMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  return await reviewController.deleteReview(req, res)
}

export default methods({
  get,
  put,
  delete: deleteMethod
});