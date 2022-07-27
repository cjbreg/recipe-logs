import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authRecucer";
import recipeReducer, { RecipeState } from "./recipeReducer";
import sampleReducer from "./sampleReducer";

export interface State {
  authData: AuthState;
  recipeData: RecipeState;
}

export default combineReducers({
  sampleData: sampleReducer,
  recipeData: recipeReducer,
  authData: authReducer,
});
