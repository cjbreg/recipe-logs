import produce from 'immer';
import { Recipe } from '@Models/Recipe';
import {
  AUTH_SIGNOUT,
  GET_SAMPLE,
  RECIPE_ADD_RECIPE,
  RECIPE_ADD_RECIPES,
  RECIPE_ERROR,
  RECIPE_REMOVE_RECIPE,
  RECIPE_RESET_RECIPES,
  RECIPE_TOGGLE_FAVORITE
} from '../types';
import { remove } from 'lodash';
import { MetaData } from '@Models/MetaData';

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: Error;
}

type Error = {
  enabled: boolean;
};

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: {
    enabled: false
  }
};

export const defaultMetaDataState: MetaData = {
  id: '',
  image: '',
  publisher: '',
  title: ''
};

export const defaultRecipeState: Recipe = {
  id: '',
  name: '',
  recipeUrl: '',
  backgroundImageUrl: '',
  favorite: false,
  userId: '',
  durationMinutes: 0,
  comment: '',
  metaData: defaultMetaDataState
};

const recipeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SAMPLE:
      return {
        ...state,
        sample: action.payload,
        loading: false
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

    case RECIPE_ADD_RECIPE:
      return produce(state, (draftState) => {
        draftState.recipes.push(action.payload);
      });

    case RECIPE_ADD_RECIPES:
      return produce(state, (draftState) => {
        draftState.recipes = action.payload.data;
      });

    case RECIPE_REMOVE_RECIPE:
      return produce(state, (draftState) => {
        remove(draftState.recipes, (recipe) => recipe.id === action.payload.id);
      });

    case RECIPE_ERROR:
      return produce(state, (draftState) => {
        draftState.error = {
          ...action.payload
        };
        draftState.error.enabled = true;
        draftState.loading = false;
      });

    case RECIPE_RESET_RECIPES:
      return produce(state, (draftState) => {
        draftState.recipes = [];
      });

    case AUTH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};

export default recipeReducer;
