import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';
import Colors from '../constants/Colors';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = enteredText => {
  
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    if(enteredGoal == ''){
      Alert.alert(
        'Alert',
        'TODO Task Required!',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
    }else{
      props.onAddGoal(enteredGoal);
      setEnteredGoal('');
    }
  };

  return (
   <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Todo"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
            <Button title="CANCEL" color={Colors.accentColor} onPress={props.onCancel} />
            </View>
            <View style={styles.button}>
            <Button title="ADD" color={Colors.primaryColor} onPress={addGoalHandler} />
            </View>
        </View>
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius : 8,
    padding: 10,
    //marginBottom:10,
  },
  buttonContainer:{
      flexDirection : 'row',
      justifyContent: 'space-around',
      width:'60%',
      marginVertical:20,
     
  },
  button:{
    width:'40%',
    borderRadius : 8,
  }
});

export default GoalInput;
