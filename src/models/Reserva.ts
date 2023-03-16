import { IReserva } from "@/interfaces/Reserva";

import { Model, model, models, Schema } from "mongoose";

// Cumple con el tipo enum de la columna cabin??
const reservaSchema: Schema<IReserva> = new Schema({
  name: { type: String, required: true },
  guests: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Reserva: Model<IReserva> =
  models.Reserva || model<IReserva>("Reserva", reservaSchema);

export default Reserva;
