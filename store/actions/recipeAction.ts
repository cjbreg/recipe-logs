import { Recipe } from "../../models/Recipe";
import {
  RECIPE_ERROR,
  RECIPE_TOGGLE_FAVORITE,
  RECIPE_ADD_RECIPE,
} from "../types";

export const toggleFavorite = (recipe: Recipe) => ({
  type: RECIPE_TOGGLE_FAVORITE,
  payload: recipe,
});

export const addRecipe = (recipe: Recipe) => ({
  type: RECIPE_ADD_RECIPE,
  payload: recipe,
});
