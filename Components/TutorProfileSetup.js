import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { setDoc, doc } from "firebase/firestore"; // Ensure Firestore imports
import * as ImagePicker from "expo-image-picker";
import availableSubjects from "../subjects";
import styles from "../Stylesheet";
import { db } from "../firebase"; // Ensure Firebase is configured properly

const TutorProfileSetup = ({
  handleSignUp,
  getUserData,
  route,
  navigation,
}) => {

  const { email, name, password, userId } = route.params; // Receive data from SignUp
  const [location, setLocation] = useState("");
  const [subjects, setSubjects] = useState([]); // Default to empty array
  const [inputSubject, setInputSubject] = useState(""); // Default to empty string
  const [profilePicture, setProfilePicture] = useState(null);

  // Handle selecting a profile picture
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

  // Handle adding a subject to the selected subjects list
  const handleAddSubject = (subject) => {
    if (!subjects.includes(subject)) {
      setSubjects((prevSubjects) => [...prevSubjects, subject]);
    }
    setInputSubject(""); // Clear input field
  };

  // Filter available subjects based on user input
  const filteredSubjects = Array.isArray(availableSubjects)
    ? availableSubjects.filter((subject) =>
        subject.toLowerCase().startsWith(inputSubject?.toLowerCase() || "")
      )
    : [];


    const handleProfileSetup = async () => {
      try {
          // Validate all necessary fields
          if (!email || !name || !location || subjects.length === 0) {
              alert("Please fill in all required fields.");
              return;
          }
  
          // Debug logging
          console.log("Profile Setup Data:", {
              email,
              name,
              password,
              subjects,
              location,
              profilePicture,
          });
  
          // Prepare profile data
          const profileData = {
              email,
              name,
              location,
              subjects,
              profilePicture: profilePicture || null,
              role: "tutor",
          };
  
          // Save the profile data in Firestore
          const userRef = doc(db, "users", userId); // Use userId passed from SignUp
          await setDoc(userRef, profileData, { merge: true });
  
          console.log("Tutor profile successfully updated in Firestore.");
  
          // Fetch user data and update state in App.js
          await getUserData();
          console.log("User data fetched, navigating to HomePage...");
  
          navigation.navigate("HomePage");
      } catch (err) {
          console.error("Error during tutor profile setup:", err);
          alert("There was an error creating your profile. Please try again.");
      }
  };
  

  // const handleProfileSetup = async () => {
  //   try {
  //     // Validate all necessary fields
  //     if (!email || !name || !location || subjects.length === 0) {
  //       alert("Please fill in all required fields.");
  //       return;
  //     }

  //     // Debug logging
  //     console.log("Profile Setup Data:", {
  //       email,
  //       name,
  //       password,
  //       subjects,
  //       location,
  //       profilePicture,
  //     });

  //     // Create the user
  //     const userCredential = await handleSignUp(email, name, password, "tutor");
  //     if (!userCredential || !userCredential.user) {
  //       throw new Error("User creation failed. Please try again.");
  //     }

  //     const user = userCredential.user;

  //     // Prepare profile data
  //     const profileData = {
  //       email,
  //       name,
  //       location,
  //       subjects,
  //       profilePicture: profilePicture || null,
  //       role: "tutor",
  //     };

  //     // Save the profile data in Firestore
  //     const userRef = doc(db, "users", user.uid);
  //     await setDoc(userRef, profileData, { merge: true });

  //     console.log("Tutor profile successfully updated in Firestore.");

  //     // Fetch user data and update state in App.js
  //     await getUserData();
  //     console.log("User data fetched, navigating to HomePage...");

  //     navigation.navigate("HomePage");
  //   } catch (err) {
  //     console.error("Error during tutor profile setup:", err);
  //     alert("There was an error creating your profile. Please try again.");
  //   }
  // };

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
        placeholder="Type a subject"
        value={inputSubject}
        onChangeText={setInputSubject}
      />
      {inputSubject.length > 0 && (
        <FlatList
          data={filteredSubjects}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.dropdownItem}
              onPress={() => handleAddSubject(item)}
              underlayColor="#ddd"
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableHighlight>
          )}
          style={styles.dropdown}
        />
      )}
      <View style={styles.selectedSubjects}>
        {subjects.map((subject, index) => (
          <Text key={index} style={styles.subjectBadge}>
            {subject}
          </Text>
        ))}
      </View>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>Upload Profile Picture</Text>
      </TouchableOpacity>
      {profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      )}
      <Button title="Submit" onPress={handleProfileSetup} />
    </View>
  );
};

export default TutorProfileSetup;
