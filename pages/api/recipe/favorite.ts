import { TokenData } from '@Models/TokenData';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateJWT } from '..';
import { toggleFavorite } from '../../../prisma/recipe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userData: TokenData = await authenticateJWT(req, res).catch((message) => {
    throw { message: message, noToken: true };
  });

  try {
    const { recipeId, favorite } = req.body.params;
    switch (req.method) {
      case 'GET':
        return;
      case 'POST':
        return;
      case 'PUT':
        const recipe = await toggleFavorite(recipeId, favorite);
        return res.status(200).json(recipe);
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
