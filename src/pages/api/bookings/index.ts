import methods from "micro-method-router";
import BookingService from "@/services/BookingService";
import BookingController from "@/controllers/BookingController";
import type { NextApiRequest, NextApiResponse } from "next";

const bookingService = new BookingService();
const bookingController = new BookingController(bookingService);

const post = (req: NextApiRequest, res: NextApiResponse) => {
  return bookingController.createBooking(req, res);
};

const get = (req: NextApiRequest, res: NextApiResponse) => {
  return bookingController.getBookings(req, res);
};

export default methods({ post, get });
