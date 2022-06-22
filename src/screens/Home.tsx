import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import SearchBarWithAutocomplete from '../../src/components/SearchBarWithAutocomplete';
import {useDebounce} from '../../src/hooks/useDebounce';
import {
  getMapData,
  onTapPrediction,
} from '../../src/store/actions/storeMapAction';
import {List} from 'react-native-paper';
import {PredictionType} from '../model/predictionType';

const Home = () => {
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState<PredictionType[]>([]);
  const [data, setData] = useState([{}]);

  let predictionData = useSelector(
    (state: any) => state.onTapPrediction.prediction,
  );
  //const dispatch = useDispatch(); // create instance for dispatch

  if (predictionData) {
    let predicts = predictionData[0] ? predictionData[0].predictions : [];

    for (let key in predicts) {
      data.push({
        id: predicts[key].place_id,
        title: predicts[key].structured_formatting.secondary_text,
      });
    }

    // console.log(data);
  }

  //console.log(data);
  /**
   * Get predictions on entering text
   */

  const searchTermHandler = useCallback(searchTerm => {
    // callback to prevent infinite loop and execute on any changes to  dependency
    // if (searchTerm.trim() === '') return;
    getMapData(searchTerm);
    setSearch({term: searchTerm, fetchPredictions: true});
  }, []);

  /**
   * Get lat and long values on prediction tapped by using the place id.
   */
  const onPredictionTappedHandler = useCallback(
    (placeId: string, description: string) => {
      // callback to prevent infinite loop and execute on any changes to  dependency
      onTapPrediction(placeId);
      setSearch({term: description, fetchPredictions: false});
    },
    [],
  );

  useDebounce(searchTermHandler, 1000, [search.term]);

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView style={styles.body}>
        <SearchBarWithAutocomplete
          value={search.term}
          onChangeText={text => {
            searchTermHandler(text);
            if (text != '') {
              setShowPredictions(true);
            } else {
              setShowPredictions(false);
            }
            // console.log(search.term);
          }}
          showPredictions={showPredictions}
          predictions={predictions}
          onPredictionTapped={onPredictionTappedHandler}
        />
        <View style={styles.list}>
          <FlatList
            data={data ? data.slice(1) : []}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  list: {
    marginTop: 50,
  },
  item: {
    backgroundColor: '#0000',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
});
