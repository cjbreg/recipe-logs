import { Category } from "../models/Category";

export const categories = [
  {
    name: "Vegan",
    enum: Category.VEGAN,
  },
  {
    name: "Fish",
    enum: Category.FISH,
  },
  {
    name: "Pasta",
    enum: Category.PASTA,
  },
  {
    name: "Salad",
    enum: Category.SALAD,
  },
  {
    name: "Chicken",
    enum: Category.CHICKEN,
  },
  {
    name: "Desert",
    enum: Category.DESERT,
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
