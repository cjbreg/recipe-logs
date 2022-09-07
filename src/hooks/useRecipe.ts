import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Recipe = {
  id: string;
  name: string;
  recipeUrl: string;
  durationMinutes: number;
  favorite: boolean;
  backgroundImageUrl: string;
  userId: string;
  categories: any[];
  comment: string;
  metaData: any;
};

export const useUploadRecipe = () => {
  return useMutation(createRecipe);
};

export const useToggleFavorite = () => {
  return useMutation(toggleFavorite);
};

const createRecipe = async (newRecipe: any) => {
  return await axios.post('/api/recipe', newRecipe);
};

const toggleFavorite = async (params: { recipeId: string; favorite: boolean }) => {
  return await axios.put('/api/recipe/favorite', { params });
};

export const useFetchRecipes = () => {
  return useQuery<Recipe[], Error>(
    ['get-users-recipes'],
    () => axios.get('/api/recipe', {}).then((res) => res.data),
    {
      refetchInterval: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  );
};

export const useFetchRecipeById = (recipeId: any) => {
  return useQuery<Recipe, Error>(
    ['get-recipe-by-id'],
    () => axios.get('/api/recipe', { params: { recipeId } }).then((res) => res.data),
    {
      refetchInterval: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  );
};
