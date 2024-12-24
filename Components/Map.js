import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from "../Stylesheet";

const Map = ({ tutors }) => {
  console.log(tutors)
  return (

    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {/* <Marker
  coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
  title="Static Marker"
  description="San Francisco"
/> */}

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
  );
};

export default Map;
