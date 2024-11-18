import { View, Text } from 'react-native'
import React from 'react'
import styles from '../Stylesheet';


const Welcome = ({username}) => {
  return (
    <View>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
    </View>
  )
}

export default Welcome