import React, { useState } from "react";
import { View, TextInput, Button, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../Stylesheet";

const TutorProfileSetup = ({ route, navigation }) => {
  const { email, username } = route.params; // Receive data from SignUp

  const [location, setLocation] = useState("");
  const [subjects, setSubjects] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri);
    }
  };

  const handleProfileSetup = () => {
    // Handle submission of tutor data
    console.log("Tutor Profile Submitted:", { email, username, location, subjects, profilePicture });
    // Navigate to homepage or another relevant page
    navigation.navigate("HomePage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Subjects you can teach (comma-separated)"
        value={subjects}
        onChangeText={setSubjects}
      />
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>Upload Profile Picture</Text>
      </TouchableOpacity>
      {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profileImage} />}
      <Button title="Submit" onPress={handleProfileSetup} />
    </View>
  );
};

export default TutorProfileSetup;
