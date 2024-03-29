import { useRouter } from 'next/router';
import React from 'react';
import { Clock } from 'react-feather';
import { Recipe } from '../../src/models/Recipe';
import { toggleFavorite } from '../../src/store/actions/recipeAction';
import { useAppDispatch } from '../../src/store/store';
import FavoriteIconComponent from './FavoriteIconComponent';

type Props = {
  recipe: Recipe;
};

const RecipeComponent = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { recipe } = props;

  const handleFavoritePress = (event: any) => {
    event.stopPropagation();
    dispatch(toggleFavorite(recipe));
  };

  const handleNavigateRecipe = (event: any) => {
    event.stopPropagation();

    router.push(`/recipe/${recipe.id}`);
  };

  return (
    <div
      className="w-full my-3 h-48 rounded-3xl bg-cover bg-center "
      style={{ backgroundImage: `url(${recipe.backgroundImageUrl})` }}
      onClick={handleNavigateRecipe}>
      <div className="w-full h-full rounded-3xl bg-gradient-to-b from-transparent to-dark">
        <div className="flex flex-col h-full items-start justify-end p-4 relative">
          <div className="absolute right-0 top-0 m-4 " onClick={handleFavoritePress}>
            <FavoriteIconComponent favorite={recipe.favorite} />
          </div>
          <h1 className="text-white text-2xl font-semibold text-left ">{recipe.name}</h1>
          <div className="flex flex-row text-white items-center">
            <Clock size={18} strokeWidth={1.5} />
            <h4 className="pl-2 text-md ">{recipe.durationMinutes.toString()} min</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeComponent;
