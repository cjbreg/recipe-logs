import React, { useEffect, useState } from 'react';
import { addRecipe } from '../../src/store/actions/recipeAction';
import { useAppDispatch } from '../../src/store/store';
import { useRouter } from 'next/router';
import { Image as ImageIcon, Search } from 'react-feather';
import { MetaData } from '../../src/models/MetaData';
import Page from '@Components/layout/Page';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { State } from '../../src/store/reducers';
import { GetServerSidePropsContext, NextPage } from 'next/types';
import { Recipe } from '@Models/Recipe';
import { verifyToken } from 'src/web/token';

const Add: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { id, accessToken } = useSelector((state: State) => state.authData);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [name, setName] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [comment, setComment] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [metaData, setMetaData] = useState<MetaData>();

  useEffect(() => {
    if (!metaData) return;
    setName(metaData.title);
    setBackgroundImageUrl(metaData.image);
  }, [metaData]);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  const handleRecipeUrlChange = (event: any) => setRecipeUrl(event.target.value);
  const handleNameChange = (event: any) => setName(event.target.value);
  const handleDurationMinutesChange = (event: any) => setDurationMinutes(event.target.value);
  const handleCommentChange = (event: any) => setComment(event.target.value);

  const handleSubminRecipe = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const newRecipe: Recipe = {
      name,
      recipeUrl,
      durationMinutes: parseInt(durationMinutes) ?? 0,
      favorite: false,
      backgroundImageUrl,
      userId: id,
      categories: []
    };

    try {
      const params = {
        newRecipe: newRecipe,
        metaData
      };
      const recipeData = await axios
        .post('/api/recipe', params, axiosConfig)
        .then((res) => res.data);

      dispatch(addRecipe(recipeData));
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log('ERROR: ', error);
    }
  };

  const handleCancelPress = () => {
    router.back();
  };

  const fetchMetaData = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        '/api/metascraper?' +
          new URLSearchParams({
            targetUrl: recipeUrl
          })
      );

      const data = await res.json();

      setLoading(false);
      setMetaData(data.data);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log('ERROR: ', error);
    }
  };

  const isDisabled = () => {
    if (loading) return true;
    if (recipeUrl === '') return true;
    if (name === '') return true;
    if (durationMinutes === '0' || durationMinutes === '') return true;

    return false;
  };

  const isSearchEmpty = () => {
    if (recipeUrl === '' || recipeUrl === null) return true;
    return false;
  };

  const renderBackgroundUrl = () => {
    if (backgroundImageUrl) {
      return (
        <div
          className="w-full h-48 bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(${backgroundImageUrl} )`
          }}
        />
      );
    }
    return (
      <div className="w-full h-48 bg-cover bg-center rounded-xl flex justify-center items-center border-2">
        <ImageIcon size={48} className="text-primary" />
      </div>
    );
  };

  const renderErrorMessage = () => {
    return (
      <div className="-mt-6">
        <p className="text-red-500 text-xs ">Website not recognised</p>
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
              disabled={isSearchEmpty()}
              type="submit"
              onClick={fetchMetaData}
              className="p-2.5 disabled:bg-gray-200 transition-colors duration-300 disabled:text-white ml-2 text-sm font-medium text-dark bg-primary rounded-lg border-0  hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-200 ">
              <Search />
            </button>
          </div>
          {error ? renderErrorMessage() : <></>}
        </form>

        <form>
          <div
            className={`relative z-0 w-full mb-6 group ${
              loading ? 'opacity-30' : ''
            } transition-opacity duration-300`}>
            <input
              disabled={loading}
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
          <div
            className={`relative z-0 w-full mb-6 group ${
              loading ? 'opacity-30' : ''
            } transition-opacity duration-300`}>
            <label className=" text-sm text-gray-500 scale-75 top-3     ">Image</label>
            {renderBackgroundUrl()}
          </div>

          <div
            className={`relative z-0 w-full mb-6 group ${
              loading ? 'opacity-30' : ''
            } transition-opacity duration-300`}>
            <input
              disabled={loading}
              value={durationMinutes}
              type="number"
              name="duration_minutes"
              className=" block py-2.5 px-0 w-full text-sm text-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
              onChange={handleDurationMinutesChange}
            />
            <label className=" peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Duration (minutes)
            </label>
          </div>
          <div
            className={`relative z-0 w-full mb-6 group ${
              loading ? 'opacity-30' : ''
            } transition-opacity duration-300`}>
            <textarea
              disabled={loading}
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
            disabled={isDisabled()}
            type="submit"
            className="text-white transition-colors duration-300 bg-secondary disabled:bg-green-200 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 0">
            Submit
          </button>
          <button
            onClick={handleCancelPress}
            className="text-dark mt-4 bg-primary  hover:bg-gray-300 focus:ring-0 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 0">
            Cancel
          </button>
        </form>
      </div>
    </Page>
  );
};

export default Add;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await verifyToken(context.req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth'
      },
      props: {}
    };
  }
  return {
    props: {}
  };
}
