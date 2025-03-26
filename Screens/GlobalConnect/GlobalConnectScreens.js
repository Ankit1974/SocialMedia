import { requireNativeComponent } from 'react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Ensure 'GoogleMapsView' matches the getName() in GoogleMapsViewManager
const GoogleMapsView = requireNativeComponent('GoogleMapsView');

const GoogleMapsScreen = () => {
  return (
    <View style={styles.container}>
      <GoogleMapsView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMapsScreen;



// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { useIsFocused } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const GlobalConnectScreens = () => {
//   const [users, setUsers] = useState([]); // Store Firestore users
//   const [selectedUser, setSelectedUser] = useState(null); // Store selected marker
//   const [loading, setLoading] = useState(true); // Loading state
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) {
//       fetchUsers();
//     }
//   }, [isFocused]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const snapshot = await firestore().collection('Users').get();
//       const userData = snapshot.docs
//         .map(doc => ({ id: doc.id, ...doc.data() }))
//         .filter(user => user.latitude && user.longitude); // Ensure valid location data

//       setUsers(userData);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
//       ) : (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: 28.7041,
//             longitude: 77.1025,
//             latitudeDelta: 0.5,
//             longitudeDelta: 0.5,
//           }}
//         >
//           {users.map(user => (
//             <Marker
//               key={user.id}
//               coordinate={{ latitude: user.latitude, longitude: user.longitude }}
//               title={user.name}
//               description={⭐ ${user.rating}}
//               onPress={() => setSelectedUser(user)}
//             >
//               <Image source={{ uri: user.profileImage }} style={styles.markerProfile} />
//             </Marker>
//           ))}
//         </MapView>
//       )}

//       {/* User Details Box */}
//       {selectedUser && (
//         <View style={styles.detailsBox}>
//           <Image source={{ uri: selectedUser.profileImage }} style={styles.detailsProfile} />
//           <View style={styles.detailsTextContainer}>
//             <Text style={styles.detailsName}>{selectedUser.name}</Text>
//             <Text style={styles.detailsRating}>⭐ {selectedUser.rating}</Text>
//           </View>
//           <View style={styles.iconContainer}>
//             <TouchableOpacity>
//               <FontAwesome name="comments" size={24} color="#007bff" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <FontAwesome name="linkedin" size={24} color="#007bff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     flex: 1,
//   },
//   detailsBox: {
//     position: 'absolute',
//     bottom: 50,
//     left: '10%',
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 10,
//     flexDirection: 'column',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   detailsProfile: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     position: 'absolute',
//     top: -25,
//     left: 15,
//     backgroundColor: '#7987cb',
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   detailsTextContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   detailsName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   detailsRating: {
//     fontSize: 14,
//     color: '#555',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-between',
//     width: '40%',
//   },
//   markerProfile: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
// });

// export default GlobalConnectScreens;