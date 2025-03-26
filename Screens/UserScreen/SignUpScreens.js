import React, { useState , useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  FlatList
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [password, setPassword] = useState('');
  const [roleSuggestions, setRoleSuggestions] = useState([]);

  // Student Fields
  const [collegeName, setCollegeName] = useState('');
  const [year, setYear] = useState('');

  // Non-Student Fields
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [ctc, setCtc] = useState('');
  const [experience, setExperience] = useState('');

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (!email || !firstName || !lastName || !role) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert('Error', 'Enter a valid email.');
      return;
    }
    setShowNext(true);
  };

  const isFormComplete = () => {
    if (isStudent) {
      return collegeName && year;
    } else {
      return location && companyName && ctc && experience;
    }
  };

  const handleSignUp = async () => {
    if (!password) {
      Alert.alert('Error', 'Password is required.');
      return;
    }
  
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      console.log('User created:', user.email);
  
      // Prepare user data
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        role,
        isStudent,
        createdAt: firestore.FieldValue.serverTimestamp(),
       // ...(isStudent
        collegeName, 
        year ,
        location, 
        companyName, 
        ctc,  
        experience ,
      };
  
      // Store data in Firestore under "profile" collection
      await firestore().collection('profile').doc(user.uid).set(userData);
      console.log('User data stored in Firestore successfully!');
  
      // Send email verification
      await user.sendEmailVerification();
      console.log('Verification email sent successfully!');
  
     // Alert.alert('Check Your Email', 'Please verify your email within 3 minutes.');
  
      // Wait for email verification
      const unsubscribe = auth().onAuthStateChanged(async (user) => {
        if (user) {
          await user.reload();
          console.log('User reloaded, email verified status:', user.emailVerified);
  
          if (user.emailVerified) {
            console.log('Email verified! Navigating to HomeScreen...');
            //Alert.alert('Success', 'Email verified! Logging in...');
            unsubscribe();
            navigation.replace('HomeScreen');
          }
        }
      });
  
    } catch (error) {
      console.log('Sign Up Failed:', error.message);
      Alert.alert('Sign Up Failed', error.message);
    }
  };
   
  useEffect(() => {
    if (role.length > 0) {
      fetchRoleSuggestions(role);
    } else {
      setRoleSuggestions([]);
    }
  }, [role]);


  const fetchRoleSuggestions = async (input) => {
    try {
      console.log('Fetching roles for input:', input); 
      const snapshot = await firestore()
        .collection('Role')
        .get();

      const roles = snapshot.docs.map((doc) => doc.data().Name);
      console.log('Fetched roles:', roles); 

      setRoleSuggestions(roles);
    } catch (error) {
      console.error('Error fetching role suggestions:', error);
    }
  };

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setRoleSuggestions([]); // Hide suggestions after selection
  };
  
  return (
    <View style={styles.container}>
      {!showNext && <Text style={styles.title}>Sign Up</Text>}

      {!showNext && (
        <>
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Set Password"
            style={styles.input}
            secureTextEntry={true} 
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            placeholder="Role (e.g. Developer, Manager)"
            style={styles.input}
            value={role}
            onChangeText={(text) => {
              setRole(text);
              console.log('User input:', text);
            }}
          />

            {/* Role Suggestions List */}
            {roleSuggestions.length > 0 && (
            <FlatList
              data={roleSuggestions}
              keyExtractor={(item, index) => index.toString()}
              style={styles.suggestionList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSelectRole(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          
           <TouchableOpacity 
           style={[styles.button, !(email && firstName && lastName && role) && styles.disabledButton]} 
           onPress={handleContinue}
           disabled={!(email && firstName && lastName && role)}
         >
           <Text style={styles.buttonText}>Continue</Text>
         </TouchableOpacity>
         
         
        </>
      )}

      {showNext && (
        <>
          <View style={styles.topMessageContainer}>
            <Text style={styles.topMessage}>
              Your Profile Helps to connect with New People and get New
              Opportunities
            </Text>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.label}>I'm a Student</Text>
            <Switch
              value={isStudent}
              onValueChange={setIsStudent}
              thumbColor="black"
            />
          </View>

          {isStudent ? (
            <>
              <TextInput
                placeholder="College Name"
                style={styles.input}
                value={collegeName}
                onChangeText={setCollegeName}
              />
              <TextInput
                placeholder="Year"
                style={styles.input}
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
              />
            </>
          ) : (
            <>
              <TextInput
                placeholder="Location"
                style={styles.input}
                value={location}
                onChangeText={setLocation}
              />
              <TextInput
                placeholder="Most Recent Company Name"
                style={styles.input}
                value={companyName}
                onChangeText={setCompanyName}
              />
              <TextInput
                placeholder="CTC"
                style={styles.input}
                keyboardType="numeric"
                value={ctc}
                onChangeText={setCtc}
              />
              <TextInput
                placeholder="Experience (in years)"
                style={styles.input}
                keyboardType="numeric"
                value={experience}
                onChangeText={setExperience}
              />
            </>
          )}

          {isFormComplete() && (
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#7987cb',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  topMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 25,
    marginTop: 5,
  },
  topMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  suggestionList: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
     borderColor: 'black'
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: '#f0f0f0', 
  },
  disabledButton: {
    backgroundColor:  '#a1afd7'
  },
  
};
export default SignUpScreen;
