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
    default:
      return;
  }
}

export default handler;

// id: 640a3ef57c21ea8ca07f2af9