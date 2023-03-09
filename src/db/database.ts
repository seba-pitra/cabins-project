import mongoose from 'mongoose';

const mongooConnection = {
  isConnected: 0,
};

export const connectMongoDb = async () => {
  console.log("env: ", process.env.URL_MONGO!)

  if (mongooConnection.isConnected) {
    console.log('Ya estabamos conectados');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooConnection.isConnected === 1) {
      console.log('Usando conection anterior');
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.URL_MONGO!);
  mongooConnection.isConnected = 1;
  console.log('Conectado a MongoDB' + process.env.URL_MONGO);
};

export const disconnectMongoDb = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongooConnection.isConnected === 0) return;

  await mongoose.disconnect();
  console.log('Desconectado de MongoDB');
};