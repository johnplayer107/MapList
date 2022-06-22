import React, { useState, useEffect, useCallback } from 'react';
import {StyleSheet, View, Text,Alert} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';

import GoalItem from '../components/GoalItem';
import Colors from '../constants/Colors';
import { undoCompleted,deleteCompleted } from '../store/actions/Todo';

const CompletedScreen = props => {
  
  const [currentItem, setCurrentItem] = useState();// to store current touched or pressed item in the row

  let completedList = useSelector(state=> state.todo.completedList);// retrive todo data for swipe list view
  //let CompletedData = useSelector(state=> state.todo.completedList );

  const dispatch = useDispatch();// create instance for dispatch


  // UNDO - Add into TODOList array and then deleting it from CompletedList
  const undoCompletedHandler = useCallback(() => {// callback to prevent infinite loop and execute on any changes to  dependency
    dispatch(undoCompleted(currentItem));
 },[dispatch, currentItem]);

 // DELETE 
 const deleteItemHandler = () => {
  Alert.alert(
    'Confirm',
    'Do you want to delete!!',
    [
      {text: 'OK', onPress: () => {
        dispatch(deleteCompleted(currentItem));
      }     
     }, {text: 'Cancel'}
    ],
    { cancelable: false }
  );
};


  // GET CURRENT TOUCHED ITEM
  const curretItemHandler = itemId => {
    setCurrentItem(itemId);
  };

  // Swipe list view required prop
  const renderHiddenItem = () => (
    
    <View style={styles.rowBack}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <Text style={styles.backTextWhite}>Undo</Text>
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
        <Text style={styles.headingText}>Completed List</Text>
      </View>

     {/*Swipe List View*/}
     <SwipeListView
           disableRightSwipe
            onRowOpen = {undoCompletedHandler}
            data={completedList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
     />
        
    </View> 
  );
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
    backgroundColor: Colors.primaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      borderRadius:8
  },
  backRightBtnRight: {
      backgroundColor: Colors.primaryColor,
      borderRadius:8,
      right: 0,
  },
  backTextWhite: {
    color: '#FFF',
    fontSize:15,
    fontStyle:'italic',
    fontWeight: "bold"
  }
  });


export default CompletedScreen;