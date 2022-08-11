import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchRecipes } from 'src/hooks/useRecipe';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State } from 'src/store/reducers';

const Test = () => {
  const { accessToken } = useSelector((state: State) => state.authData);

  const { data: recipes, isLoading, refetch, isFetching } = useFetchRecipes(accessToken);

  return (
    <>
      <div>{recipes ? recipes.length : 'error'}</div>
    </>
  );
};

export default Test;
