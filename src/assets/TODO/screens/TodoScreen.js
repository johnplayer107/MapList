import React, { useState, useEffect, useCallback } from 'react';
import {StyleSheet, View, Text,Alert} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GoalItem from '../components/GoalItem';
import GoalInput from '../components/GoalInput';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { addTodo,addCompleted,deleteTodo } from '../store/actions/Todo';

const TodoScreen = props => {

  const [isAddMode, setIsAddMode] = useState(false);// State to handle modal
  const [currentItem, setCurrentItem] = useState();// to store current touched or pressed item in the row

  let TodoData = useSelector(state=> state.todo.todoList);// retrive todo data for swipe list view
  //let CompletedData = useSelector(state=> state.todo.completedList );

  useEffect(() => {// to prevent infinite loop
    props.navigation.setParams({ openModal: setIsAddMode });
  }, [isAddMode]);

  const dispatch = useDispatch();// create instance for dispatch

  // ADD TODO
  const addTodoHandler = useCallback(goalTitle => {// callback to prevent infinite loop and execute on any changes to  dependency
    setIsAddMode(false);
     dispatch(addTodo( { id: Math.random().toString(), value: goalTitle } ));
  },[dispatch]);


  // Add into completd list array and then deleting it from TODOList
  const addCompletedlHandler = useCallback(() => {// callback to prevent infinite loop and execute on any changes to  dependency
    dispatch(addCompleted(currentItem));
    console.log(currentItem);
 },[dispatch, currentItem]);

 // DELETE ITEM
 const deleteItemHandler = () => {
  Alert.alert(
    'Confirm',
    'Do you want to delete!!',
    [
      {text: 'OK', onPress: () => {
        dispatch(deleteTodo(currentItem));
      }     
     }, {text: 'Cancel'}
    ],
    { cancelable: false }
  );
};

  // GET CURRENT TOUCHED ITEM
  const curretItemHandler = itemId => {
    setCurrentItem(itemId);
    console.log(currentItem);
  };

  // CLOSE  MODAL
  const cancelTodoHandler = () => {
      setIsAddMode(false);
  };


  // Swipe list view required prop
  const renderHiddenItem = () => (
    
    <View style={styles.rowBack}>
        <View style={[styles.backLeftBtn, styles.backLeftBtnRight]}>
            <Text style={styles.backTextWhite}>Completed</Text>
        </View>
    </View>
);
 
// Swipe list view required prop
const renderItem = (data, rowMap) =>{ 
  return (
    <GoalItem id={data.item.id} onCompleted={curretItemHandler} onDelete={deleteItemHandler} title = {data.item.value}/>
);
}

// Rendering to the screen
  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>TODOList</Text>
      </View>
     <GoalInput  visible={isAddMode} onAddGoal={addTodoHandler} onCancel={cancelTodoHandler}/>

     {/*Swipe List View*/}
     <SwipeListView
            disableLeftSwipe
            onRowOpen = {addCompletedlHandler}
            data={TodoData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
     />
        
    </View> 
  );
}

// NavigationOptions to set header button on the top right of the screen
TodoScreen.navigationOptions = navigationData =>{
 
  const OpenModalHandler = () =>{
    navigationData.navigation.getParam('openModal')(true);
  };
  return {
      headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                       <Item title="ADD" iconName="add-to-list" onPress= {OpenModalHandler}/>
                  </HeaderButtons>
  };
};

//StyleSheet
const styles = StyleSheet.create({
screen: {
  flex: 1,
  padding: 7
},
heading:{
  alignItems: 'center',
  marginVertical : 20
},
headingText:{
  fontWeight: "bold",
  fontSize: 18
},
rowFront: {
  alignItems: 'center',
  backgroundColor: '#CCC',
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  justifyContent: 'center',
  height: 50,
},
rowBack: {
  alignItems: 'center',
  backgroundColor: Colors.accentColor,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
},
backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderRadius:8
},
backLeftBtnRight: {
    backgroundColor: Colors.accentColor,
    borderRadius:8,
    left: 0,
},
backTextWhite: {
  color: '#FFF',
  fontSize:15,
  fontStyle:'italic',
  fontWeight: "bold",
}
});


export default TodoScreen;