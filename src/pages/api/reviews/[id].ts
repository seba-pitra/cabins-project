import type { NextApiRequest, NextApiResponse } from "next";
import ReviewController from "@/controllers/ReviewController";
import ReviewService from "@/services/ReviewService";

const reviewService = new ReviewService()
const reviewController = new ReviewController(reviewService)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query.reviewId)
  switch(req.method) {
    case "GET":
      await reviewController.getReviewById(req, res)
    default:
      return;
  }
}

// id: 640a3ef57c21ea8ca07f2af9