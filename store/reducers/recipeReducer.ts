import { Recipe } from "../../models/Recipe";
import { recipes } from "../../shared/fakeData";
import { GET_SAMPLE, RECIPE_ERROR, SAMPLE_ERROR } from "../types";

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

    case RECIPE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default recipeReducer;
