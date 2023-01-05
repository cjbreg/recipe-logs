import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { TokenData } from '@Models/TokenData';

export const authenticateJWT = async (req: NextApiRequest, response: NextApiResponse) => {
  const cookies = req.cookies;
  const secretKey = process.env.SECRET_KEY || '';

  return new Promise<TokenData>((resolve, reject) => {
    if (cookies) {
      const { auth } = cookies;
      if (!auth) return reject('No token present');
      const { token } = JSON.parse(auth);

      jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
          return reject('Token is not valid');
        }
        // @ts-ignore
        return resolve(user);
      });
    } else {
      return reject('No token present');
    }
  });
};
