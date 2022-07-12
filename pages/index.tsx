import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AddRecipeComponents from "../components/dashboard/AddRecipeComponents";
import FilterComponent from "../components/FilterComponent";
import HeaderComponent from "../components/HeaderComponent";
import Main from "../components/layout/Main";
import RecipeComponent from "../components/recipes/RecipeComponent";

const Home: NextPage = () => {
  const router = useRouter();

  const { recipes } = useSelector((state: any) => state.recipeData);

  const handleNewRecipePress = () => {
    router.push("/recipe/add");
  };

  return (
    <Main>
      <div className="text-center flex flex-col overflow-hidden">
        <div className="pb-8">
          <HeaderComponent />
        </div>
        <div className="pb-8">
          <FilterComponent />
        </div>
        <div className="overflow-y-auto  max-h-fit pb-12 scrollbar-hide">
          {recipes.map((recipe: any, index: number) => {
            return <RecipeComponent recipe={recipe} key={index} />;
          })}
        </div>
        <div
          className="fixed bottom-0 right-0 m-4 mb-20 z-10"
          onClick={handleNewRecipePress}
        >
          <AddRecipeComponents />
        </div>
      </div>
    </Main>
  );
};

export default Home;
