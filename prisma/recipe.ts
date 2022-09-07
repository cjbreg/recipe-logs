import { MetaData } from '../src/models/MetaData';
import { Recipe } from '../src/models/Recipe';
import { prisma } from '../prisma';

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({});
  return recipes;
};

export const getRecipes = async (userId: string) => {
  const recipes = await prisma.recipe.findMany({
    where: { userId: userId }
  });
  return recipes;
};

export const getRecipe = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      metaData: true
    }
  });
  return recipe;
};

export const createRecipe = async (recipe: Recipe, metaData: MetaData, userId: string) => {
  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipe,
      userId: userId,
      metaData: {
        create: { ...metaData }
      }
    },
    include: {
      metaData: true
    }
  });
  return newRecipe;
};

export const updateRecipe = async (id: string, updateData: any) => {
  const recipe = await prisma.recipe.update({
    where: {
      id
    },
    data: {
      ...updateData
    }
  });
  return recipe;
};

export const toggleFavorite = async (id: string, favorite: boolean) => {
  console.log(id, favorite);

  const recipe = await prisma.recipe.update({
    where: {
      id
    },
    data: {
      favorite: !favorite
    }
  });
  return recipe;
};

export const deleteRecipe = async (id: string) => {
  const data = await prisma.recipe.findUnique({
    where: { id },
    include: {
      metaData: true
    }
  });

  const metaDataId = data?.metaData?.id ?? '';

  if (metaDataId !== '') {
    await prisma.metaData.delete({
      where: { id: metaDataId }
    });
  }

  const recipe = await prisma.recipe.delete({
    where: {
      id
    }
  });

  return recipe;
};
