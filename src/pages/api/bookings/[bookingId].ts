import methods from "micro-method-router";
import BookingService from "@/services/BookingService";
import BookingController from "@/controllers/BookingController";
import type { NextApiRequest, NextApiResponse } from "next";

const bookingService = new BookingService();
const bookingController = new BookingController(bookingService);

const get = (req: NextApiRequest, res: NextApiResponse) => {
  return bookingController.getBookingById(req, res);
};

const deleteMethod = (req: NextApiRequest, res: NextApiResponse) => {
  return bookingController.deleteBooking(req, res);
};

const put = (req: NextApiRequest, res: NextApiResponse) => {
  return bookingController.updateBooking(req, res);
};

export default methods({ get, delete: deleteMethod, put });
