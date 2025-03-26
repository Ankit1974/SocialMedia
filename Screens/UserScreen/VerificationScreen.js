import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function VerificationEmailScreen({ navigation }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [user, setUser] = useState(auth().currentUser);

  useEffect(() => {
    const interval = setInterval(async () => {
      await user.reload();
      console.log('Email Verified:', user.emailVerified);  // Log email verification status
      if (user.emailVerified) {
        clearInterval(interval);
        navigation.replace('MainTabs'); 
      }
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);
  

  const resendEmailVerification = async () => {
    setIsVerifying(true);
    try {
      await user.sendEmailVerification();
      alert('Verification email sent! Check your inbox.');
    } catch (error) {
      alert(error.message);
    }
    setIsVerifying(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>A verification email has been sent to:</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.instruction}>
        Please check your inbox and verify your email to continue.
      </Text>

      <TouchableOpacity 
        style={[styles.button, isVerifying && styles.disabledButton]} 
        onPress={resendEmailVerification} 
        disabled={isVerifying}
      >
        {isVerifying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Resend Verification Email</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
});
