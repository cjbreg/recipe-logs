import { MetaData } from "./MetaData";

export type Recipe = {
  id?: string;
  name: string;
  recipeUrl: string;
  backgroundImageUrl: string;
  categories?: string[];
  favorite: boolean;
  durationMinutes: number;
  comment?: string;
  metaData?: MetaData;
  createdAt?: Date;
  updatedAt?: Date;
};
