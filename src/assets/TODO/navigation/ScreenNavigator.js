import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import { createStackNavigator } from 'react-navigation-stack'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';

import TodoScreen from '../screens/TodoScreen';
import CompletedScreen from '../screens/CompletedScreen';
import Colors from '../constants/Colors';


const TodoNavigator = createStackNavigator(
    {
        Todo: {
        screen: TodoScreen
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitle: 'TodoList',
        
      }
    }
  );


  const CompletedNavigator = createStackNavigator(
    {
      Completed: {
        screen: CompletedScreen
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor,
          headerTitle: 'Completed'       
      }
    }
  );

  const TabScreenConfig =  {   TodoList : {
    screen:TodoNavigator,
    navigationOptions:{
        
        title: 'TodoScreen',
        tabBarIcon: (tabInfo) =>{
            return <Icon name ="add-to-list" size={25} color={tabInfo.tintColor}/>;
        },
        tabBarColor: Colors.primaryColor,
    }
},
Completed : {
    screen:CompletedNavigator,
    navigationOptions:{
        headerMode: 'screen',
        headerTitle: 'CompletedScreen',
        tabBarIcon: (tabInfo) =>{
            return <Icon name ="list" size={25} color={tabInfo.tintColor}/>
        },
        tabBarColor: Colors.accentColor
    }
 }
};

  const  ScreenTabNavigator = Platform.OS === 'android' 
  ? createMaterialBottomTabNavigator(TabScreenConfig,{
    activeColor:'white',
    shifting:true
  }) : 
  createBottomTabNavigator(
    TabScreenConfig,{
        tabBarOptions:{
            activeTintColor:Colors.accentColor
        }
    }
    
    );

export default createAppContainer(ScreenTabNavigator);