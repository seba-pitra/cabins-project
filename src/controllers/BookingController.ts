import BookingService from "@/services/BookingService";
import { NextApiRequest, NextApiResponse } from "next";
import { IReserva } from "@/interfaces/Reserva";
import mongoose from "mongoose";

export default class CabinController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  // const newBooking = {
  //   name: "Juan Juan",
  //   guests: 3,
  //   checkIn: new Date(),
  //   checkOut: new Date(),
  //   phone: "+511173673976",
  //   email: "mederocc@gmail.com",
  // };

  async createBooking(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { name, guests, checkIn, checkOut, phone, email } = req.body;

      if (!name || !guests || !checkIn || !checkOut || !phone || !email) {
        throw new Error("Faltan valores");
      }
      const newBooking = await this.bookingService.createBooking(req.body);

      return res.status(200).json({ error: false, msg: newBooking });
    } catch (error: any) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getBookings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const bookings = await this.bookingService.getBookings();
      return res.status(200).json({ error: false, msg: bookings });
    } catch (error: any) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }

  async updateBooking(req: NextApiRequest, res: NextApiResponse) {
    try {
      const _id = req.query.id as string;

      const { name, guests, checkIn, checkOut, phone, email } = req.body;

      if (!name || !guests || !checkIn || !checkOut || !phone || !email) {
        throw new Error("Missing values");
      }

      const matchingBooking: mongoose.Document<unknown, {}, IReserva> | null =
        await this.bookingService.getBookingById(_id);

      if (!matchingBooking) throw new Error("No matching booking found");

      const updatedBooking: mongoose.Document<unknown, {}, IReserva> | null =
        await this.bookingService.updateBooking({
          _id: _id,
          name,
          guests,
          checkIn,
          checkOut,
          phone,
          email,
        });

      res.status(200).json({ error: false, msg: updatedBooking });
    } catch (error: any) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }

  async deleteBooking(req: NextApiRequest, res: NextApiResponse) {
    try {
      const id = req.query.id as string;

      const matchingBooking: mongoose.Document<unknown, {}, IReserva> | null =
        await this.bookingService.getBookingById(id);

      if (!matchingBooking) throw new Error("No matching booking found");

      await this.bookingService.deleteBooking(id);

      res.status(200).json({ error: false, msg: "Deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ msg: err.message });
    }
  }

  async getBookingById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const id = req.query.id as string;

      const matchingBooking: mongoose.Document<unknown, {}, IReserva> | null =
        await this.bookingService.getBookingById(id);

      res.status(200).json({ error: false, msg: matchingBooking });
    } catch (err: any) {
      res.status(400).json({ msg: err.message });
    }
  }
}
