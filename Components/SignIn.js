import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import styles from '../Stylesheet';
import { useNavigation } from '@react-navigation/native';

const SignIn = ({ handleSignIn }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignInClick = async () => {
    try {
      await handleSignIn(email, password);
      setError(''); // Clear any previous errors
      navigation.navigate("HomePage"); // Navigate to homepage on successful sign-in
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    <View style={styles.signbutt}>
        <Button title="Sign In" onPress={handleSignInClick} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.signbutt2}>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;
