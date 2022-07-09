import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../../models/Recipe";
import { addRecipe } from "../../store/actions/recipeAction";
import { useAppDispatch } from "../../store/store";
import { useRouter } from "next/router";

const Add = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [recipeUrl, setRecipeUrl] = useState("");
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState();
  const [comment, setComment] = useState("");

  const handleRecipeUrlChange = (event: any) =>
    setRecipeUrl(event.target.value);
  const handleNameChange = (event: any) => setName(event.target.value);
  const handleDurationMinutesChange = (event: any) =>
    setDurationMinutes(event.target.value);
  const handleCommentChange = (event: any) => setComment(event.target.value);

  const handleSubminRecipe = (event: any) => {
    event.preventDefault();
    const newRecipe: Recipe = {
      id: uuidv4(),
      name,
      recipeUrl,
      durationMinutes: durationMinutes ?? 0,
      favorite: false,
      backgroundImageUrl:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      comment,
    };
    dispatch(addRecipe(newRecipe));
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <div className="pb-8">
        <h1 className="text-dark text-3xl font-bold">Add new recipe</h1>
      </div>
      <div>
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={recipeUrl}
              type="text"
              name="recipe_url"
              className="block py-2.5 px-0 w-full text-sm text-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
              onChange={handleRecipeUrlChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Recipe URL
            </label>
          </div>
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
              name="duration_minutes"
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
            className="text-white bg-secondary hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 0"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
