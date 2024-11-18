import React from 'react';
import styles from '../Stylesheet';

import { View, Text, TouchableOpacity } from 'react-native';

const CTABox = () => {
    return (
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Find Your Perfect Tutor Today!</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      );
    };

export default CTABox;
