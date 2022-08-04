import { TokenData } from "@Models/TokenData";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWT } from "..";
import { createRecipe, deleteRecipe, getRecipes } from "../../../prisma/recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const currentUser: TokenData = await authenticateJWT(req, res).catch(
          (message) => {
            throw { message: message, noToken: true };
          }
        );
        const recipes = await getRecipes(currentUser.id);
        return res.status(200).json(recipes);
      case "POST":
        const user: TokenData = await authenticateJWT(req, res).catch(
          (message) => {
            throw { message: message, noToken: true };
          }
        );

        const { newRecipe, metaData } = req.body;
        const recipe = await createRecipe(newRecipe, metaData, user.id);
        return res.status(200).json(recipe);
      case "PUT":
        return;
      case "DELETE":
        const { recipeId } = req.body;
        const removedRecipe = await deleteRecipe(recipeId);
        return res.status(200).json(removedRecipe);

      default:
        break;
    }
  } catch (error: any) {
    if (error.noToken) return res.status(401).json({ message: error.message });
    return res.status(500).json({ ...error, message: error.message });
  }
}
