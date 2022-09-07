import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Recipe = {
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

const createRecipe = async (newRecipe: any) => {
  return await axios.post('/api/recipe', newRecipe);
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
