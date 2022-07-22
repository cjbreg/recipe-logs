// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../../../prisma/user";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        if (req.query.id) {
          const user = await getUser(req.query.id);
          return res.status(200).json(user);
        } else {
          // Otherwise, fetch all users
          const users = await getAllUsers();
          return res.json(users);
        }
      case "POST":
        const { email, password } = req.body;
        const postUser = await createUser(email, bcrypt.hashSync(password, 8));
        return res.json(postUser);
      case "PUT":
        const { id, ...updateData } = req.body;
        const user = await updateUser(id, updateData);
        return res.json(user);
      case "DELETE":
        return;

      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message });
  }
}
