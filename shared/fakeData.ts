import { CategoryEnum } from "../models/CategoryEnum";
import { Recipe } from "../models/Recipe";

export const categories = [
  {
    name: "Vegan",
    enum: CategoryEnum.VEGAN,
  },
  {
    name: "Fish",
    enum: CategoryEnum.FISH,
  },
  {
    name: "Pasta",
    enum: CategoryEnum.PASTA,
  },
  {
    name: "Salad",
    enum: CategoryEnum.SALAD,
  },
  {
    name: "Chicken",
    enum: CategoryEnum.CHICKEN,
  },
  {
    name: "Desert",
    enum: CategoryEnum.DESERT,
  },
];

export const recipes: Recipe[] = [
  {
    id: "awrgsdfsdfasdg",
    name: "Poke Bowl met kip",
    recipeUrl: "https://www.ah.nl/allerhande/recept/R-R1192928/pokebowl-kip",
    durationMinutes: 25,
    favorite: true,
    backgroundImageUrl:
      "https://static.ah.nl/static/recepten/img_RAM_PRD123720_890x594_JPG.jpg",
  },
  {
    id: "asdfgasdfgasdg",
    name: "Vindaloo",
    recipeUrl: "https://www.ah.nl/allerhande/recept/R-R1196981/vindaloo",
    durationMinutes: 30,
    favorite: false,
    backgroundImageUrl:
      "https://static.ah.nl/static/recepten/img_RAM_PRD165043_890x594_JPG.jpg",
  },
  {
    id: "adsfgasdgawasgdf",
    name: "Onigiri",
    recipeUrl: "https://www.ah.nl/allerhande/recept/R-R1196810/onigiri",
    durationMinutes: 60,
    favorite: false,
    backgroundImageUrl:
      "https://static.ah.nl/static/recepten/img_RAM_PRD164587_612x450_JPG.jpg",
  },
  {
    id: "agsdgawergwser",
    name: "Vegatarische lasagne",
    recipeUrl:
      "https://www.ah.nl/allerhande/recept/R-R1185036/vegetarische-lasagne",
    durationMinutes: 15,
    favorite: true,
    backgroundImageUrl:
      "https://static.ah.nl/static/recepten/img_123313_890x594_JPG.jpg",
  },
];
