import React from 'react';
import { useSelector } from 'react-redux';
import Main from '@Components/layout/Main';
import RecipeComponent from '@Components/recipes/RecipeComponent';
import { Recipe } from '@Models/Recipe';
import Image from 'next/image';
import { GetServerSidePropsContext, NextPage } from 'next/types';
import { verifyToken } from 'src/web/token';

const Favorites: NextPage = () => {
  const { recipes } = useSelector((state: any) => state.recipeData);

  const favoriteRecipes = recipes.filter((recipe: Recipe) => recipe.favorite);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await verifyToken(context.req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth'
      },
      props: {}
    };
  }
  return {
    props: {}
  };
}
