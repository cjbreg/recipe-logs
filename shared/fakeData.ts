import { CategoryEnum } from "../models/CategoryEnum";

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

export const recipes = [
  {
    name: "Poke Bowl met kip",
    duration: 25,
    favorite: true,
    backgroundUrl:
      "https://static.ah.nl/static/recepten/img_RAM_PRD123720_890x594_JPG.jpg",
    categories: ["chicken"],
  },
  {
    name: "Vindaloo",
    duration: 30,
    favorite: false,
    backgroundUrl:
      "https://static.ah.nl/static/recepten/img_RAM_PRD165043_890x594_JPG.jpg",
    categories: ["chicken, salad"],
  },
  {
    name: "Onigiri",
    duration: 60,
    favorite: false,
    backgroundUrl:
      "https://static.ah.nl/static/recepten/img_RAM_PRD164587_612x450_JPG.jpg",
    categories: ["fish"],
  },
  {
    name: "Vegatarische lasagne",
    duration: 15,
    favorite: true,
    backgroundUrl:
      "https://static.ah.nl/static/recepten/img_123313_890x594_JPG.jpg",
    categories: ["vegan"],
  },
];
