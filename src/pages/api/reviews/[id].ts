import methods          from "micro-method-router"
import ReviewService    from "@/services/ReviewService";
import ReviewController from "@/controllers/ReviewController";
import type { NextApiRequest, NextApiResponse } from "next";

const reviewService = new ReviewService()
const reviewController = new ReviewController(reviewService)

const get = (req: NextApiRequest, res: NextApiResponse) => {
  return reviewController.getReviewById(req, res)
}

const put = (req: NextApiRequest, res: NextApiResponse) => {
  return reviewController.updateReview(req, res)
}

const deleteMethod = (req: NextApiRequest, res: NextApiResponse) => {
  return reviewController.deleteReview(req, res)
}

export default methods({
  get,
  put,
  delete: deleteMethod
});