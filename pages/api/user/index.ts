// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUser, updateUser } from 'prisma/user';
import bcrypt from 'bcryptjs';
import { authenticateJWT } from '..';
import { TokenData } from '@Models/TokenData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData: TokenData = await authenticateJWT(req).catch((message) => {
      throw { message: message, noToken: true };
    });

    switch (req.method) {
      case 'GET':
        const requestUser = await getUser(userData.id);
        return res.status(200).json(requestUser);

      case 'POST':
        const { email, password } = req.body;
        const postUser = await createUser(email, bcrypt.hashSync(password, 8));
        return res.status(200).json(postUser);
      case 'PUT':
        const { id, ...updateData } = req.body;
        const newUser = await updateUser(id, updateData);
        return res.status(200).json(newUser);
      case 'DELETE':
        return;

      default:
        break;
    }
  } catch (error: any) {
    if (error.noToken) return res.status(401).json({ message: error.message });
    return res.status(500).json({ ...error, message: error.message });
  }
}
