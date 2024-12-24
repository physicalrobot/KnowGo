import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./Stylesheet";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import HomePage from "./Components/HomePage";
import { auth, db } from "./firebase"; // Ensure Firebase is configured properly
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import tutors from "./tutors";
import TutorProfileSetup from "./Components/TutorProfileSetup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Stack = createStackNavigator();

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
    QuicksandBold: require("./assets/fonts/Quicksand-Bold.ttf"),
  });
};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userNameFromDB, setUserNameFromDB] = useState("");
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [filteredTutors, setFilteredTutors] = useState(tutors); // Replace `tutors` with your tutors array

  // Flatten subjects from all tutors
  const allSubjects = tutors.flatMap((tutor) => tutor.subjects);

  const filterTutorsBySubject = (tutors, selectedSubject) => {
    // If no subject is selected, return all tutors
    if (!selectedSubject) {
      return tutors;
    }

    // Filter tutors who teach the selected subject
    return tutors.filter(
      (tutor) => tutor.subjects && tutor.subjects.includes(selectedSubject)
    );
  };
  useEffect(() => {
    setFilteredTutors(filterTutorsBySubject(tutors, selectedSubject));
  }, [selectedSubject]);

  const handleSignOut = async (navigation) => {
    try {
      await signOut(auth);
      setUser(null);
      setIsSignUp(false);
      setUserNameFromDB(""); // Clear username on sign out
      console.log("User signed out successfully.");
      navigation.navigate("SignIn"); // Navigate to the SignIn page
    } catch (err) {
      console.error("Error during sign-out:", err);
    }
  };

  // const handleSignUp = async (
  //   email,
  //   name,
  //   password,
  //   role = "student",
  //   navigation
  // ) => {
  //   try {
  //     // Validate input
  //     if (!email || !name || !password) {
  //       throw new Error("All fields (email, name, and password) are required.");
  //     }

  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     if (!userCredential || !userCredential.user) {
  //       throw new Error("Failed to create user. Please try again.");
  //     }

  //     const user = userCredential.user;

  //     const userData = {
  //       name,
  //       email,
  //       role,
  //       location: null,
  //       subjects: role === "tutor" ? [] : null,
  //     };

  //     await setDoc(doc(db, "users", user.uid), userData);
  //     console.log("User signed up and data stored in Firestore:", user.uid);

  //     setUser(user);
  //     return userCredential; // Ensure userCredential is returned
  //   } catch (err) {
  //     console.error("Error during sign-up:", err);

  //     // Provide user-friendly error messages
  //     if (err.code === "auth/email-already-in-use") {
  //       alert("This email is already in use. Please use a different email.");
  //     } else if (err.code === "auth/invalid-email") {
  //       alert("The email address is invalid. Please check and try again.");
  //     } else if (err.code === "auth/weak-password") {
  //       alert(
  //         "The password is too weak. It must be at least 6 characters long."
  //       );
  //     } else {
  //       alert("An error occurred during sign-up. Please try again later.");
  //     }

  //     // Re-throw error for further handling
  //     throw err;
  //   }
  // };

  const handleSignUp = async (
    email,
    name,
    password,
    role = "student",
    navigation,
    pictureUri = null // New parameter for the picture URI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      let pictureUrl = null;
      if (pictureUri) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const response = await fetch(pictureUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        pictureUrl = await getDownloadURL(storageRef);
      }
  
      const userData = {
        name,
        email,
        role,
        location: null,
        picture: pictureUrl, // Save the uploaded picture URL
        subjects: role === "tutor" ? [] : null,
      };
  
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("User signed up and data stored in Firestore:", user.uid);
  
      setUser(user);
      return userCredential;
    } catch (err) {
      console.error("Error during sign-up:", err);
      throw err;
    }
  };

  const handleSignIn = async (email, password, navigation) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userCred = userCredential.user; // Extract the user object
      setUser(userCred); // Set the full Firebase user object
      console.log("User signed in (UID):", userCred.uid); // Log the UID directly

      // Reset the navigation stack to make HomePage the only screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        })
      );

      // Fetch username from Firestore immediately after sign-in
      const userDoc = await getDoc(doc(db, "users", userCred.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user data from Firestore:", userData);
        setUserNameFromDB(userData.name); // Update the username state
      } else {
        console.log("No Firestore document found for this user.");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      throw err;
    }
  };

  const fetchUsername = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid)); // Fetch user document by UID
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user data from Firestore in useEffect:", userData);
        return userData.name; // Return the "name" field
      } else {
        console.log("No Firestore document found for UID:", uid);
        return null;
      }
    } catch (error) {
      console.error("Error fetching username from Firestore:", error);
      return null;
    }
  };

  const getUserData = async () => {
    if (user) {
      console.log("Fetching data for user:", user.uid);
      const username = await fetchUsername(user.uid); // Fetch the name using the UID
      if (username) {
        setUserNameFromDB(username); // Update the username state
        console.log("Fetched username from Firestore in useEffect:", username);
      } else {
        console.log("Username not found in Firestore.");
      }
    }
  };

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  useEffect(() => {
    console.log("userNameFromDB updated:", userNameFromDB);
  }, [userNameFromDB]);

  useEffect(() => {
    getUserData();
  }, [user]); // Re-run whenever `user` changes

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {/* SignIn Screen */}
        <Stack.Screen name="SignIn" options={{ headerShown: false }}>
          {(props) => (
            <SignIn
              {...props}
              onSwitchToSignUp={() => setIsSignUp(true)}
              setUser={setUser}
              handleSignIn={handleSignIn}
            />
          )}
        </Stack.Screen>

        {/* SignUp Screen */}
        <Stack.Screen name="SignUp" options={{ headerShown: false }}>
          {(props) => (
            <SignUp
              {...props}
              onSwitchToSignIn={() => setIsSignUp(false)}
              handleSignUp={handleSignUp}
            />
          )}
        </Stack.Screen>

        {/* HomePage Screen */}
        <Stack.Screen
          name="HomePage"
          options={{
            headerShown: false,
            gestureEnabled: false, // Disables swipe back gesture
          }}
        >
          {(props) => (
            <HomePage
              {...props}
              userNameFromDB={userNameFromDB}
              userRole={user?.role || "student"}
              filteredTutors={filteredTutors}
              allSubjects={allSubjects}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              handleSignOut={handleSignOut}
            />
          )}
        </Stack.Screen>

        {/* TutorProfileSetup Screen */}
        <Stack.Screen name="TutorProfileSetup" options={{ headerShown: false }}>
          {(props) => (
            <TutorProfileSetup
              handleSignUp={handleSignUp}
              getUserData={getUserData}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
