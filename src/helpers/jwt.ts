import jwt from 'jsonwebtoken';

type Payload = {
  uid: string;
  name: string;
};

export const generateJWT = (uid: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload: Payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      {
        expiresIn: '2h',
      },
      (err: Error | null, token?: string) => {
        if (err) {
          console.error(err);
          reject('Could not generate token');
        }

        if (!token) {
          reject('Token was not generated');
        }

        resolve(token!);
      }
    );
  });
};
