import { Recipe } from '../../models/Recipe';
import {
  RECIPE_TOGGLE_FAVORITE,
  RECIPE_ADD_RECIPE,
  RECIPE_REMOVE_RECIPE,
  RECIPE_ADD_RECIPES
} from '../types';

export const toggleFavorite = (recipe: Recipe) => ({
  type: RECIPE_TOGGLE_FAVORITE,
  payload: recipe
});

export const addRecipe = (recipe: Recipe) => ({
  type: RECIPE_ADD_RECIPE,
  payload: recipe
});

export const removeRecipe = (recipe: Recipe) => ({
  type: RECIPE_REMOVE_RECIPE,
  payload: recipe
});

export const addRecipes = (recipes: any) => ({
  type: RECIPE_ADD_RECIPES,
  payload: recipes
});
