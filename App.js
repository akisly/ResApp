import React from 'react';
import firebase from 'firebase';
import { Provider, useSelector } from 'react-redux';
import { Text, View, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {
  DetailsScreen,
  UserScreen,
  AccountDetailsScreen,
  MapScreen,
  BookingScreen,
  SearchCityScreen,
  RegisterScreen,
  LoginScreen,
  WelcomeScreen,
  HistoryDetailsScreen,
  OrderCompleted,
} from './screens';
import Tabs from './navigation/Tabs';

import COLORS from './constants/colors';
import store from "./store/store";
import "./languages/i18next";

const Stack = createStackNavigator();

const customDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#171717',
    surface: '#423F3E',
    primary: COLORS.primary,
    icon: '#ffffff',
    text: '#ffffff',
    menuLabel: '#2B2B2B',
  }
}

const customDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: COLORS.white,
    surface: COLORS.white,
    primary: COLORS.primary,
    text: '#000000',
    icon: '#000000',
    menuLabel: COLORS.lightGrey,
  }
}

const firebaseConfig = {
  apiKey: 'AIzaSyCUVaNteneUZWYflTgDWyGBzL4sJ3V_qmg',
  authDomain: 'restaurant-booking-app-328117.firebaseapp.com',
  projectId: 'restaurant-booking-app-328117',
  storageBucket: 'restaurant-booking-app-328117.appspot.com',
  messagingSenderId: '830268429223',
  appId: '1:830268429223:web:231fd43f563f5c2e4d9c82',
  measurementId: 'G-64VR5RX8DV'
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(["timer"]);

const Navigation = () => {
  const isDarkTheme = useSelector(({ theme }) => theme.isDarkMode);

  return (
    <PaperProvider theme={isDarkTheme ? customDarkTheme : customDefaultTheme}>
      <NavigationContainer theme={isDarkTheme ? customDarkTheme : customDefaultTheme}>
        <StatusBar backgroundColor="black" style="light" />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={'Home'}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="HistoryDetailsScreen" component={HistoryDetailsScreen} options={{ headerShown: true }} />
          <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ headerShown: true }} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen
            name="SearchCityScreen"
            component={SearchCityScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AccountDetailsScreen"
            component={AccountDetailsScreen}
            options={{
              headerShown: true,
              title: 'Account Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  const [state, setState] = React.useState({ loaded: false });
  const [loaded] = useFonts({
    'Roboto-Black' : require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold' : require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular' : require('./assets/fonts/Roboto-Regular.ttf'),
  });
  
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }, []);
  
  if (!state.loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }
  
  if (!state.loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: COLORS.white,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Sign In' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
