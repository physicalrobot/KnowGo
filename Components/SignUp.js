import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import styles from "../Stylesheet";

const SignUp = ({ onSwitchToSignIn, handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUpClick = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await handleSignUp(email, username, password);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Display the error message
    }
  };

  return (
    <View>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignUpClick} />
      {error ? <Text style={styles.error}>{error}</Text> : null}

       {/* Add the button to go back to the Sign In page */}
        <Button title="Already have an account? Sign In" onPress={onSwitchToSignIn} />
    </View>
  );
};

export default SignUp;
