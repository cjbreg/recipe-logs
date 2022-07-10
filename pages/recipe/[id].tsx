import React from "react";
import FavoriteIconComponent from "../../components/recipes/FavoriteIconComponent";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { removeRecipe, toggleFavorite } from "../../store/actions/recipeAction";
import { defaultRecipeState } from "../../store/reducers/recipeReducer";
import BackButtonComponent from "../../components/common/BackButtonComponent";
import RemoveButtonComponent from "../../components/common/RemoveButtonComponent";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  const recipe = useSelector(
    (state: any) =>
      state.recipeData.recipes.find((x: any) => x.id === id) ??
      defaultRecipeState
  );

  const handleFavoritePress = () => {
    dispatch(toggleFavorite(recipe));
  };

  const handleRemovePress = () => {
    dispatch(removeRecipe(recipe));
    router.push("/");
  };

  const renderpPage = () => {
    return (
      <div className="flex flex-col bg-primary min-h-screen	">
        <div className="absolute left-0 top-0 m-4 pt-8">
          <BackButtonComponent />
        </div>
        <div
          className="absolute right-0 top-0 m-4 pt-8"
          onClick={handleRemovePress}
        >
          <RemoveButtonComponent />
        </div>
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(${recipe.backgroundImageUrl} )`,
          }}
        />
        <div className="container mx-auto px-4 py-4 -mt-8 rounded-t-3xl bg-primary ">
          <div className=" flex flew-row justify-between">
            <h1 className="text-dark text-3xl font-bold">{recipe.name}</h1>
            <div onClick={handleFavoritePress}>
              <FavoriteIconComponent favorite={recipe.favorite} notBlurred />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  };

  return renderpPage();
};

export default Index;
