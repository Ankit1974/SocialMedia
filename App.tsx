// import { View, NativeModules, requireNativeComponent, Button } from 'react-native';
// import React from 'react';

// const GoogleMapsView = requireNativeComponent('GoogleMapsView');
// const { GoogleMapsModule } = NativeModules;

// const App = () => {
//   const requestPermission = async () => {
//     try {
//       const granted = await GoogleMapsModule.requestLocationPermission();
//       if (granted) {
//         console.log("Location permission granted");
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Button title="Request Location Permission" onPress={requestPermission} />
//       <GoogleMapsView style={{ flex: 1 }} />
//     </View>
//   );
// };

// export default App;




import React from 'react';
//import NavigationScreen from './Screens/Navigation/NavigationScreens';
//import LoginScreen from './Screens/UserScreen/LoginScreens';
import NavigationScreen from './Screens/Navigation/NavigationScreens';
import SignUpScreen from './Screens/UserScreen/SignUpScreens';



const App = () => {
  
  return (

    <NavigationScreen/>
    
  );
};

export default App;








