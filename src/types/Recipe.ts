export type IngredientItem = {
  ingredient: string;
  measure: string;
};

export type Recipe = {
  id: string;
  name: string;
  area: string;
  category: string;
  instructions: string;
  thumbnail: string;
  youtube: string;
  tags: string[];

  ingredients: IngredientItem[];
};
