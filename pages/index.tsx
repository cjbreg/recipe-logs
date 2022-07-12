import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddRecipeComponents from "../components/dashboard/AddRecipeComponents";
import FilterComponent from "../components/filter/FilterComponent";
import HeaderComponent from "../components/HeaderComponent";
import Main from "../components/layout/Main";
import RecipeComponent from "../components/recipes/RecipeComponent";
import { Recipe } from "../models/Recipe";

const Home: NextPage = () => {
  const router = useRouter();

  const { recipes } = useSelector((state: any) => state.recipeData);

  const [query, setQuery] = useState("");
  // const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    if (query === "") {
      setFilteredRecipes(recipes);
      return;
    }

    let newRecipeList: Recipe[] = recipes;

    if (query) {
      newRecipeList = recipes.filter((recipe: Recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(newRecipeList);
      return;
    }
  }, [query]);

  const handleNewRecipePress = () => {
    router.push("/recipe/add");
  };

  const renderRecipes = () => {
    return filteredRecipes.map((recipe: Recipe, index: number) => (
      <RecipeComponent recipe={recipe} key={index} />
    ));
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
