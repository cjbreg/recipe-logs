import { combineReducers } from "redux";
import authReducer from "./authRecucer";
import recipeReducer from "./recipeReducer";
import sampleReducer from "./sampleReducer";

export default combineReducers({
  sampleData: sampleReducer,
  recipeData: recipeReducer,
  authData: authReducer,
});
