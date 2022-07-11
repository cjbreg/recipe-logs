import React, { useEffect } from "react";
import FavoriteIconComponent from "../../components/recipes/FavoriteIconComponent";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { removeRecipe, toggleFavorite } from "../../store/actions/recipeAction";
import { defaultRecipeState } from "../../store/reducers/recipeReducer";
import BackButtonComponent from "../../components/common/BackButtonComponent";
import RemoveButtonComponent from "../../components/common/RemoveButtonComponent";
import { getCleanString } from "../../shared/helpers";
import Head from "next/head";
import { Clock, Edit, ExternalLink, PenTool } from "react-feather";

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

  const renderDuration = () => {
    return (
      <div className="flex flex-row items-center text-dark">
        <Clock strokeWidth={1} size={20} /> <p className="mx-2">Duration</p>
        <p className="font-medium">{recipe.durationMinutes} minutes</p>
      </div>
    );
  };

  const renderAuthor = () => {
    if (!recipe.metaData?.author) return;
    return (
      <div className="flex flex-row items-center text-dark">
        <PenTool strokeWidth={1} size={20} /> <p className="mx-2">Autor</p>
        <p className="font-medium">{recipe.metaData.author}</p>
      </div>
    );
  };

  const renderDescription = () => {
    if (!recipe.metaData?.description) return;
    return (
      <div className="flex flex-col  text-dark">
        <p className=" font-medium">Description</p>
        <p className="">{recipe.metaData.description}</p>
      </div>
    );
  };

  const renderComment = () => {
    return (
      <div className="flex flex-col  text-dark">
        <p className=" font-medium">Comment</p>
        <p className={recipe.comment ? "" : "opacity-60"}>
          {recipe.comment ?? "No comment available"}
        </p>
      </div>
    );
  };

  const handleNavigateToRecipe = (event: any) => {
    event.preventDefault();
    window.open(recipe.recipeUrl, "_blank", "noopener,noreferrer");
  };

  const renderpPage = () => {
    return (
      <div className="flex flex-col bg-primary min-h-screen	">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{recipe.name}</title>
        </Head>
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
            <div>
              <h1 className="text-dark text-3xl font-bold">{recipe.name}</h1>
              <h4 className="text-dark opacity-60 mt-2">
                {getCleanString(recipe.recipeUrl)}
              </h4>
            </div>
            <div onClick={handleFavoritePress}>
              <FavoriteIconComponent favorite={recipe.favorite} notBlurred />
            </div>
          </div>
          <div className="my-4">
            <div className="my-1">{renderDuration()}</div>
            <div className="my-1">{renderAuthor()}</div>
            <div className="my-3">{renderDescription()}</div>
            <div className="my-3">{renderComment()}</div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleNavigateToRecipe}
              type="submit"
              className=" text-white bg-secondary hover:bg-green-500 flex justify-center focus:ring-4 focus:outline-none focus:ring-green-200  rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center 0"
            >
              <div className="flex items-center">
                <p className="mr-2 ">Open</p> <ExternalLink />
              </div>
            </button>
            {/* <button
              onClick={handleNavigateToRecipe}
              type="submit"
              className="mt-4 text-dark bg-white hover:bg-green-100 flex justify-center focus:ring-4 focus:outline-none focus:ring-green-200  rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center 0"
            >
              <div className="flex items-center">
                <p className="mr-2 ">Edit</p> <Edit />
              </div>
            </button> */}
          </div>
        </div>
      </div>
    );
  };

  return renderpPage();
};

export default Index;
