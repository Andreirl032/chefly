import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  // orderBy,
  query,
  startAfter,
} from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Recipe } from '../../types/Recipe';
import { RootStackParamList } from '../../types/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const PAGE_SIZE = 10;
type FeedNav = NativeStackNavigationProp<RootStackParamList, 'AppDrawer'>;

const FeedScreen = () => {
  const firestoreDb = getFirestore();

  const [meals, setMeals] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [noMoreData, setNoMoreData] = useState(false);

  const navigation = useNavigation<FeedNav>();

  // useEffect(() => {
  //   // só pega a instância depois que o app já está montado
  //   const app = getApp();
  //   setFirestoreDb(getFirestore(app));
  // }, []);

  const loadMeals = useCallback(async () => {
    if (loading || noMoreData) return;

    setLoading(true);

    let q = query(
      collection(firestoreDb, 'officialMeals'),
      // orderBy('name'),
      limit(PAGE_SIZE),
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setNoMoreData(true);
      setLoading(false);
      return;
    }

    const newMeals: Recipe[] = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: data.id ?? doc.id,
        name: data.name,
        area: data.area,
        category: data.category,
        instructions: data.instructions,
        thumbnail: data.thumbnail,
        youtube: data.youtube,
        tags: data.tags ?? [],
        ingredients: data.ingredients ?? [],
      };
    });

    setMeals(prev => [...prev, ...newMeals]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setLoading(false);
  }, [lastDoc, loading, noMoreData, firestoreDb]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const renderMeal = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.card}
      // key={item.idMeal}
      onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          {item.category} • {item.area}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={meals}
        renderItem={renderMeal}
        keyExtractor={item => item.id}
        onEndReached={loadMeals}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: { width: 100, height: 100 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 12, color: '#555' },
});

export default FeedScreen;
