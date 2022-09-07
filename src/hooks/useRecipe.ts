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
  metaData: any;
};

export const useUploadRecipe = () => {
  return useMutation(createRecipe);
};

const createRecipe = async (newRecipe: any) => {
  await axios.post('/api/recipe', newRecipe);
};

export const useFetchRecipes = () => {
  return useQuery<Recipe[], Error>(
    ['get-users-recipes'],
    () => fetch('api/recipe', {}).then((res) => res.json()),
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
};
