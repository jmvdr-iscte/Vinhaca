import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import StarRatingModal from './screens/StarRatingModal';
import ContactUs from './screens/ContactUs';
const {Graph} = require('./screens/Graph');
const AuthScreen = require('./screens/AuthScreen');
const RecipeScreen = require('./screens/RecipeScreen');
const Home = require('./screens/Home');
const Production = require('./screens/Production');
const UseWineyard = require('./screens/UseWineyard');
const Profile = require('./screens/Profile');
const Filter = require('./screens/Filter');
const Sugestions = require('./screens/Sugestions');
const SavedScreenProps = require('./screens/SavedScreenProps');
const WinePage = require('./screens/WinePage');
const StepOneWine = require('./screens/StepOneWine');
const StepTwoWine = require('./screens/StepTwoWine');
const StepThreeWine = require('./screens/StepThreeWine');
const StepFourWine = require('./screens/StepFourWine');
const StepFiveWine = require('./screens/StepFiveWine');
const StepSixWine = require('./screens/StepSixWine');
const StepSevenWine = require('./screens/StepSevenWine');
const StepEightWine = require('./screens/StepEightWine');

const {Navigator, Screen} = createStackNavigator();

module.exports = AppNavigator = () => (

  <NavigationContainer>

    <Navigator screenOptions={{headerShown: false}} initialRouteName="AuthScreen">

      <Screen name="AuthScreen" component={AuthScreen}></Screen>
      <Screen name="Home" component={Home}></Screen>
      <Screen name="Graph" component={Graph}></Screen>
      <Screen name="Sugestions" component={Sugestions}></Screen>
      <Screen name="SavedScreenProps" component={SavedScreenProps}></Screen>
      <Screen name="RecipeScreen" component={RecipeScreen}></Screen>
      <Screen name="Production" component={Production}></Screen>
      <Screen name="UseWineyard" component={UseWineyard}></Screen>
      <Screen name="Profile" component={Profile}></Screen>
      <Screen name="ContactUs" component={ContactUs}></Screen>
      <Screen name="StarRatingModal" component={StarRatingModal}></Screen>
      <Screen name="Filter" component={Filter}></Screen>
      <Screen name="WinePage" component={WinePage}></Screen>
      <Screen name="StepOneWine" component={StepOneWine}></Screen>
      <Screen name="StepTwoWine" component={StepTwoWine}></Screen>
      <Screen name="StepThreeWine" component={StepThreeWine}></Screen>
      <Screen name="StepFourWine" component={StepFourWine}></Screen>
      <Screen name="StepFiveWine" component={StepFiveWine}></Screen>
      <Screen name="StepSixWine" component={StepSixWine}></Screen>
      <Screen name="StepSevenWine" component={StepSevenWine}></Screen>
      <Screen name="StepEightWine" component={StepEightWine}></Screen>
    </Navigator>
  </NavigationContainer>
);
