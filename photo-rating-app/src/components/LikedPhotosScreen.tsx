import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { LikedPhotosProps } from "../../props";
import * as PhotoService from "../services/PhotoService";
import { likedPhotoStyle } from "../styles/styles";
import { IPhoto } from "../models/Photo";

const LikedPhotosScreen: React.FC<LikedPhotosProps> = ({ navigation }) => {
  const [likedPhotos, setLikedPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    PhotoService.fetchTopPhotos()
      .then((data) => {
        setLikedPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load top photos", error);
        Alert.alert("Error", "Failed to load top photos");
        setLoading(false);
      });
  }, []);

  const handleImagePress = (photo: IPhoto) => {
    console.log(photo);
    navigation.navigate("Comment", { photoId: photo?.id });
  };

  return (
    <View style={likedPhotoStyle.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : likedPhotos.length > 0 ? (
        <FlatList
          data={likedPhotos}
          keyExtractor={(_item, index) => `photo-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item)}>
              <Image source={{ uri: item.url }} style={likedPhotoStyle.photo} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={likedPhotoStyle.noPhotosText}>
              No liked photos yet.
            </Text>
          }
        />
      ) : (
        <Text style={likedPhotoStyle.noPhotosText}>No liked photos yet.</Text>
      )}
    </View>
  );
};

export default LikedPhotosScreen;
