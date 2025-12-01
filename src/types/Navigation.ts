import { Recipe } from './Recipe';

export type RootStackParamList = {
  AppDrawer: undefined;
  RecipeDetails: { recipe: Recipe };

  Login: undefined;
  CreateAccount: undefined;
  CompleteProfile: {
    uid: string;
    email: string | null;
    name?: string;
    photoURL?: string;
  };
};

export type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  CompleteProfile: {
    uid: string;
    email: string | null;
    name?: string;
    photoURL?: string;
  };
};
