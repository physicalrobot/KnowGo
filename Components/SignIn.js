import React, { useState } from "react";
import { View, TextInput, Text,Image, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../Stylesheet";
import { useNavigation } from "@react-navigation/native";
import KnowGoLogo from "../assets/KnowGoLogo"; // Import the SVG as a React component

const SignIn = ({ handleSignIn }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.signInContainer}>
      {/* SVG Logo */}
      <View style={styles.knowgosvgcontainer}>
  <KnowGoLogo width={150} height={150} />
</View>
<Image 
  source={require("../assets/knowgo.png")} // Replace with your image path
  style={styles.logo}
/>



      {/* Subheader Text */}
      <Text style={styles.subHeaderText}>Explore subjects and find a tutor today</Text>

      {/* Input Fields and Login Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
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
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => handleSignIn(email, password)}
        >
          <Text style={styles.buttonTextPrimary}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Sign Up Buttons */}
      <ImageBackground
        source={require("../assets/ellipse1.png")}
        style={styles.footerContainer}
        resizeMode="cover" // Ensures the image covers the footer area
      >
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("SignUp", { role: "student" })}
        >
          <Text style={styles.footerButtonText}>SIGN UP AS A STUDENT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("SignUp", { role: "tutor" })}
        >
          <Text style={styles.footerButtonText}>APPLY TO BE A TUTOR</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default SignIn;
