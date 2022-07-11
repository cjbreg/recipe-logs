import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../../models/Recipe";
import { addRecipe } from "../../store/actions/recipeAction";
import { useAppDispatch } from "../../store/store";
import { useRouter } from "next/router";
import { Image } from "react-feather";
import { MetaData } from "../../models/MetaData";
import Page from "../../components/layout/Page";

const Add = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [recipeUrl, setRecipeUrl] = useState("");
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState();
  const [comment, setComment] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [metaData, setMetaData] = useState<MetaData>();

  useEffect(() => {
    if (!metaData) return;
    setName(metaData.title);
    setBackgroundImageUrl(metaData.image);
  }, [metaData]);

  const handleRecipeUrlChange = (event: any) =>
    setRecipeUrl(event.target.value);
  const handleNameChange = (event: any) => setName(event.target.value);
  const handleDurationMinutesChange = (event: any) =>
    setDurationMinutes(event.target.value);
  const handleCommentChange = (event: any) => setComment(event.target.value);

  const handleSubminRecipe = (event: any) => {
    event.preventDefault();
    let newRecipe: Recipe = {
      id: uuidv4(),
      name,
      recipeUrl,
      durationMinutes: durationMinutes ?? 0,
      favorite: false,
      backgroundImageUrl,
    };
    if (comment !== "" || null) {
      newRecipe = {
        ...newRecipe,
        comment,
      };
    }
    if (metaData) {
      newRecipe = {
        ...newRecipe,
        metaData,
      };
    }
    dispatch(addRecipe(newRecipe));
    router.push("/");
  };

  const fetchMetaData = async (event: any) => {
    event.preventDefault();
    const res = await fetch(
      "/api/metascraper?" +
        new URLSearchParams({
          targetUrl: recipeUrl,
        })
    );
    const data = await res.json();

    setMetaData(data.data);
  };

  const renderBackgroundUrl = () => {
    if (backgroundImageUrl) {
      return (
        <div
          className="w-full h-48 bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(${backgroundImageUrl} )`,
          }}
        />
      );
    }
    return (
      <div className="w-full h-48 bg-cover bg-center rounded-xl flex justify-center items-center border-2">
        <Image size={48} className="text-primary" />
      </div>
    );
  };

  return (
    <Page>
      <div className="pb-8">
        <h1 className="text-dark text-3xl font-bold">Add new recipe</h1>
      </div>
      <div>
        <form>
          <div className="relative z-0  mb-6 group flex">
            <div className="relative w-full">
              <input
                type="text"
                className="block py-2.5  px-0 w-full text-sm text-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
                required
                onChange={handleRecipeUrlChange}
                value={recipeUrl}
                name="recipe_url"
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Recipe Url
              </label>
            </div>
            <button
              type="submit"
              onClick={fetchMetaData}
              className="p-2.5 ml-2 text-sm font-medium text-white bg-primary rounded-lg border-0  hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-200 "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={name}
              type="text"
              name="recipe_name"
              className="block py-2.5 px-0 w-full text-sm text-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
              onChange={handleNameChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Recipe name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className=" text-sm text-gray-500 scale-75 top-3     ">
              Image
            </label>
            {renderBackgroundUrl()}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={durationMinutes}
              type="number"
              name="duration_minutes"
              className="block py-2.5 px-0 w-full text-sm text-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
              onChange={handleDurationMinutesChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Duration (minutes)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              value={comment}
              name="comment"
              className="block h-24 py-2.5 px-0 w-full text-sm text-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
              onChange={handleCommentChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Comment
            </label>
          </div>

          <button
            onClick={handleSubminRecipe}
            type="submit"
            className="text-white bg-secondary hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 0"
          >
            Submit
          </button>
        </form>
      </div>
    </Page>
  );
};

export default Add;
