import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByEmail, verifyEmail } from '../../../prisma/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(405).json({ message: 'Method not allowed' });
      case 'POST':
        const { email, password } = req.body;
        await verifySignup(req, res).catch((message) => {
          throw { message: message, emailTaken: true };
        });

        const user = await createUser(email, bcrypt.hashSync(password, 8));

        var accessToken = jwt.sign({ id: user.id, email: user.email }, secretKey);

        return res.status(200).json({ user, accessToken });
      case 'PUT':
        return res.status(405).json({ message: 'Method not allowed' });
      case 'DELETE':
        return res.status(405).json({ message: 'Method not allowed' });

      default:
        break;
    }
  } catch (error: any) {
    if (error.emailTaken) return res.status(409).json({ message: error.message });
    return res.status(500).json({ ...error, message: error.message });
  }
}

const verifySignup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);
  return new Promise((resolve, reject) => {
    if (user?.email === email) {
      reject('Email aready in use');
    }
    resolve(true);
  });
};
