import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Main from '@Components/layout/Main';
import RecipeComponent from '@Components/recipes/RecipeComponent';
import { Recipe } from '../src/models/Recipe';
import Image from 'next/image';
import { AuthStates } from '@Models/AuthStates';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

const Favorites: NextPage = () => {
  const router = useRouter();

  const { recipes } = useSelector((state: any) => state.recipeData);
  const { authState } = useSelector((state: any) => state.authData);

  const favoriteRecipes = recipes.filter((recipe: Recipe) => recipe.favorite);

  useEffect(() => {
    const checkAuthState = () => {
      if (authState === AuthStates.SIGNED_OUT) router.push('/auth');
    };

    checkAuthState();
  }, []);

  const renderEmptyState = () => {
    return (
      <div className="text-dark h-full hover:cursor-pointer">
        <Image src="/images/undraw_barbecue.svg" height={300} width={300} alt="empty image" />
        <p>No recipes found yet.</p>
        <p>Go ahead and add your first recipe!</p>
      </div>
    );
  };

  const renderNoFavoritesState = () => {
    return (
      <div className="text-dark h-full hover:cursor-pointer">
        <Image src="/images/undraw_add_files.svg" height={300} width={300} alt="empty image" />
        <p>No favorite recipes found</p>
        <p>Go ahead and favorite your first recipe!</p>
      </div>
    );
  };

  const renderRecipes = () => {
    if (recipes.length === 0) return renderEmptyState();
    if (favoriteRecipes.length === 0) return renderNoFavoritesState();
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

        <div className="overflow-y-auto  max-h-fit pb-12 scrollbar-hide">{renderRecipes()}</div>
      </div>
    </Main>
  );
};

export default Favorites;
