import { IReserva } from "@/interfaces/Reserva";
import { connectMongoDb, disconnectMongoDb } from "@/db/database";
import Reserva from "@/models/Reserva";
import mongoose from "mongoose";

// const newBooking = {
//   name: "Juan Juan",
//   guests: 3,
//   checkIn: new Date(),
//   checkOut: new Date(),
//   phone: "+511173673976",
//   email: "mederocc@gmail.com",
// };

// {
//   "name":"Juan Juan",
//   "guests":3,
//   "checkIn":"2023-03-13T15:27:05.414Z",
//   "checkOut":"2023-03-13T15:27:05.414Z",
//   "phone":"+511173673976",
//   "email":"mederocc@gmail.com"
// }

export default class BookingService {
  constructor() {}

  async createBooking(booking: IReserva): Promise<mongoose.Document> {
    await connectMongoDb();
    const newBooking = await Reserva.create(booking);
    await disconnectMongoDb();
    return newBooking;
  }

  async getBookings(): Promise<mongoose.Document<{}, IReserva>[]> {
    await connectMongoDb();
    const bookings: mongoose.Document<{}, IReserva>[] = await Reserva.find();
    await disconnectMongoDb();
    return bookings;
  }

  async updateBooking(
    booking: IReserva
  ): Promise<mongoose.Document<unknown, {}, IReserva> | null> {
    await connectMongoDb();

    const _id = booking._id as string;
    console.log(booking);

    const updatedBooking = await Reserva.findOneAndUpdate(
      { _id: _id },
      {
        ...booking,
      },
      {
        new: true,
      }
    );

    await disconnectMongoDb();

    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<void> {
    await connectMongoDb();

    const matchingBooking: any = await Reserva.deleteOne({ _id: id });

    await disconnectMongoDb();

    return matchingBooking;
  }

  async getBookingById(
    id: string
  ): Promise<mongoose.Document<unknown, {}, IReserva> | null> {
    await connectMongoDb();

    const matchingBooking: mongoose.Document<unknown, {}, IReserva> | null =
      await Reserva.findOne({ _id: id });

    await disconnectMongoDb();

    return matchingBooking;
  }
}
