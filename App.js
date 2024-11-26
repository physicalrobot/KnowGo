import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
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
import tutors from './tutors'
import TutorProfileSetup from "./Components/TutorProfileSetup";

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
    return tutors.filter((tutor) => 
      tutor.subjects && tutor.subjects.includes(selectedSubject)
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

  const handleSignUp = async (email, name, password) => {
    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Extract the `user` object from the credential
  
      // Store additional user data (name and email) in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name, // Use `name` to store the user's name
        email: email, // Store the email address
      });
  
      setUser(user); // Set the current user in state
      console.log("User signed up and data stored in Firestore:", user.uid);
    } catch (err) {
      console.error("Error during sign-up:", err);
      throw err; // Propagate the error for UI to handle
    }
  };
  

  const handleSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userCred = userCredential.user; // Extract the user object
      setUser(userCred); // Set the full Firebase user object
      console.log("User signed in (UID):", userCred.uid); // Log the UID directly
  
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
  
  useEffect(() => {
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
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
        >
          {(props) => (
            <SignIn
              {...props}
              onSwitchToSignUp={() => setIsSignUp(true)}
              setUser={setUser}
              handleSignIn={handleSignIn}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
        >
          {(props) => (
            <SignUp
              {...props}
              onSwitchToSignIn={() => setIsSignUp(false)}
              handleSignUp={handleSignUp}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="HomePage"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomePage
              {...props}
              navigation={props.navigation}
              userNameFromDB={userNameFromDB}
              userRole={user?.role || "student"} // Assuming user role is stored in the user object
              filteredTutors={filteredTutors}
              allSubjects={allSubjects}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              handleSignOut={handleSignOut}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="TutorProfileSetup"
          options={{ headerShown: false }}
        >
          {(props) => (
            <TutorProfileSetup
              {...props}
 
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
