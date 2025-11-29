// Run this only once to populate the Firestore database with recipes from TheMealDB
import MealDBResponseMeal from './interfaces';
import { IngredientKey, MeasureKey } from './interfaces';

const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function main() {
  console.log('Coletando receitas...');

  const res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const data = await res.json();

  const meals = data.meals;

  if (!meals) {
    console.log('Nenhuma receita encontrada!');
    return;
  }

  console.log(`Encontradas ${meals.length} receitas.`);
  console.log('Enviando para o Firestore...');

  for (const meal of meals) {
    const mealId = meal.idMeal;

    await db
      .collection('officialMeals')
      .doc(mealId)
      .set({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        tags: meal.strTags ? meal.strTags.split(',') : [],
        youtube: meal.strYoutube,
        ingredients: extractIngredients(meal),
      });

    console.log(`✔️ Enviado: ${meal.strMeal}`);
  }

  console.log('🔥 Finalizado! Banco populado.');
}

function extractIngredients(meal: MealDBResponseMeal) {
  const result = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}` as IngredientKey];
    const measure = meal[`strMeasure${i}` as MeasureKey];

    if (ing && ing.trim() !== '') {
      result.push({
        ingredient: ing.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }

  return result;
}

main();
