import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
//import HomeScreen from '../HomeScreens';
import LoginScreen from '../UserScreen/LoginScreens';
import SignUpScreen from '../UserScreen/SignUpScreens';
import VerificationEmailScreen from '../UserScreen/VerificationScreen';
import HomeScreen from '../Home/HomeScreens';
//import GlobalConnectScreens from '../GlobalConnect/GlobalConnectScreens';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import GoogleMapsScreen from '../GlobalConnect/GlobalConnectScreens';
//import ProfileScreen from '../Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home
const ChatStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

// Stack Navigator for Setup
const ConnectStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Connect" component={GoogleMapsScreen} />
  </Stack.Navigator>
);

// Stack Navigator for Collect
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Profile" component={ProfileScreen} /> 
  </Stack.Navigator>
);

// Bottom tab navigator
const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="ChatStack"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        height: 60,
        paddingBottom: 6,
       // backgroundColor: '#7987cb',
      },
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'ChatStack') {
          return <Fontisto name="hipchat" size={size + 3} color={color} />;
        } else if (route.name === 'ConnectStack') {
          return (
            <FontAwesome
              name="globe"
              size={size + 5}
              color={color}
            />
          );
        } else if (route.name === 'ProfileStack') {
          return (
            <Entypo
              name="user"
              size={size + 7}
              color={color}
            />
          );
        } 
      },
      tabBarActiveTintColor: '#7987cb',
      tabBarInactiveTintColor: 'black',
      tabBarLabelStyle: {
        fontSize: 14, // Increase label size
        fontWeight: 'bold', // Make it bold (optional)
      },
    })}
  >
    <Tab.Screen name="ChatStack" component={ChatStack} options={{ tabBarLabel: 'Chat' }} />
    <Tab.Screen name="ConnectStack" component={ConnectStack} options={{ tabBarLabel: 'Connect' }} />
    <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ tabBarLabel: 'Profile' }} />
  </Tab.Navigator>
);

// Main Navigation
export default function NavigationScreen() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
        setIsEmailVerified(authUser.emailVerified); // Check email verification status
      } else {
        setUser(null);
        setIsEmailVerified(false);
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);


  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="red" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          isEmailVerified ? (
            <Stack.Screen name="MainTabs" component={MainTabs} />
          ) : (
            <Stack.Screen name="VerifyEmail" component={VerificationEmailScreen} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
