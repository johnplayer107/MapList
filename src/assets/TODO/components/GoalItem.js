import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const GoalItem = props => {

  return (
    <TouchableWithoutFeedback  onPressIn={props.onCompleted.bind(this, props.id)} onLongPress={props.onDelete}>
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listItem: {
   padding: 10,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  itemText:{
    fontSize: 15,
    fontWeight: "bold",
  }

});

export default GoalItem;
