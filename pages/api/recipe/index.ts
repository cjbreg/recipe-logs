import { TokenData } from '@Models/TokenData';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateJWT } from '..';
import { createRecipe, deleteRecipe, getRecipes } from 'prisma/recipe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userData: TokenData = await authenticateJWT(req, res).catch((message) => {
    throw { message: message, noToken: true };
  });

  try {
    switch (req.method) {
      case 'GET':
        const recipes = await getRecipes(userData.id);
        return res.status(200).json(recipes);
      case 'POST':
        const { newRecipe, metaData } = req.body;
        const recipe = await createRecipe(newRecipe, metaData, userData.id);
        return res.status(200).json(recipe);
      case 'PUT':
        return;
      case 'DELETE':
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
