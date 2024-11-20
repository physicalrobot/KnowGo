import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../Stylesheet';

const PopularSubjects = ({ subjects, onSelectSubject }) => {
  // Remove duplicates using a Set
  const subjectsWithAll = ["All", ...new Set(subjects)]; // Add "All" to the subjects list and ensure uniqueness

  const renderSubject = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectCard}
      onPress={() => onSelectSubject(item)} // Trigger callback on click
    >
      <Text style={styles.subjectText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.subjectsContainer}>
      <Text style={styles.subjectsHeader}>Popular Subjects</Text>
      <FlatList
        data={subjectsWithAll}
        renderItem={renderSubject}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PopularSubjects;
