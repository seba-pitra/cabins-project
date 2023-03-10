import ReviewService    from "@/services/ReviewService";
import ReviewController from "@/controllers/ReviewController";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reviewService = new ReviewService()
  const reviewController = new ReviewController(reviewService)

  switch(req.method) {
    case "POST":
      await reviewController.createReview(req, res)
    case "GET":
      await reviewController.getAllReviews(req, res)
    default:
      return;
  }
}

export default handler;
