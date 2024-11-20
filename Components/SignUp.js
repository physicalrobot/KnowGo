import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../Stylesheet";
import { useNavigation } from "@react-navigation/native";

const SignUp = ({ handleSignUp }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSignUpClick = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await handleSignUp(email, username, password, role);

      // Navigate based on role
      if (role === "tutor") {
        navigation.navigate("TutorProfileSetup", { email, username });
      } else {
        navigation.navigate("HomePage");
      }

      setError(""); // Clear any errors
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <View>
        <Text>Select Role:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Tutor" value="tutor" />
        </Picker>
      </View>
      <Button title="Sign Up" onPress={handleSignUpClick} />
{error ? <Text style={styles.error}>{error}</Text> : null}
<View style={styles.signbutt}>
  <Button
    title="Already have an account? Sign In"
    onPress={() => navigation.navigate("SignIn")}
  />
</View>

    </View>
  );
};

export default SignUp;
