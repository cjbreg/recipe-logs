import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import HeaderComponent from "../components/HeaderComponent";
import Main from "../components/layout/Main";
import RecipeComponent from "../components/recipes/RecipeComponent";
import { Recipe } from "../models/Recipe";

const Favorites = () => {
  const router = useRouter();

  const { recipes } = useSelector((state: any) => state.recipeData);

  const renderRecipes = () => {
    return recipes.map((recipe: Recipe, index: number) => {
      if (!recipe.favorite) return;
      return <RecipeComponent recipe={recipe} key={index} />;
    });
  };

  return (
    <Main>
      <div className="text-center flex flex-col overflow-hidden">
        <div className="pb-8">
          <div className="flex">
            <h1 className="text-dark text-3xl font-bold">Favorite Recipes</h1>
          </div>
        </div>

        <div className="overflow-y-auto  max-h-fit pb-12 scrollbar-hide">
          {renderRecipes()}
        </div>
      </div>
    </Main>
  );
};

export default Favorites;
