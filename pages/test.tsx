import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchRecipes } from 'src/hooks/useRecipe';
import { State } from 'src/store/reducers';

const Test = () => {
  const { accessToken } = useSelector((state: State) => state.authData);
  // eslint-disable-next-line
  const { data: recipes, isLoading, refetch, isFetching } = useFetchRecipes(accessToken);

  return (
    <>
      <div>{recipes ? recipes.length : 'error'}</div>
    </>
  );
};

export default Test;
