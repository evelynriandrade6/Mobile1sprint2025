import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Home from './screens/Home';
import ClassroomScreen from './screens/ClassroomScreen';
import UserPage from './screens/UserPage';
import MinhasReservas from './screens/MinhasReservas';  // <-- importar aqui
import Layout from "./components/layout";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ClassroomScreen" component={ClassroomScreen} />
        <Stack.Screen name="UserPage" component={UserPage} />
        <Stack.Screen name="MinhasReservas" component={MinhasReservas} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
