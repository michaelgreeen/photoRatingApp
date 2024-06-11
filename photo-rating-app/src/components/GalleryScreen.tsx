import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { GalleryScreenProps } from "../../props";
import styles from "../styles/styles";
import * as PhotoService from "../services/PhotoService";
import { IPhoto } from "../models/Photo";

const GalleryScreen: React.FC<GalleryScreenProps> = ({ navigation }) => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string>("x");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    PhotoService.fetchAllPhotos()
      .then((data) => {
        setPhotos(data);
        if (data.length > 0) {
          setPhotoUrl(data[0].url);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load photos", error);
        setLoading(false);
      });
  }, []);

  const handleLike = () => {
    if (photos.length > 0) {
      const currentPhoto = photos[currentPhotoIndex];
      PhotoService.likePhoto(currentPhoto.id)
        .then(() => {
          Alert.alert("Liked!", "You have liked this photo.");
          navigatePhotos(1);
        })
        .catch((error) => {
          console.error("Failed to like photo", error);
          Alert.alert("Error", "Failed to like the photo.");
        });
    }
  };

  const handleDislike = () => {
    if (photos.length > 0) {
      const currentPhoto = photos[currentPhotoIndex];
      console.log(currentPhoto);
      PhotoService.dislikePhoto(currentPhoto.id)
        .then(() => {
          Alert.alert("Disliked :(", "You have disliked this photo.");
          navigatePhotos(1);
        })
        .catch((error) => {
          console.error("Failed to dislike photo", error);
          Alert.alert("Error", "Failed to dislike the photo.");
        });
    }
  };

  const navigatePhotos = (direction: number) => {
    const nextIndex =
      (currentPhotoIndex + direction + photos.length) % photos.length;
    setCurrentPhotoIndex(nextIndex);
    setPhotoUrl(photos[nextIndex].url);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: photoUrl }}
            style={styles.photo}
            resizeMode="contain"
          />
          <View style={[styles.buttonContainer, { flexDirection: "column" }]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity style={styles.button} onPress={handleLike}>
                <Text style={styles.buttonText}>👍 Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDislike}>
                <Text style={styles.buttonText}>👎 Dislike</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigatePhotos(-1)}
              >
                <Text style={styles.buttonText}>⬅️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigatePhotos(1)}
              >
                <Text style={styles.buttonText}>➡️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default GalleryScreen;
