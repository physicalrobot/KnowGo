import React, { useState } from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import styles from '../Stylesheet';
import SignUpHeader from '../assets/SignUpHeader';

const SignUp = ({ handleSignUp, route, navigation }) => {
  const { role } = route.params; // Get the role passed from SignIn
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSignUpPress = async () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Clear errors and call handleSignUp
      setError('');
      await handleSignUp(email, name, password);

      // Navigate to the next page based on role
      if (role === 'tutor') {
        navigation.navigate('TutorProfileSetup'); // Navigate to TutorProfileSetup for tutors
      } else {
        navigation.navigate('HomePage'); // Navigate to HomePage for students
      }
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error("Sign-up error:", err);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <ImageBackground
        source={require("../assets/sun.png")}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.signUpHeaderContainer}>
        <SignUpHeader width={200} height={80} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        title={role === "tutor" ? "Next" : "Sign Up"}
        onPress={onSignUpPress}
        style={styles.buttonPrimary}
      >
        <Text style={styles.buttonTextPrimary}>
          {role === "tutor" ? "NEXT" : "SIGN UP"}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default SignUp;
