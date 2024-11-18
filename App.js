import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import styles from './Stylesheet';

import tutors from './tutors';

import Welcome from './Components/Welcome';
import NavBar from './Components/NavBar';
import Map from './Components/Map';
import CTABox from './Components/CTABox'
import FeaturedTutors from './Components/FeaturedTutors';
import PopularSubjects from './Components/PopularSubjects';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { doc, setDoc, getDoc } from "firebase/firestore";


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Track if we're on Sign Up page
  const [userNameFromDB, setUserNameFromDB] = useState('');


  const [error, setError] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null); // State for the selected subject




    // Flatten subjects from all tutors
    const allSubjects = tutors.flatMap((tutor) => tutor.subjects);

    // Filter tutors based on the selected subject
    const filteredTutors = selectedSubject ? tutors.filter((tutor) => tutor.subjects.includes(selectedSubject)) : tutors;

  
  // Function to fetch username from Firestore
  const fetchUsername = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.username; // Return the username
      } else {
        console.log("No username found for this user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  };

  // Fetch the username when the user logs in
  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const username = await fetchUsername(user.uid);
        if (username) {
          setUserNameFromDB(username); // Set the username in state
        }
      }
    };

    getUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsSignUp(false);
      setUserNameFromDB(""); // Clear username on sign out
      console.log("User signed out successfully.");
    } catch (err) {
      console.error("Error during sign-out:", err);
    }
  };


    

    const handleSignUp = async (email, username, password) => {
      try {
        // Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Store the username in Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
        });
    
        setUser(user); // Set the user state to transition to the main app
        console.log("User signed up and username stored in Firestore.");
      } catch (err) {
        console.error("Error during sign-up:", err);
        throw err; // Rethrow the error for the SignUp component to handle
      }
    };
    
 
    

    const handleSignIn = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setError('');
      } catch (err) {
        setError(err.message);
        throw err; // Rethrow error so SignIn component can handle it
      }
    };
    
    
  return (
    <View style={styles.container}>
      {user ? (
        <View style={{ flex: 1 }}>
          {/* Navbar remains static */}
          <NavBar onSignOut={handleSignOut} />
          {/* FlatList for scrolling content */}
          <FlatList
            data={[
              { id: 'welcome' },
              { id: 'popular' },
              { id: 'map' },
              { id: 'cta' },
              { id: 'featured' },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              switch (item.id) {
                case 'welcome':
                  return (
                    <Welcome username={userNameFromDB} />
                  );
                case 'popular':
                  return (
                    <PopularSubjects
                      subjects={allSubjects}
                      onSelectSubject={(subject) => setSelectedSubject(subject)}
                    />
                  );
                case 'map':
                  return <Map tutors={filteredTutors} />;
                case 'cta':
                  return <CTABox />;
                case 'featured':
                  return <FeaturedTutors tutors={tutors} />;
                default:
                  return null;
              }
            }}
          />
        </View>
      ) : isSignUp ? (
        <SignUp
        onSwitchToSignIn={() => setIsSignUp(false)} // Toggle to Sign In page
        handleSignUp={handleSignUp}
      />
    ) : (
      <SignIn
        onSwitchToSignUp={() => setIsSignUp(true)} // Toggle to Sign Up page
        handleSignIn={handleSignIn}
      />
    )}
    </View>
  );  
};


export default App;
