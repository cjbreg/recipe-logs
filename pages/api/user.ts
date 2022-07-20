// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../../prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("got here");
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
        const { email, username, password } = req.body;
        const postUser = await createUser(email, username, password);
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
    console.log(req.body);
    return res.status(500).json({ ...error, message: error.message });
  }
}
