import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [searchLocation, onChangeLocation] = useState('');
  const [mapRegion, setMapRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const findLocation = () => {
    const apikey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${searchLocation}`;

    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.results && result.results[0].locations && result.results[0].locations[0]) {
          const latLng = result.results[0].locations[0].latLng;
          setMapRegion({
            ...mapRegion,
            latitude: latLng.lat,
            longitude: latLng.lng,
          });
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, width: "100%", height: "100%" }}
        region={mapRegion}
      >
        <Marker
          coordinate={mapRegion}
        />
      </MapView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLocation}
        value={searchLocation}
        placeholder="Enter location here..."
      />
      <TouchableOpacity style={styles.button} onPress={findLocation}>
        <Text style={styles.buttonText}>Show</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: "90%",
    alignItems: 'center',
    backgroundColor: '#0066ff', 
    padding: 10,
  },
  input: {
    width: "90%",
    borderBottomWidth: 1,  
    borderBottomColor: 'grey', 
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});
