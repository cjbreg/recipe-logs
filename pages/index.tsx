import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddRecipeComponents from "@Components/dashboard/AddRecipeComponents";
import FilterComponent from "@Components/filter/FilterComponent";
import HeaderComponent from "@Components/HeaderComponent";
import Main from "@Components/layout/Main";
import RecipeComponent from "@Components/recipes/RecipeComponent";
import { Recipe } from "../src/models/Recipe";
import Image from "next/image";
import { State } from "src/store/reducers";
import { AuthStates } from "@Models/AuthStates";

const Home: NextPage = () => {
  const router = useRouter();

  const { recipes } = useSelector((state: State) => state.recipeData);
  const { authState } = useSelector((state: any) => state.authData);

  useEffect(() => {
    if (authState === AuthStates.SIGNED_OUT) router.push("/auth");
  }, []);

  const [query, setQuery] = useState("");
  // const [categoriesFilter, setCategoriesFilter] = useState([]);

  const handleNewRecipePress = () => {
    router.push("/recipe/add");
  };

  const renderRecipes = () => {
    if (recipes.length === 0) return renderEmptyState();
    return recipes.map((recipe: Recipe, index: number) => {
      if (!recipe.name.toLowerCase().includes(query.toLowerCase())) return;
      return <RecipeComponent recipe={recipe} key={index} />;
    });
  };

  const renderEmptyState = () => {
    return (
      <div
        className="text-dark h-full hover:cursor-pointer"
        onClick={handleNewRecipePress}
      >
        <Image
          src="/images/undraw_barbecue.svg"
          height={300}
          width={300}
          alt="empty image"
        />
        <p>No recipes found yet.</p>
        <p>Go ahead and add your first recipe!</p>
      </div>
    );
  };

  return (
    <Main>
      <div className="text-center flex flex-col overflow-hidden">
        <div className="pb-8">
          <HeaderComponent />
        </div>
        <div className="pb-2">
          <FilterComponent
            queryChange={setQuery}
            query={query}
            // categories={categoriesFilter}
            // categoriesChange={setCategoriesFilter}
          />
        </div>
        <div className="overflow-y-auto  max-h-fit pb-12 scrollbar-hide">
          {renderRecipes()}
        </div>
        <div
          className="fixed bottom-0 right-0 m-4 mb-20 z-10 hover:cursor-pointer"
          onClick={handleNewRecipePress}
        >
          <AddRecipeComponents />
        </div>
      </div>
    </Main>
  );
};

export default Home;
