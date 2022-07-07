import type { NextPage } from "next";
import FilterComponent from "../components/FilterComponent";
import HeaderComponent from "../components/HeaderComponent";
import RecipeComponent from "../components/recipes/RecipeComponent";
import { recipes } from "../shared/fakeData";

const Home: NextPage = () => {
  return (
    <div className="text-center container mx-auto px-4 py-8 flex flex-col">
      <div className="pb-8">
        <HeaderComponent />
      </div>
      <div className="pb-8">
        <FilterComponent />
      </div>
      <div className="overflow-y-auto">
        {recipes.map((recipe: any, index: number) => {
          return <RecipeComponent recipe={recipe} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Home;
