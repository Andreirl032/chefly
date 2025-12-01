import { Recipe } from "./Recipe";

export type RootStackParamList = {
  AppDrawer: undefined;
  RecipeDetails: {
    recipe: Recipe;
  };
};
