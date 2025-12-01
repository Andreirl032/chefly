import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IngredientItem, Recipe } from '../../types/Recipe';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

type Props = {
  route: { params: { recipe: Recipe } };
};

export default function RecipeDetailsScreen({ route }: Props) {
  const { recipe } = route.params;
  const [favorited, setFavorited] = useState(false);

  const ingredients = recipe.ingredients ?? [];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <Text style={styles.goBackText}>← Back</Text>
        </TouchableOpacity>

        <Image source={{ uri: recipe.thumbnail }} style={styles.image} />
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.name}</Text>
          <TouchableOpacity onPress={() => setFavorited(!favorited)}>
            <MaterialIcons
              name={favorited ? 'favorite' : 'favorite-border'}
              size={28}
              color={favorited ? '#FF7F50' : '#555'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {recipe.category} | {recipe.area}
        </Text>
        <Text style={styles.sectionTitle}>Ingredients</Text>

        {ingredients.map((item: IngredientItem, index: number) => (
          <Text key={index} style={styles.ingredient}>
            • {item.measure} {item.ingredient}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1, marginRight: 8 },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  ingredient: { fontSize: 16, marginBottom: 4 },
  instructions: { fontSize: 16, lineHeight: 22 },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollViewContentContainer: { paddingBottom: 40 },
  goBack: { paddingBottom: 16 },
  goBackText: { fontSize: 18 },
});
