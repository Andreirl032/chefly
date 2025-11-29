import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../screens/App/FeedScreen.tsx";
import RecipeDetailsScreen from "../screens/App/RecipeDetailsScreen.tsx";
import FavoritesScreen from "../screens/App/FavoritesScreen.tsx";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Recipe" component={RecipeDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
