import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Ensure this points to your Firebase configuration

import { View, TextInput, ImageBackground, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import styles from '../Stylesheet';
import SignUpHeader from '../assets/SignUpHeader';
import HomePage from './HomePage';


const SignUp = ({ route, navigation }) => {
  const { role } = route.params; // Get the role passed from SignIn
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSignUp = async () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // Clear errors
    setError("");
  
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });
  
      console.log("User signed up successfully:", user);
  
      // Navigate based on role
      if (role === "tutor") {
        navigation.navigate("TutorProfileSetup", { name, email, password });
      } else {
        navigation.navigate("HomePage", { name, email });
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError(error.message || "Failed to sign up.");
    }
  };

  return (
    <View style={styles.inputContainer}>
            <ImageBackground
        source={require("../assets/sun.png")}
        style={styles.headerImage}
        resizeMode="cover"
      >
      </ImageBackground>
      <View style={styles.signUpHeaderContainer}>

      <SignUpHeader width={200} height={80} />
      </View>

      {/* text to see if roles work */}
      {/* <Text style={styles.header}>
        {role === 'tutor' ? 'Sign Up as a Tutor' : 'Sign Up as a Student'}
      </Text> */}

      {/* Name */}

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Confirm Password */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Sign Up Button */}
      <TouchableOpacity
  title={role === "tutor" ? "Next" : "Sign Up"}
  onPress={handleSignUp}
  style={styles.buttonPrimary}
>
  <Text style={styles.buttonTextPrimary}>
    {role === "tutor" ? "NEXT" : "SIGN UP"}
  </Text>
</TouchableOpacity>


      {/* Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};



export default SignUp;


