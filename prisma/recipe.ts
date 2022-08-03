import { MetaData } from "../src/models/MetaData";
import { Recipe } from "../src/models/Recipe";
import { prisma } from "../prisma";

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({});
  return recipes;
};

export const getRecipe = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });
  return recipe;
};

export const createRecipe = async (recipe: Recipe, metaData: MetaData) => {
  console.log(typeof parseInt(recipe.durationMinutes));

  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipe,
      metaData: {
        create: { ...metaData },
      },
    },
    include: {
      metaData: true,
    },
  });
  return newRecipe;
};

export const updateRecipe = async (id: string, updateData: any) => {
  const recipe = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return recipe;
};

export const deleteRecipe = async (id: string) => {
  const recipe = await prisma.recipe.delete({
    where: {
      id,
    },
  });
  return recipe;
};
