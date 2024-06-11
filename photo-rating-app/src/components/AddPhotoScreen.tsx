import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as PhotoService from "../services/PhotoService";
import { AddPhotoScreenProps } from "../../props";

const AddPhotoScreen: React.FC<AddPhotoScreenProps> = ({ navigation }) => {
  const [url, setUrl] = useState("");

  const handleAddPhoto = async () => {
    if (!url.trim()) {
      Alert.alert("Validation", "Please enter a URL.");
      return;
    }
    try {
      await PhotoService.addPhoto(url);
      Alert.alert("Success", "Photo added successfully!");
      setUrl("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add the photo");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
        placeholder="Enter photo URL"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Add Photo" onPress={handleAddPhoto} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddPhotoScreen;
