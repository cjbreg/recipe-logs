import type { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddRecipeComponents from '@Components/dashboard/AddRecipeComponents';
import FilterComponent from '@Components/filter/FilterComponent';
import Main from '@Components/layout/Main';
import RecipeComponent from '@Components/recipes/RecipeComponent';
import { Recipe } from '../src/models/Recipe';
import Image from 'next/image';
import LoadingView from '@Components/common/LoadingView';
import { RefreshCw } from 'react-feather';
import { verifyToken } from 'src/web/token';
import { useFetchRecipes } from 'src/hooks/useRecipe';

const Home: NextPage = () => {
  const router = useRouter();

  const { data: recipes, isLoading, refetch, isFetching, isFetched } = useFetchRecipes();

  const [query, setQuery] = useState('');

  const handleNewRecipePress = () => {
    router.push('/recipe/add');
  };

  const handleGetRecipes = () => {
    refetch();
  };

  const renderRecipes = () => {
    if (isLoading || isFetching) return <LoadingView />;
    if (!recipes) return renderEmptyState();
    return recipes.map((recipe: Recipe, index: number) => {
      if (!recipe.name.toLowerCase().includes(query.toLowerCase())) return;
      return <RecipeComponent recipe={recipe} key={index} />;
    });
  };

  const renderEmptyState = () => {
    return (
      <div className="text-dark h-full hover:cursor-pointer" onClick={handleNewRecipePress}>
        <Image src="/images/undraw_barbecue.svg" height={300} width={300} alt="empty image" />
        <p>No recipes found yet.</p>
        <p>Go ahead and add your first recipe!</p>
      </div>
    );
  };

  const renderRefreshButton = () => (
    <button onClick={handleGetRecipes}>
      {isLoading || isFetching ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
    </button>
  );

  return (
    <Main>
      <div className="text-center flex flex-col overflow-hidden">
        <div className="pb-8">
          <div className="flex justify-between">
            <h1 className="text-dark text-3xl font-bold">Your Recipes</h1>
            {renderRefreshButton()}
          </div>
        </div>
        <div className="pb-2">
          <FilterComponent queryChange={setQuery} query={query} />
        </div>
        <div className="overflow-y-auto max-h-fit pb-20 scrollbar-hide">{renderRecipes()}</div>
        <div
          className="fixed bottom-0 right-0 m-4 mb-20 z-10 hover:cursor-pointer"
          onClick={handleNewRecipePress}>
          <AddRecipeComponents />
        </div>
      </div>
    </Main>
  );
};

export default Home;

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
