import React from "react";
import { View, FlatList,Text } from "react-native";
import styles from "../Stylesheet";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import Map from "./Map";
import CTABox from "./CTABox";
import FeaturedTutors from "./FeaturedTutors";
import PopularSubjects from "./PopularSubjects";

const HomePage = ({ navigation, userNameFromDB, userRole, tutors, filteredTutors, allSubjects, selectedSubject, setSelectedSubject, handleSignOut }) => {
  // Render content based on the user's role
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
            {/* Placeholder for availability feature */}
          </View>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <NavBar onSignOut={() => handleSignOut(navigation)} />
      <FlatList
        data={[{ id: "welcome" }, { id: "roleBasedContent" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          switch (item.id) {
            case "welcome":
              return <Welcome username={userNameFromDB} />;
            case "roleBasedContent":
              return renderRoleBasedContent();
            default:
              return null;
          }
        }}
      />
    </View>
  );
};

export default HomePage;
