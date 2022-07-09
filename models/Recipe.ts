export type Recipe = {
  id?: string;
  name: string;
  recipeUrl: string;
  backgroundImageUrl: string;
  favorite: boolean;
  durationMinutes: number;
  comment?: string;
};
