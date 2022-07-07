import produce from "immer";
import { Recipe } from "../../models/Recipe";
import { recipes } from "../../shared/fakeData";
import {
  GET_SAMPLE,
  RECIPE_ERROR,
  RECIPE_TOGGLED_FAVORITE,
  RECIPE_TOGGLE_FAVORITE,
} from "../types";

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: Error;
}

type Error = {
  enabled: boolean;
};

const initialState: RecipeState = {
  recipes: recipes,
  loading: false,
  error: {
    enabled: false,
  },
};

const recipeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SAMPLE:
      return {
        ...state,
        sample: action.payload,
        loading: false,
      };

    case RECIPE_TOGGLE_FAVORITE:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.recipes.map((recipe) => {
          if (recipe.id === action.payload.id) {
            recipe.favorite = !recipe.favorite;
          }
        });
      });

    case RECIPE_ERROR:
      return produce(state, (draftState) => {
        draftState.error = {
          ...action.payload,
        };
        draftState.error.enabled = true;
        draftState.loading = false;
      });

    default:
      return state;
  }
};

export default recipeReducer;
