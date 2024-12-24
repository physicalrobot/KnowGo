import React, { useState } from "react";
import {
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../Stylesheet";
import SignUpHeader from "../assets/SignUpHeader";
import * as ImagePicker from "expo-image-picker";
import AbstractUserIcon from "../assets/AbstractUserIcon";

const SignUp = ({ handleSignUp, route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const { role } = route.params; // Get the role passed from SignIn
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const onSignUpPress = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");

      // Create user and handle sign-up
      const userCredential = await handleSignUp(
        email,
        name,
        password,
        role, // Pass the role dynamically
        navigation,
        selectedImage // Include the image URI
      );

      if (!userCredential || !userCredential.user) {
        setError("Failed to create user. Please try again.");
        return;
      }

      const userId = userCredential.user.uid;

      // Navigate based on role
      if (role === "tutor") {
        navigation.navigate("TutorProfileSetup", {
          email,
          name,
          password,
          role: "tutor",
          userId,
        });
      } else {
        navigation.navigate("HomePage");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <ImageBackground
        source={require("../assets/sun.png")}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.signUpInput}>
        <View style={styles.signUpHeaderContainer}>
          <SignUpHeader width={200} height={80} />
        </View>

        <TouchableOpacity onPress={pickImage} style={{ zIndex: 10 }}>
          <View style={styles.defaultUserImage}>
            <AbstractUserIcon />
          </View>
          <Text paddingBottom={20}>Pick a Profile Picture</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
        )}

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
    </View>
  );
};

export default SignUp;
