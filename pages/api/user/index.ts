// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../../../prisma/user";
import bcrypt from "bcryptjs";
import { authenticateJWT } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await authenticateJWT(req, res).catch((message) => {
      throw { message: message, noToken: true };
    });
    switch (req.method) {
      case "GET":
        if (req.query.id) {
          // @ts-ignore
          const user = await getUser(req.query.id);
          return res.status(200).json(user);
        } else {
          // Otherwise, fetch all users
          const users = await getAllUsers();
          return res.status(200).json(users);
        }
      case "POST":
        const { email, password } = req.body;
        const postUser = await createUser(email, bcrypt.hashSync(password, 8));
        return res.status(200).json(postUser);
      case "PUT":
        const { id, ...updateData } = req.body;
        const user = await updateUser(id, updateData);
        return res.status(200).json(user);
      case "DELETE":
        return;

      default:
        break;
    }
  } catch (error: any) {
    console.log(error);
    if (error.noToken) return res.status(401).json({ message: error.message });
    return res.status(500).json({ ...error, message: error.message });
  }
}
