import * as Native from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Component } from 'react';
import { useState, useEffect } from "react";

import { View, Text, Pressable, TouchableOpacity } from "react-native";
import socketIO from 'socket.io-client';
import { LineChart, Grid, contentInset } from "react-native-svg";
import { StyleSheet } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend } from "victory-native";
const AppNavigator = require("./app.navigator")
const {Graph}= require("./screens/Graph")
const AuthScreen=require("./screens/AuthScreen")


function App() {
return(

  <AppNavigator/>

  );
}
export default App ;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
