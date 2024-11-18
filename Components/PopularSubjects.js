import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../Stylesheet';

const PopularSubjects = ({ subjects, onSelectSubject }) => {
  // Remove duplicates using a Set
  const uniqueSubjects = Array.from(new Set(subjects));

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
        data={uniqueSubjects} // Use the unique subjects array
        renderItem={renderSubject}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PopularSubjects;
