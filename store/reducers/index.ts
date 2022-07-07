import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";
import sampleReducer from "./sampleReducer";

export default combineReducers({
  sampleData: sampleReducer,
  recipeData: recipeReducer,
});
