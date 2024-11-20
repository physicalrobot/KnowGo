import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import styles from './Stylesheet';

import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import HomePage from './Components/HomePage';
import Welcome from './Components/Welcome';
import NavBar from './Components/NavBar';
import Map from './Components/Map';
import CTABox from './Components/CTABox';
import FeaturedTutors from './Components/FeaturedTutors';
import PopularSubjects from './Components/PopularSubjects';
import TutorProfileSetup from './Components/TutorProfileSetup'; // New component for tutor setup
import tutors from './tutors';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userNameFromDB, setUserNameFromDB] = useState('');
  const [userRole, setUserRole] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [error, setError] = useState('');

  const allSubjects = tutors.flatMap((tutor) => tutor.subjects);
  const filteredTutors = selectedSubject === "All" || !selectedSubject
  ? tutors // Show all tutors if "All" is selected or no subject is selected
  : tutors.filter((tutor) => tutor.subjects.includes(selectedSubject));

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserNameFromDB(userData.username);
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);

  const handleSignOut = async (navigation) => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
      setUserNameFromDB(''); // Clear username state
      setUserRole(''); // Clear role state
      navigation.navigate("SignIn"); // Redirect to SignIn screen
    } catch (err) {
      console.error("Error during sign-out:", err);
    }
  };

  const handleSignUp = async (email, username, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        role: role,
        location: null,
        subjects: role === "tutor" ? [] : null, 
      });

      setUser(user);
      if (role === "student") {
        setSelectedSubject(null); // Reset subject selection for students
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      throw err;
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const renderRoleBasedContent = () => {
    if (userRole === "student") {
      return (
        <>
          <PopularSubjects
            subjects={allSubjects}
            onSelectSubject={(subject) => setSelectedSubject(subject)}
          />
          <Map tutors={filteredTutors} />
          <CTABox />
          <FeaturedTutors tutors={tutors} />
        </>
      );
    } else if (userRole === "tutor") {
      return (
        <>
          <View>
            <Text>Your Availability:</Text>
          </View>
        </>
      );
    }
  };

 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
  <Stack.Screen
    name="SignIn"
    options={{ headerShown: false }} // Hide the header entirely
  >
    {(props) => (
      <SignIn
        {...props}
        handleSignIn={handleSignIn}
      />
    )}
  </Stack.Screen>
  <Stack.Screen
    name="SignUp"
    options={{ 
      headerShown: false 
    }} // Hide the header entirely
  >
    {(props) => (
      <SignUp
        {...props}
        handleSignUp={handleSignUp}
      />
    )}
  </Stack.Screen>
  <Stack.Screen
    name="TutorProfileSetup"
    options={{ 
      headerShown: false

    }} // Disable back button
  >
    {(props) => (
      <TutorProfileSetup
        {...props}
      />
    )}
  </Stack.Screen>
  <Stack.Screen
    name="HomePage"
    options={{ 
      headerShown: false,
    }} 
    >
    {(props) => (
    <HomePage
    {...props}
    userNameFromDB={userNameFromDB}
    userRole={userRole}
    tutors={tutors}
    filteredTutors={filteredTutors}
    allSubjects={allSubjects}
    selectedSubject={selectedSubject}
    setSelectedSubject={setSelectedSubject}
    handleSignOut={(navigation) => handleSignOut(navigation)} // Pass handleSignOut here
  />
    )}
  </Stack.Screen>
</Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
