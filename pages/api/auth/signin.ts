import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "../../../prisma/user";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        return res.status(405).json({ message: "Method not allowed" });
      case "POST":
        const { email, password } = req.body;

        if (email === "" || password === "") {
          return res
            .status(400)
            .json({ message: "Incorrect username or password" });
        }
        const user = await getUserByEmail(email);

        if (!user) {
          return res
            .status(400)
            .json({ message: "Incorrect username or password" });
        }

        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          return res
            .status(400)
            .json({ message: "Incorrect username or password" });
        }

        return res.status(200).json(user);
      case "PUT":
        return res.status(405).json({ message: "Method not allowed" });
      case "DELETE":
        return res.status(405).json({ message: "Method not allowed" });

      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ ...error, message: error.message });
  }
}
