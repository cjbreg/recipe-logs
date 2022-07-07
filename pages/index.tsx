import type { NextPage } from "next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FilterComponent from "../components/FilterComponent";
import HeaderComponent from "../components/HeaderComponent";
import RecipeComponent from "../components/recipes/RecipeComponent";
import { getSampleData } from "../store/actions/sampleAction";
import { useAppDispatch } from "../store/store";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const sampleListData = useSelector((state: any) => state.sampleData);
  const { sample } = sampleListData;

  const { recipes } = useSelector((state: any) => state.recipeData);
  useEffect(() => {
    dispatch(getSampleData());
  }, []);

  return (
    <div className="text-center container mx-auto px-4 py-8 flex flex-col">
      <h1>{sample}</h1>
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
