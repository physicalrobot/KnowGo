import React from 'react';
import styles from '../Stylesheet';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ tutors }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.7749, // Default location (San Francisco)
        longitude: -122.4194,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {tutors.map((tutor, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: tutor.location.latitude,
            longitude: tutor.location.longitude,
          }}
          title={tutor.name}
          description={tutor.subjects.join(', ')}
        />
      ))}
    </MapView>
  );
};



export default Map;