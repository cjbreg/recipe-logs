import React from "react";
import { Clock } from "react-feather";
import { Recipe } from "../../models/Recipe";
import { toggleFavorite } from "../../store/actions/recipeAction";
import { useAppDispatch } from "../../store/store";
import FavoriteIconComponent from "./FavoriteIconComponent";

type Props = {
  recipe: Recipe;
};

const RecipeComponent = (props: Props) => {
  const { recipe } = props;

  const dispatch = useAppDispatch();

  const handleFavoritePress = () => {
    console.log("Clicked");
    console.log(recipe);

    dispatch(toggleFavorite(recipe));
  };

  return (
    <div
      className="w-full my-3 h-48 rounded-3xl bg-cover bg-center "
      style={{ backgroundImage: `url(${recipe.backgroundImageUrl})` }}
    >
      <div className="w-full h-full rounded-3xl bg-gradient-to-b from-transparent to-dark">
        <div className="flex flex-col h-full items-start justify-end p-4 relative">
          <div
            className="absolute right-0 top-0 m-4"
            onClick={handleFavoritePress}
          >
            <FavoriteIconComponent favorite={recipe.favorite} />
          </div>
          <h1 className="text-white text-2xl font-semibold text-left ">
            {recipe.name}
          </h1>
          <div className="flex flex-row text-white items-center">
            <Clock size={18} strokeWidth={1.5} />
            <h4 className="pl-2 text-md ">
              {recipe.durationMinutes.toString()} min
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeComponent;
