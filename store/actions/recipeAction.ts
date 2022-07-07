import { Recipe } from "../../models/Recipe";
import { RECIPE_ERROR, RECIPE_TOGGLE_FAVORITE } from "../types";

export const toggleFavorite = (recipe: Recipe) => ({
  type: RECIPE_TOGGLE_FAVORITE,
  payload: recipe,
});
