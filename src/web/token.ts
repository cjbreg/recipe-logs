import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { getUserByEmail } from 'prisma/user';

const SECRET_KEY = process.env.SECRET_KEY || '';
export const cookieOptions = {
  path: '/',
  sameSite: true,
  secure: process.env.NODE_ENV === 'production'
};

export const verifyToken = async (req: IncomingMessage & { cookies: NextApiRequestCookies }) => {
  const { auth } = req.cookies;
  if (!auth) return undefined;

  const { token } = JSON.parse(auth);

  try {
    const userData = jwt.verify(token, SECRET_KEY);
    if (!userData) return undefined;

    return userData;
  } catch (error) {
    return undefined;
  }
};
