import ReviewService    from "@/services/ReviewService";
import ReviewController from "@/controllers/ReviewController";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reviewService = new ReviewService()
  const reviewController = new ReviewController(reviewService)

  switch(req.method) {
    case "GET":
      await reviewController.getReviewById(req, res)
    case "PUT":
      await reviewController.updateReview(req, res)
    case "DELETE":
      await reviewController.deleteReview(req, res)
    default:
      return;
  }
}

export default handler;