import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { TokenData } from "../../src/models/TokenData";

export const authenticateJWT = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY || "";

  return new Promise<TokenData>((resolve, reject) => {
    console.log(req.headers);

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return reject("Token is not valid");
        }
        // @ts-ignore
        return resolve(user);
      });
    } else {
      return reject("No token present");
    }
  });
};
