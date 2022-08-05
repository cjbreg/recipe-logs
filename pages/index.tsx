import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddRecipeComponents from "@Components/dashboard/AddRecipeComponents";
import FilterComponent from "@Components/filter/FilterComponent";
import Main from "@Components/layout/Main";
import RecipeComponent from "@Components/recipes/RecipeComponent";
import { Recipe } from "../src/models/Recipe";
import Image from "next/image";
import { State } from "src/store/reducers";
import { AuthStates } from "@Models/AuthStates";
import axios from "axios";
import { useAppDispatch } from "src/store/store";
import { addRecipes } from "src/store/actions/recipeAction";
import LoadingView from "@Components/common/LoadingView";
import { RefreshCw } from "react-feather";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { recipes } = useSelector((state: State) => state.recipeData);
  const { authState, accessToken } = useSelector(
    (state: any) => state.authData
  );

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const checkAuthState = () => {
      if (authState === AuthStates.SIGNED_OUT) router.push("/auth");
    };
    if (authState === AuthStates.SIGNED_IN && recipes.length === 0) {
      getRecipes();
    }
    checkAuthState();
  }, [authState]);

  const handleNewRecipePress = () => {
    router.push("/recipe/add");
  };

  const getRecipes = async () => {
    setLoading(true);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const data = await axios.get("/api/recipe", axiosConfig);
    dispatch(addRecipes(data));
    setLoading(false);
    try {
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderRecipes = () => {
    if (loading) return <LoadingView />;
    if (recipes.length === 0 || loading) return renderEmptyState();
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

  const renderRefreshButton = () => (
    <button onClick={getRecipes}>
      {loading ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
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
        <div className="overflow-y-auto max-h-fit pb-20 scrollbar-hide">
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
