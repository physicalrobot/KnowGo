import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import styles from '../Stylesheet';

const SignIn = ({ onSwitchToSignUp, handleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignInClick = async () => {
    try {
      await handleSignIn(email, password);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <View>
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
      <Button title="Sign In" onPress={handleSignInClick} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Don't have an account? Sign Up" onPress={onSwitchToSignUp} />
    </View>
  );
};

export default SignIn;
