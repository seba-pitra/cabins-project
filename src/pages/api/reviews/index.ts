// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ReviewController from "@/controllers/ReviewController";
import ReviewService from "@/services/ReviewService";

type Data = {
  name: string;
};

const reviewService = new ReviewService()
const reviewController = new ReviewController(reviewService)

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case "POST":
      await reviewController.createReview(req, res)
    case "GET":
      await reviewController.getReview(req, res)
    default:
      return;
  }
}
