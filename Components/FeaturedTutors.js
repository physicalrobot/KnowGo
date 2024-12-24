import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import styles from "../Stylesheet";

const FeaturedTutors = ({ tutors }) => {
  const renderTutor = ({ item }) => (
    <View style={styles.featuredTutorCard}>
      <Image source={{ uri: item.image }} style={styles.featuredAvatar} />
      <View>
        <Text style={styles.featuredName}>{item.name}</Text>
        <Text style={styles.featuredSubjects}>{item.subjects.join(", ")}</Text>
        <Text style={styles.featuredRating}>⭐ {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.featuredContainer}>
      <Text style={styles.featuredHeader}>Featured Tutors</Text>
      <FlatList
        data={tutors}
        renderItem={renderTutor}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FeaturedTutors;
