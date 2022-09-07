import React from 'react';
import { useFetchRecipes, useUploadRecipe } from 'src/hooks/useRecipe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Test = () => {
  const { data: recipes, isLoading, refetch, isFetching } = useFetchRecipes();
  const recipeMutation = useUploadRecipe();

  const handleTestMutation = () => {
    recipeMutation.mutate(
      {
        newRecipe: {
          name: 'Pastasalade met pesto, courgette en amandelen recept - Allerhande | Albert Heijn',
          recipeUrl:
            'https://www.ah.nl/allerhande/recept/R-R1196933/pastasalade-met-pesto-courgette-en-amandelen-advertorial',
          durationMinutes: 69,
          favorite: false,
          backgroundImageUrl:
            'https://static.ah.nl/static/recepten/img_RAM_PRD166576_1024x748_JPG.jpg',
          userId: '62ebb9506953492bd08aa195',
          categories: []
        },
        metaData: {
          description:
            'Zelf Pastasalade met pesto, courgette en amandelen maken? Met dit recept van Allerhande zet je een feestje op tafel. Bekijk ingrediënten en bereidingswijze!',
          image: 'https://static.ah.nl/static/recepten/img_RAM_PRD166576_1024x748_JPG.jpg',
          title: 'Pastasalade met pesto, courgette en amandelen recept - Allerhande | Albert Heijn',
          author: 'Albert Heijn',
          logo: 'https://static.ah.nl/ah-static/images/logo-allerhande.png',
          publisher: 'Albert Heijn'
        }
      },
      {
        onSuccess: (data, variables, context) => {
          console.log(data.data, variables, context);
        }
      }
    );
  };

  if (isLoading || isFetching) {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }

  return (
    <>
      <div>{recipes ? recipes.length : 'error'}</div>
      <button onClick={handleTestMutation}>click</button>
    </>
  );
};

export default Test;
