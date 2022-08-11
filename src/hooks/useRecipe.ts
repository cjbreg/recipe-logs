import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  return useMutation((newRecipe: Recipe) => {
    return fetch('/api/recipe', {
      method: 'POST',
      body: JSON.stringify(newRecipe)
    });
  });
};

export const useFetchRecipes = (token: string | null) => {
  return useQuery<Recipe[], Error>(
    ['get-users-recipes'],
    () =>
      fetch('api/recipe', {
        headers: new Headers({
          Authorization: 'Basic ' + token
        })
      }).then((res) => res.json()),
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
};
