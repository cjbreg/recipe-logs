import type { NextApiRequest, NextApiResponse } from "next";
import { createRecipe, getAllRecipes } from "../../../prisma/recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const user: TokenData = await authenticateJWT(req, res).catch((message) => {
    //   throw { message: message, noToken: true };
    // });

    switch (req.method) {
      case "GET":
        const recipes = await getAllRecipes();
        return res.status(200).json(recipes);
      case "POST":
        const { newRecipe, metaData } = req.body;

        console.log("recipeData", newRecipe);
        console.log("metaData", metaData);

        const recipe = await createRecipe(newRecipe, metaData);
        return res.status(200).json(recipe);
      case "PUT":
        return;
      case "DELETE":
        return;

      default:
        break;
    }
  } catch (error: any) {
    if (error.noToken) return res.status(401).json({ message: error.message });
    return res.status(500).json({ ...error, message: error.message });
  }
}
