import { useState } from 'react';

import { Form, Formik } from 'formik';
import * as yup from 'yup';

import emailjs from '@emailjs/browser';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

interface IBooking {
  fullname: string;
  cellphone: string;
  email: string;
  income: string;
  exit: string;
  adult: number;
  child: number;
  message: string;
}

const schemaValidation = yup.object({
  fullname: yup.string().required('Fullname is required'),
  cellphone: yup.string().required('Cellphone is required'),
  email: yup.string().email().required('Email is required'),
  adult: yup.number().required('Adulto is required'),
  message: yup.string().required('Mensage is required'),
});

export const Contact = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const initialValue: IBooking = {
    fullname: '',
    cellphone: '',
    email: '',
    income: dateRange.startDate.toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    }),
    exit: dateRange.endDate.toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    }),
    adult: 0,
    child: 0,
    message: '',
  };

  const sendReservation = (values: IBooking) => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        { initialValue, ...values },
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values) => sendReservation(values)}
      validationSchema={schemaValidation}
    >
      {({ handleChange }) => (
        <Form className="flex flex-col border-2 px-20 py-10 mb-10 border-red-500 max-w-[800px] gap-4">
          <label className="grid">
            <span>Tu Nombre</span>
            <input
              type="text"
              name="fullname"
              className="bg-slate-200"
              onChange={handleChange}
            />
          </label>
          <div className="flex justify-between gap-8">
            <label className="grid w-full">
              <span>Telefono</span>
              <input
                type="number"
                name="cellphone"
                className="bg-slate-200"
                onChange={handleChange}
              />
            </label>

            <label className="grid w-full">
              <span>Email</span>
              <input
                type="email"
                name="email"
                className="bg-slate-200"
                onChange={handleChange}
              />
            </label>
          </div>

          <DateRangePicker
            onChange={(item) => setDateRange(item.selection as any)}
            moveRangeOnFirstSelection={false}
            ranges={[dateRange]}
            minDate={new Date()}
          />

          <div className="flex gap-8">
            <label className="grid w-full">
              <span>Adultos</span>
              <input
                type="number"
                name="adult"
                className="bg-slate-200"
                onChange={handleChange}
                placeholder="1"
              />
            </label>

            <label className="grid w-full">
              <span>Niños</span>
              <input
                type="number"
                name="child"
                className="bg-slate-200"
                onChange={handleChange}
                placeholder="0"
              />
            </label>
          </div>
          <label className="grid w-full">
            <span>Message</span>
            <textarea
              name="message"
              className="bg-slate-200"
              onChange={handleChange}
              placeholder="Puedes hacer preguntas o aclaraciones sobre la reserva"
            />
          </label>
          <button type="submit" className="bg-green-400 py-2">
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};
