import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from "../Stylesheet";

const Map = ({ tutors = [] }) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* {tutors.map((tutor, index) => {
          if (tutor.location) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: tutor.location.latitude,
                  longitude: tutor.location.longitude,
                }}
                title={tutor.name}
                description={tutor.subjects.join(', ')}
              />
            );
          }
          return null;
        })} */}
      </MapView>
    </View>
  );
};

export default Map;
